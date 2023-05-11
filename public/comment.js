import { collection, getDocs, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);


var url_string = window.location.href;
var url = new URL(url_string);
var str = url.search;
str = str.slice(14);
console.log(str);


export async function filterFirestoreDataUser(username, displayname) {
    const userna = username;
    const displayna = displayname;
    const citiesRef = collection(firestoreDB, userna);
    const qCondition = query(citiesRef, where("target", "==", displayna));
    const querySnapshot = await getDocs(qCondition);
    console.log("how many document filter out: " + querySnapshot.size); // how many document filter out
  
    // clear
    document.querySelector("#containerdis").innerHTML = "";
  
    querySnapshot.forEach((doc) => {
      var eventdata = doc.data();
  
      const username = `${doc.data().name}`;
      const target = `${doc.data().targetText}`;
      const example = `${doc.data().ExampleSentence}`;
  
      const filterResultObj = { username, example };
  
      // var container = document.createElement('div');
      // container.setAttribute('class', 'container');
      // container.setAttribute('id', 'containerdiscussion');
      // document.querySelector(".card").append(container);
  
      var card = document.createElement('div');
      card.setAttribute('class', 'card bg-light border-dark mb-3');
      card.setAttribute('id', 'card-container');
      card.setAttribute('style', 'max-width: 70rem;');
      document.querySelector("#containerdis").appendChild(card);
  
      var cardheader = document.createElement('div');
      cardheader.setAttribute('class', 'card-header');
      card.appendChild(cardheader);
  
      var cardbody = document.createElement('div');
      cardbody.setAttribute('class', 'card-body');
      card.appendChild(cardbody);
  
      var cardtitle = document.createElement('h5');
      cardtitle.setAttribute('class', 'card-title');
      document.querySelector(".card-body").appendChild(cardtitle);
  
      var userName = document.createElement('h5');
      var targettext = document.createElement('p');
      var exampleSentence = document.createElement('p');
      userName.innerHTML = "Username: " + username;
      targettext.innerHTML = "TargetText: " + target;
      exampleSentence.innerHTML = "Example Sentence: " + example; // added this
  
      card.appendChild(cardheader);
      card.appendChild(cardbody);
      cardheader.appendChild(userName);
      cardbody.appendChild(targettext);
      cardbody.appendChild(exampleSentence);
      console.log(eventdata);
      console.log(filterResultObj);
    });
  }