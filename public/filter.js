import { collection, getDocs, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);

// Filter data username
export async function filterFirestoreDataUser(username, displayname) {
  const userna = username;
  const displayna = displayname;
  const citiesRef = collection(firestoreDB, userna);
  const qCondition = query(citiesRef, where("name", "==", displayna));
  const querySnapshot = await getDocs(qCondition);
  console.log("how many document filter out: " + querySnapshot.size); // how many document filter out
  querySnapshot.forEach((doc) => {
    var eventdata = doc.data();

    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;

    const filterResultObj = { username, example };

    var container = document.createElement('div');
    container.setAttribute('class', 'container');
    container.setAttribute('id', 'containerdiscussion');
    document.querySelector(".card").append(container);

    var card = document.createElement('div');
    card.setAttribute('class', 'card bg-light border-dark mb-3');
    card.setAttribute('id', 'card-container');
    card.setAttribute('style', 'max-width: 70rem;');
    document.querySelector("#containerdiscussion").appendChild(card);

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




// Filter data Verb+Noun
export async function filterFirestoreDataVN(username, displayname) {
  const userna = username;
  const displayna = displayname;
  const citiesRef = collection(firestoreDB, userna);
  const VN = query(citiesRef, where("type", "==", "Verb + Noun"));
  const querySnapshot1 = await getDocs(VN);
  console.log("how many document filter out: " + querySnapshot1.size); // how many document filter out
  querySnapshot1.forEach((doc) => {
    
    var eventdata = doc.data();

    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const filterResultObj1 = { username, example, type, target };
    Object.keys(filterResultObj1).map(function(_) { return filterResultObj1[_]; })

    console.log(Object.values(filterResultObj1));

    
    document.getElementById('cardhead').innerHTML =  "<div>" + "<p>" + "Username: "+ Object.values(filterResultObj1)[0] + "</p>"; 
    document.getElementById('cardtitle').innerHTML =  "Example Sentence: "+ Object.values(filterResultObj1)[1]  +"<br>"; 
    document.getElementById('cardtext').innerHTML =  "Type: " + Object.values(filterResultObj1)[2] +"<br>" + "Target text: " + Object.values(filterResultObj1)[3] ; 
    
});
}
    // var container = document.createElement('div');
    // container.setAttribute('class', 'container');
    // container.setAttribute('id', 'containerdiscussion');
    // document.querySelector(".card").append(container); 

    // var card = document.createElement('div');
    // card.setAttribute('class', 'card bg-light border-dark mb-3');
    // card.setAttribute('id', 'card-container');
    // card.setAttribute('style', 'max-width: 70rem;');
    // document.querySelector("#containerdiscussion").appendChild(card);

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
    // var types = document.createElement('p');
    // var exampleSentence = document.createElement('p');
    // userName.innerHTML = "Username: "+username;
    // targettext.innerHTML = "TargetText: "+target; 
    // types.innerHTML = "Collocation Types: "+type;
    // exampleSentence.innerHTML = "Example Sentence: "+example; // added this

    // card.appendChild(cardheader);
    // card.appendChild(cardbody);  
    // cardheader.appendChild(userName);
    // cardbody.appendChild(targettext);
    // cardbody.appendChild(types);
    // cardbody.appendChild(exampleSentence);
 
// Filter data Verb+Prep
export async function filterFirestoreDataVPrep(username, displayname) {
  const userna = username;
  const displayna = displayname;
  const citiesRef = collection(firestoreDB, userna);
  const VP = query(citiesRef, where("type", "==", "Verb + Prep"));
  const querySnapshot1 = await getDocs(VP);
  console.log("how many document filter out: " + querySnapshot1.size); // how many document filter out
  querySnapshot1.forEach((doc) => {
    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const filterResultObj1 = { username, example, type , target };
    console.log(filterResultObj1);

    document.getElementById('cardhead').innerHTML =  "<div>" + "<p>" + "Username: "+ username + "</p>"; 
    document.getElementById('cardtitle').innerHTML =  "Example Sentence: "+ example  +"<br>"; 
    document.getElementById('cardtext').innerHTML =  "Type: " + type +"<br>" + "Target text: " + target; 
    
  });
}

// Filter data Verb+Adv
export async function filterFirestoreDataVAdv(username, displayname) {
  const userna = username;
  const displayna = displayname;
  const citiesRef = collection(firestoreDB, userna);
  const VP = query(citiesRef, where("type", "==", "Verb + Adv"));
  const querySnapshot1 = await getDocs(VP);
  console.log("how many document filter out: " + querySnapshot1.size); // how many document filter out
  querySnapshot1.forEach((doc) => {
    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const filterResultObj1 = { username, example, type ,target};
    console.log(filterResultObj1);
    document.getElementById('cardhead').innerHTML =  "<div>" + "<p>" + "Username: "+ username + "</p>"; 
    document.getElementById('cardtitle').innerHTML =  "Example Sentence: "+ example  +"<br>"; 
    document.getElementById('cardtext').innerHTML =  "Type: " + type +"<br>" + "Target text: " + target; 
    
  });
}

const sortVerbNoun = document.querySelector('[data-link="sortVerbNoun"]');
sortVerbNoun?.addEventListener("click", () => {
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const usernamedisplayname = JSON.parse(user).displayName;
  filterFirestoreDataVN(usernameUid, usernamedisplayname);
});

const sortVerbAdv = document.querySelector('[data-link="sortVerbAdv"]');
sortVerbAdv?.addEventListener("click", () => {
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const usernamedisplayname = JSON.parse(user).displayName;
  filterFirestoreDataVAdv(usernameUid, usernamedisplayname);
});

const sortVerbPrep = document.querySelector('[data-link="sortVerbPrep"]');
sortVerbPrep?.addEventListener("click", () => {
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const usernamedisplayname = JSON.parse(user).displayName;
  filterFirestoreDataVPrep(usernameUid, usernamedisplayname);
});

const sortUser = document.querySelector('[data-link="sortUser"]');
sortUser?.addEventListener("click", () => {
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const usernamedisplayname = JSON.parse(user).displayName;
  filterFirestoreDataUser(usernameUid, usernamedisplayname);
});


// // Write Javascript code!
// $(function () {
//   var html = "";
//   $.ajax({
//     url: "https://jsonplaceholder.typicode.com/posts",
//     success: function (result) {
//       $.each(result, function (index, item) {
//         html +=
//           '<div class="card bg-light border-dark mb-3" style="max-width: 70rem;">';
//         html += `<div class="card-header">userid: ${item.userId} - id: ${item.id}</div>`;
//         html += '<div class="card-body">';
//         html += `<h5 class="card-title">${item.title}</h5>`;
//         html += `<p class="card-text">${item.body}</p>`;
//         html += "</div>";
//         html += "</div>";
//         html += "</div>";
//         //using .html() will display one card,use loop to display each card
//       });
//       $("#containerdiscussion").html(html);
//     }
//   });
// });