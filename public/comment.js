import { collection, onSnapshot, getDocs, updateDoc, getDoc, getFirestore, doc, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";


const firestoreDB = getFirestore(app);

var url_string = window.location.href;
var url = new URL(url_string);
var str = url.search;
str = str.slice(14);
//console.log(str);  // text id 
filterFirestoreDataUser(str);
//updateFirestoreData(str)

export async function filterFirestoreDataUser(str) {
  const textid = str;
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  // const qCondition = query(citiesRef, where(doc(), "==", textid));
  const querySnapshot = await getDoc(doc(firestoreDB, "TargetText", `${textid}`));

  if (querySnapshot.exists()) {
    // console.log(querySnapshot.data())
  }
  else {
    console.log("No such document")
  }

  // clear
  //  document.querySelector("#containerdis").innerHTML = "";

  const username = querySnapshot.data().name;
  const target = querySnapshot.data().targetText;//`${doc.data().targetText}`;
  const example = querySnapshot.data().ExampleSentence;//`${doc.data().ExampleSentence}`;
  const origin = querySnapshot.data().originText;//`${doc.data().ExampleSentence}`;

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
  document.querySelector("#originsentence").innerHTML += origin;

}


// // handle like and dislike 
let like_flag = false;
let dislike_flag = false;
function liked(event) {
  like_flag == false;
  var url_string = window.location.href;
  var url = new URL(url_string);
  var str = url.search;
  str = str.slice(14);
  let counter = parseFloat(document.getElementById("counterlike").innerHTML);

  //var like = document.querySelector('#counterlike');
  // const likecount = like.textContent
  // let counter1 = parseFloat(document.getElementById('counterdislike').innerHTML);
  // var button1 = event.target.innerText;
  // var dislike = document.querySelector('#counterdislike');
  // const dislikecount = dislike.textContent
  if (dislike_flag !== true) {

    if (like_flag==false) {
      counter++;
      like_flag=true;
    
    } else {
      counter--;
      like_flag=false;
    }
  }
  // ++counter;
  console.log('the button '+'like'+' was pressed' + counter);
  //updateFirestoreData(str, likecount, dislikecount)

  //realtimeupdate(str)
  document.getElementById("counterlike").innerText = counter;
}

function disliked(event) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var str = url.search;
  str = str.slice(14);
  // let counter = parseFloat(document.getElementById('counterlike').innerHTML);
  // var button = event.target.innerText;
  // var like = document.querySelector('#counterlike');
  // const likecount = like.textContent

  let counter1 = parseFloat(document.getElementById('counterdislike').innerHTML);
  //var dislike = document.querySelector('#counterdislike');
 // const dislikecount = dislike.textContent
 if (like_flag !== true) {

   if (dislike_flag==false) {
     counter1--;
     dislike_flag=true;
    }
    else {
      counter1++;
      dislike_flag=false;
    }
  }
    // ++counter1;
  console.log('the button '+'dislike'+' was pressed' + counter1);
  //updateFirestoreData(str, likecount, dislikecount)

  document.getElementById('counterdislike').innerText = counter1;
  //realtimeupdate(str)
}


//updateFirestoreData 
export async function updateFirestoreData(str, likecount, dislikecount) {
  const textid = str;
  const elm = likecount;
  const elm1 = dislikecount;
  //console.log(str);
  //const user = localStorage.getItem("googleUser");
  //const usernameUid = JSON.parse(user).uid;
  //console.log(usernameUid)
  const docRef = doc(firestoreDB, "TargetText", textid);
  //const docSnap = await getDoc(docRef);

  updateDoc(docRef, {
    like: elm,
    dislike: elm1,
    timestamp: new Date().getTime(),
    datetime: new Date(),
  })

  console.log("update finished");

}

export async function realtimeupdate(str) {
  const textid = str;

  const unsub = onSnapshot(doc(firestoreDB, "TargetText", textid), (doc) => {
    console.log("Current data: ", doc.data().like, doc.data().dislike);

    const like = doc.data().like
    document.getElementById('counterlike').innerText = like;
    document.getElementById('counterdislike').innerText = doc.data().dislike;
  });


  console.log("realtime update finished");
}


document.getElementById("comment")?.addEventListener("click", getcomment);
function getcomment() {
  $("#replycomment").removeAttr('style');
  const textinput = document.querySelector('#TextInputField').value;
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const username = JSON.parse(user).displayName;

  console.log(textinput) 
  //console.log(user)

  document.querySelector('.mr-2').innerHTML = username; //comment-text-sm
  document.querySelector('.comment-text-sm').innerHTML = textinput;
  console.log(usernameUid)
  console.log(username)

  //document.querySelector('#TextInputField').value;
  document.querySelector('#TextInputField').vallue = " ";
}

document.getElementById("replybutton")?.addEventListener("click", replyspanhtml);
function replyspanhtml() {

  $("#replyandreply").removeAttr('style');
  console.log("work!")

}



window.disliked = disliked;
window.liked = liked;
