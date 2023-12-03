import { createContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../App";

import { format } from "date-fns";

export const getCategoriesOrEntries = async (db, collectionName) => {
  const categoriesOrEntries = collection(db, collectionName);
  const categoriesOrEntriesSnapshot = await getDocs(categoriesOrEntries);
  const categoriesOrEntriesList = categoriesOrEntriesSnapshot.docs.map((doc) =>
    doc.data()
  );
  return categoriesOrEntriesList;
};

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [categories, setCategories] = useState([]),
    [entries, setEntries] = useState([]),
    [categoryId, setCategoryId] = useState(""),
    [categoryIcon, setCategoryIcon] = useState("");

  useEffect(() => {
    getCategoriesOrEntries(db, "categories").then((data) =>
      setCategories(data)
    );
    getCategoriesOrEntries(db, "entries").then((data) => setEntries(data));
  }, []);

  const updateCategoriesArray = (array) => setCategories(array),
    updateEntriesArray = (array) => setEntries(array),
    saveCategoryId = (id) => setCategoryId(id),
    saveCategoryIcon = (icon) => setCategoryIcon(icon);

  const addCategory = async (collectionName, itemFields, itemId) => {
    await setDoc(doc(db, collectionName, itemId), {
      ...itemFields,
      id: itemId,
    });
  };

  const addEntry = async (collectionName, itemFields, itemId) => {
    await setDoc(doc(db, collectionName, itemId), {
      ...itemFields,
      id: itemId,
      categoryId: categoryId,
      icon: categoryIcon,
    });
  };

  const updateCategoryOrEntryHelper = async (
    collectionName,
    itemFields,
    itemToBeUpdated
  ) => {
    await setDoc(
      doc(db, collectionName, itemToBeUpdated),
      {
        ...itemFields,
      },
      { merge: true }
    );
  };

  const updateCategory = (category) => {
    const categoryToUpdate = categories.find((el) => el.id === category.id);

    updateCategoryOrEntryHelper(
      "categories",
      {
        type: category.type,
        name: category.name,
        icon: category.icon,
        budget: category.budget,
        isEnabled: category.isEnabled,
      },
      categoryToUpdate.id
    );
  };

  const updateEntry = (entry) => {
    const entryToUpdate = entries.find((el) => el.id === entry.id);

    updateCategoryOrEntryHelper(
      "entries",
      {
        type: entry.type,
        name: entry.name,
        categoryId: entry.categoryId,
        category: entry.category,
        amount: +entry.amount,
        icon: categoryIcon,
        date: entry.date,
      },
      entryToUpdate.id
    );
  };

  const deleteEntry = async (entry) => {
    const categoryToBeUpdated = categories.find(
      (category) => category.id === entry.categoryId
    );

    updateCategoryOrEntryHelper(
      "categories",
      {
        entriesAmount: categoryToBeUpdated.entriesAmount - entry.amount,
      },
      categoryToBeUpdated.id
    );

    await deleteDoc(doc(db, "entries", entry.id));

    getCategoriesOrEntries(db, "entries").then((data) =>
      updateEntriesArray(data)
    );
  };

  //find the days from the 1st of the month till today
  const datesBetween = (start, end) => {
    const dates = new Array(),
      day = new Date(start);

    while (day <= end) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return dates;
  };

  const today = new Date(),
    dateInProperFormat = format(today, "yyyy-MM-dd"),
    daysInCurrentMonth = +dateInProperFormat.slice(-2) - 1,
    daysAgo = new Date().setDate(new Date().getDate() - daysInCurrentMonth),
    dates = datesBetween(daysAgo, today),
    //make the labels for the chart
    labels = dates.map((el) => format(el, "yyyy-MM-dd"));

  const filteredEnabledCategories = categories?.filter(
    (category) => category.isEnabled === true
  );

  const filteredIncomeCategories = filteredEnabledCategories?.filter(
    (category) => category.type === "income"
  );

  const filteredExpenseCategories = filteredEnabledCategories?.filter(
    (category) => category.type === "expense"
  );

  const entriesInCurrentMonth = entries?.filter((entry) =>
    labels.some((label) => entry.date === label)
  );

  //make a sum of the entries amount for each category in the current month
  if (entriesInCurrentMonth) {
    filteredEnabledCategories?.forEach((category) => {
      const totalAmount = entriesInCurrentMonth.reduce(
        (accumulation, entry) => {
          if (entry.categoryId === category.id) {
            return accumulation + parseInt(entry.amount);
          }
          return accumulation;
        },
        0
      );

      category.entriesAmount = totalAmount;
    });
  }

  const contextObject = {
    updateCategoriesArray,
    updateEntriesArray,
    addCategory,
    addEntry,
    updateCategory,
    updateEntry,
    updateCategoryOrEntryHelper,
    deleteEntry,
    saveCategoryId,
    saveCategoryIcon,
    filteredIncomeCategories,
    filteredExpenseCategories,
    categories,
    entries,
    labels,
    entriesInCurrentMonth,
  };

  return <Context.Provider value={contextObject}>{children}</Context.Provider>;
};
