import { collection, setDoc, onSnapshot, getDocs, updateDoc, getDoc, getFirestore, doc, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";
import { readFirestoreData } from "./crud.js";


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
  const like = querySnapshot.data().like;
  const dislike = querySnapshot.data().dislike;

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
  document.getElementById('counterdislike').innerHTML = dislike;
  document.getElementById('counterlike').innerHTML = like;

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

  // 进来网页的时候 要读取 最新的资料 like和dislike 
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

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

// reply comment of post 
document.getElementById("comment")?.addEventListener("click", getcomment);
function getcomment() {
  $("#replycomment").removeAttr('style');
  const target = document.querySelector("#targertext").innerHTML;
  const strsplit = target.split(": ");

  const textinput = document.querySelector('#TextInputField').value;
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const username = JSON.parse(user).displayName;

  document.querySelector('#datetimeshow').innerHTML = formatDate(new Date());
  document.querySelector('.mr-2').innerHTML = username;
  document.querySelector('.comment-text-sm').innerHTML = textinput;

  //document.querySelector('#TextInputField').value;
  document.querySelector('#TextInputField').value = " ";

  createFirestoreData(str, strsplit[1], textinput, username, usernameUid)
  console.log("Create Finish")
}

document.getElementById("replybutton")?.addEventListener("click", replyspanhtml);
function replyspanhtml() {

  $("#replyandreply").removeAttr('style');
  console.log("work!")

}

// reply comment of user comment 
document.getElementById("TextInputFieldUserPost")?.addEventListener('keypress', function getreplycomment(e) {
  if (e.key === 'Enter') {
    // when i click one time it span a class one time but information not access to it

    // var card = document.createElement("div");
    // card.setAttribute("class", "d-flex flex-row align-items-center voting-icons"); // list
    // card.setAttribute("id", "replycommentpost");
    // card.setAttribute("style", "margin-left: 13px;");
    // document.querySelector("#CommentDiv").appendChild(card);

    // var cardtitle = document.createElement("h5");
    // cardtitle.setAttribute("class", "mr-2");
    // cardtitle.setAttribute("id", "ReplyUsername");
    // card.appendChild(cardtitle);
    // var cardtitleDate = document.createElement("p");
    // cardtitleDate.setAttribute("id", "Replydatetimeshow");
    // card.appendChild(cardtitleDate);

    // var cardbody = document.createElement("div");
    // cardbody.setAttribute("class", "comment-text-sm");
    // cardbody.setAttribute("id", "ReplyCommentShow");
    // var cardbodycomment = document.createElement("p");
    // cardbodycomment.setAttribute("id", "postcomment");
    // cardbody.appendChild(cardbodycomment);
    // document.querySelector("#CommentDiv").appendChild(cardbody);
    // $("#replycommentpost").removeAttr('style');
    const textinput = document.querySelector('#TextInputFieldUserPost').value;
    const user = localStorage.getItem("googleUser");
    const username = JSON.parse(user).displayName;
    const datetime = formatDate(new Date());
    //document.querySelector('#Replydatetimeshow').innerHTML = formatDate(new Date());
    //document.querySelector('#ReplyUsername').innerHTML = username;
    //document.querySelector('#postcomment').innerHTML = textinput;

    document.querySelector('#TextInputFieldUserPost').value = " ";
    console.log("work!")

    const newlist =
        "<div class='d-flex flex-row align-items-center voting-icons' id='replycommentpost'>" +
              "<h5 class='mr-2' id='ReplyUsername'>" +
              username + "</h5>" + 
              "<p id='Replydatetimeshow'>" + 
              datetime + "</p>" + 
          "</div>" +
            "<div class='comment-text-sm' id='ReplyCommentShow'>" +
            "<p id='postcomment'>" +  textinput + 
            "</p>" + 
        "</div>"; 

    $("#commentDiv")[0].insertAdjacentHTML("afterbegin", newlist);


  }
});





// Create Data
async function createFirestoreData(textid, targetText, comment, username, useruid) {
  console.log(textid, comment, username, useruid)
  // const citiesRef = collection(firestoreDB, "Comments");

  await setDoc(doc(firestoreDB, "Comments", textid), {
    useruid: useruid,
    targettext: targetText,
    username: username,
    comment: comment,
    timestamp: new Date().getTime(),
    datetime: new Date(),
  });
  console.log("create comments success");
}
// Read User Data
async function readUserData(uid) {
  console.log(uid)
  const user = localStorage.getItem("googleUser");
  const usernameUid = uid //JSON.parse(user).uid;
  const q = query(collection(firestoreDB, "TargetText"), where("useruid", "==", usernameUid));
  const querySnapshot = await getDocs(q);
  // clear
  console.log("All firestore order by username how many document filter out: " + querySnapshot.size);
  document.querySelector("#listgroup").innerHTML = "";
  querySnapshot.forEach((doc) => {

    const target = `${doc.data().targetText}`;
    const videotime = `${doc.data().videotimestamp}`;
    const videoEP = `${doc.data().video}`;

    var card = document.createElement("li");
    card.setAttribute("class", "list-group-item"); // list
    card.setAttribute("id", "list-Item");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#listgroup").appendChild(card); // ul 包住 li
    card.innerHTML = "TargetText: " + target;

    var videotimestamp = document.createElement("p");
    videotimestamp.innerHTML = "Collocations exist on video " + videoEP + " time is: " + videotime;
    card.appendChild(videotimestamp);

    // card.addEventListener("click", () => {
    //   window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    // });
    // card.classList.add("text");
  });
}

window.disliked = disliked;
window.liked = liked;

export { createFirestoreData, readUserData };
