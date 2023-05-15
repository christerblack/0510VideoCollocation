import { collection, getDocs, getDoc, getFirestore, doc, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);

var url_string = window.location.href;
var url = new URL(url_string);
var str = url.search;
str = str.slice(14);
//console.log(str);  // text id 
filterFirestoreDataUser(str);

export async function filterFirestoreDataUser(str) {
  const textid = str;
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  // const qCondition = query(citiesRef, where(doc(), "==", textid));
  const querySnapshot = await getDoc(doc(firestoreDB, "TargetText", `${textid}`));

  if (querySnapshot.exists()) {
    console.log(querySnapshot.data())
  }
  else {
    console.log("No such document")
  }
  // clear
  //  document.querySelector("#containerdis").innerHTML = "";

  const username = querySnapshot.data().name;
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

var btn1 = document.querySelector('#green');
var btn2 = document.querySelector('#red');

btn1.addEventListener('click', function () {

  if (btn2.classList.contains('red')) {
    btn2.classList.remove('red');
  }
  this.classList.toggle('green');

});

btn2.addEventListener('click', function () {

  if (btn1.classList.contains('green')) {
    btn1.classList.remove('green');
  }
  this.classList.toggle('red');

});

// // js for like and disliked
// var lClicks = 0;
// var dClicks = 0;

// $(".likes").on("click", function(){
// 	lClicks += 1;
//     document.getElementById("l-counter").innerHTML = lClicks;
// })

// $(".dislikes").on("click", function(){
// 	dClicks += 1;
//     document.getElementById("d-counter").innerHTML = dClicks;
// })

// handle like and dislike 
let like_flag = false;
 function liked(event) {
  let counter = parseFloat(document.getElementById('counterlike').innerHTML);
  var button = event.target.innerText;
  switch(button){
  	case 'like':
    	if (like_flag==false) {
        counter++;
        like_flag=true;
     
      } else {
      	counter--;
        like_flag=false;
      }
    break;
  }
  console.log('the button like '+button+' was pressed');
  
  document.getElementById('counterlike').innerHTML = counter;
}

let dislike_flag = false;
 function disliked(event) {
let counter1 = parseFloat(document.getElementById('counterdislike').innerHTML);
  var button1 = event.target.innerText;
  switch(button1){
    case 'dislike':
    	if (dislike_flag==false) {
        counter1--;
        dislike_flag=true;
      }
      else {
      	counter1++;
        dislike_flag=false;
      }
    break;
  }
  console.log('the button dislike '+button1+' was pressed');
  
  document.getElementById('counterdislike').innerHTML = counter1;
}
export { disliked,liked  };
window.disliked= disliked;
window.liked= liked;