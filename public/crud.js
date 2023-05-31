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
  limit,
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
  await addDoc(collection(firestoreDB, "TargetText"), {
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
  });
}

// Update Data
async function updateFirestoreData(TargetWord,wordType,translateWord,ExampleSen) {

  const text_KEY = `${TargetWord}`;
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  //console.log(usernameUid)
  const q = query(collection(firestoreDB, "TargetText"), where("targetText", "==", text_KEY), where("useruid", "==", usernameUid));
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
  //const usernameUid = JSON.parse(user).uid;
  const usernamedisplayname = JSON.parse(user).displayName;
  const querySnapshot = await getDocs(collection(firestoreDB, "TargetText"));
  console.log("All firestore order by username how many document filter out: " + querySnapshot.size); // how many document filter out
  
  // clear
  document.querySelector("#containerdis").innerHTML = "";
  querySnapshot.forEach((doc) => {
    var eventdata = doc.data();
    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    //const filterResultObj = { username, example };
    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light border-dark mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    userName.innerHTML = "Username: " + username;
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    //console.log(eventdata);
    //console.log(filterResultObj);
    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}
    // doc.data() is never undefined for query doc snapshots
    // console.log("Username: "+usernamedisplayname, "Document id:"+ doc.id, "ExampleSentence:"+doc.data().ExampleSentence);


export { createFirestoreData, readFirestoreData, updateFirestoreData, deleteFirestoreData ,all };