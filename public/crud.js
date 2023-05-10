import {
  collection,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  addDoc,
  updateDoc,
  writeBatch
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);

// Create Data
async function createFirestoreData(target_text) {
  // const citiesRef = collection(firestoreDB, "users");

  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const username = JSON.parse(user).displayName;
  const originText = document.getElementById("text_english");

  const text_key = `${target_text}`;
  await addDoc(collection(firestoreDB, usernameUid), {
    useruid: `${usernameUid}`,
    name: `${username}`,
    targetText: `${target_text}`,
    originText: `${originText.textContent}`,
    videoSRT: `${subtitlesrc}`,
    timestamp: new Date().getTime(),
    datetime: new Date(),
  });
  console.log("create success");
}
  // await setDoc(doc(citiesRef, "LA"), {
  //     name: "Los Angeles",
  //     state: "CA",
  //     country: "USA",
  //     capital: false,
  //     population: 3900000,
  //     regions: ["west_coast", "socal"],
  //     timestamp: new Date().getTime(),
  //     datetime: new Date(),
  // });


// Read Data
async function readFirestoreData(TargetWord) {
  const text_KEY = `${TargetWord}`;
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const q = query(collection(firestoreDB, usernameUid), where("targetText", "==", text_KEY));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const origintext = doc.data().originText;
    const targettext = doc.data().targetText;
    //console.log(FireDB , typeof(FireDB));
    //  console.log(doc.id, " => ", doc.data().name);
    //  console.log(doc.id, " => ", doc.data().originText);
    //  console.log(doc.id, " => ", doc.data().targetText);
    //  console.log(text_KEY);
  });
}

// Update Data
async function updateFirestoreData(TargetWord,wordType,translateWord,ExampleSen) {

  const text_KEY = `${TargetWord}`;
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;

  const q = query(collection(firestoreDB, usernameUid), where("targetText", "==", text_KEY));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => 
    updateDoc(doc.ref, { 
      translate: translateWord,
      type : wordType,
      ExampleSentence: ExampleSen,
      timestamp: new Date().getTime(),
      datetime: new Date(),
    })  
  )
    console.log("update finished");
}
 

// Delete Data
async function deleteFirestoreData() {
  await deleteDoc(doc(firestoreDB, "cities", "DC"));
}

async function all() {
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const usernamedisplayname = JSON.parse(user).displayName;
  const querySnapshot = await getDocs(collection(firestoreDB, usernameUid));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
   // console.log("Username: "+usernamedisplayname, "Document id:"+ doc.id, "ExampleSentence:"+doc.data().ExampleSentence);
    
  });
}
all();



export { createFirestoreData, readFirestoreData, updateFirestoreData, deleteFirestoreData };