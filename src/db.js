// import { db } from "./App";
import { collection, getDocs } from "firebase/firestore";

// async function enablePersistence() {
//   db?.enablePersistence().catch((err) => {
//     if (err.code === "failed-precondition") console.log("Persistence failed");
//   });
// }

// enablePersistence();

// Get a list of categories from the database
// export async function getCategories(db) {
//   const categoriesCol = collection(db, "categories");
//   const categoriesSnapshot = await getDocs(categoriesCol);
//   const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());
//   console.log(categoriesList);
//   return categoriesList;
// }

// export async function getCategories(db) {
//   const querySnapshot = await getDoc(collection(db, "categories"));
//   // querySnapshot.forEach((doc) => {
//   //   console.log(doc);
//   // });

//   // const test = querySnapshot?._snapshot?.docChanges.map((el) => el?.doc?.data);

//   console.log(test);
//   console.log(querySnapshot);

//   // return querySnapshot;
// }
