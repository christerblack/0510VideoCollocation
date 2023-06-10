import { collection, onSnapshot, getDocs, updateDoc, getDoc, getFirestore, doc, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";
//import { readFirestoreData } from "./crud.js";


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


// handle like 
let like_flag = false;
let dislike_flag = false;
function liked(event) {
  like_flag == false;
  var url_string = window.location.href;
  var url = new URL(url_string);
  var str = url.search;
  str = str.slice(14);
  let like = parseFloat(document.getElementById("counterlike").innerHTML);

  if (dislike_flag !== true) {
    if (like_flag == false) {
      like++;
      like_flag = true;
    } else {
      like--;
      like_flag = false;
    }
  }

  console.log('the button ' + 'like' + ' was pressed' + like);
  //$('likes').css({backgroundColor: "yellow"});
  //$("#myParagraph").css({"backgroundColor": "black", "color": "white"});
  updateFirestoreDatalike(str, like)
  realtimeupdatelike(str, like)

  //realtimeupdate(str)
  //document.getElementById("counterlike").innerText = like;
}

// handle dislike
function disliked(event) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var str = url.search;
  str = str.slice(14);

  let dislike = parseFloat(document.getElementById('counterdislike').innerHTML);

  if (like_flag !== true) {
    if (dislike_flag == false) {
      dislike++;
      dislike_flag = true;
    }
    else {
      dislike--;
      dislike_flag = false;
    }
  }
  // ++counter1;
  console.log('the button ' + 'dislike' + ' was pressed' + dislike);
  realtimeupdatedislike(str, dislike)
  updateFirestoreDatadislike(str, dislike)

  document.getElementById('counterdislike').innerText = dislike;
  //realtimeupdate(str)
}


//updateFirestoreData  like 
export async function updateFirestoreDatalike(str, count) {
  const textid = str;
  const count1 = count;
  var DATAATTR = document.getElementById("counterlike").innerText;
  // var a = $('#counterlike').innerText; //getter
  console.log(Number(DATAATTR), Number(count1));

  const docRef = doc(firestoreDB, "TargetText", textid);

  updateDoc(docRef, {
    like: count1,
    commentliketimestamp: new Date().getTime(),
    commentdate: new Date(),
  })

  console.log("update finished");

}

//updateFirestoreData dislike
export async function updateFirestoreDatadislike(str, count1) {
  const textid = str;
  const aaa = count1;
  //console.log(textid)
  var DATAATTR = document.getElementById("counterdislike").innerText;
  //console.log(Number(DATAATTR),Number(count1));

  const docRef = doc(firestoreDB, "TargetText", textid);

  updateDoc(docRef, {
    dislike: aaa,
    commentdisliketimestamp: new Date().getTime(),
    commentdate: new Date(),
  })

  console.log("update finished");

}

//realtimeupdate like
export async function realtimeupdatelike(str, count) {
  const textid = str;
  const countlike = count

  onSnapshot(doc(firestoreDB, "TargetText", textid), (doc) => {
    const like = doc.data().like
    console.log("Current data: ", doc.data().like, doc.data().dislike);
    const totallike = Number(Number(like) + Number(countlike))
    console.log("Total like: " + totallike)

    //const dislike = doc.data().dislike
    document.getElementById('counterlike').innerText = like;
  });

  console.log("realtime update finished");
}

//realtimeupdate dislike
export async function realtimeupdatedislike(str, count1) {
  const textid = str;
  const dislikecount = count1
  console.log(dislikecount)

  onSnapshot(doc(firestoreDB, "TargetText", textid), (doc) => {
    console.log("Current data: ", doc.data().like, doc.data().dislike);
    const dislike = doc.data().dislike
    //const totalDislike = Number(Number(dislike) + Number(dislikecount))
    //console.log("Total dislike: " +totalDislike)

    document.getElementById('counterdislike').innerText = dislike;
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
