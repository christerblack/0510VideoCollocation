import { collection, getDocs, getDoc, getFirestore, doc, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);


var url_string = window.location.href;
var url = new URL(url_string);
var str = url.search;
str = str.slice(14);
console.log(str);  // text id 
filterFirestoreDataUser(str);

export async function filterFirestoreDataUser(str) {
    const textid = str;
   //const userna = username;
    //const displayna = displayname;
    const citiesRef = collection(firestoreDB, "TargetText");
   // const qCondition = query(citiesRef, where(doc(), "==", textid));
    const querySnapshot = await getDoc(doc(firestoreDB, "TargetText" , `${textid}` ));
   
    if (querySnapshot.exists()) {
      console.log(querySnapshot.data())
    }
    else {
      console.log("No such document")
    }
    // clear
  //  document.querySelector("#containerdis").innerHTML = "";
  
      var eventdata = querySnapshot.data()
  
      const username = eventdata.name;
      const target = querySnapshot.data().targetText;//`${doc.data().targetText}`;
      const example = querySnapshot.data().ExampleSentence;//`${doc.data().ExampleSentence}`;
  
      //const filterResultObj = { username, example };
      // var card = document.createElement('div');
      // card.setAttribute('class', 'card');
      // card.setAttribute('id', 'card-container');
      // card.setAttribute('style', 'max-width: 70rem;');
      // document.querySelector("#containerdis").appendChild(card);
  
      // var cardheader = document.createElement('div');
      // cardheader.setAttribute('class', 'card-header');
      // card.appendChild(cardheader);
  
      // var cardbody = document.createElement('div');
      // cardbody.setAttribute('class', 'card-body');
      // card.appendChild(cardbody);
  
      // var cardtitle = document.createElement('h5');
      // cardtitle.setAttribute('class', 'card-title');
      // document.querySelector(".card-body").appendChild(cardtitle);
  
      // var userName = document.createElement('h5');
      // var targettext = document.createElement('p');
      // var exampleSentence = document.createElement('p');
      // userName.innerHTML = "Username: " + username;
      // targettext.innerHTML = "TargetText: " + target;
      // exampleSentence.innerHTML = "Example Sentence: " + example; // added this
  
      // card.appendChild(cardheader);
      // card.appendChild(cardbody);
      // cardheader.appendChild(userName);
      // cardbody.appendChild(targettext);
      // cardbody.appendChild(exampleSentence);
      //console.log(eventdata);
      //console.log(filterResultObj);
      document.querySelector("#username").innerHTML += username;
      document.querySelector("#targertext").innerHTML += target;
      document.querySelector("#examplesentence").innerHTML += example;


    }
