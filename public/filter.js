import { collection, getDocs, getFirestore, limit ,query, orderBy, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);

// Filter data username
export async function filterFirestoreDataUser(WordTypeUser) {
  const wordtype = WordTypeUser;
  //const userna = username; //google uid
  //const displayna = displayname; // christer
  //const doc = this.doc;
  const citiesRef = collection(firestoreDB, "TargetText");
  const qCondition = query(citiesRef, wordtype, orderBy("name"));
  const querySnapshot = await getDocs(qCondition);
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

// Filter data frequency
export async function filterFirestoreDataFrequency(WordTypeFreq) {
  const wordtype = WordTypeFreq;

  const citiesRef = collection(firestoreDB, "TargetText");
  const qCondition = query(citiesRef, wordtype, orderBy("targetText"));
  const querySnapshot = await getDocs(qCondition);
  console.log("All firestore order by targettext and wordtype how many document filter out: " + querySnapshot.size); // how many document filter out

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

// Filter data Verb+Noun
export async function filterFirestoreDataVN() {
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  const VN = query(citiesRef, where("type", "==", "Verb + Noun"));
  const querySnapshot1 = await getDocs(VN);
  console.log("V+N how many document filter out: " + querySnapshot1.size); // how many document filter out

  document.querySelector("#containerdis").innerHTML = "";
  const allEventData = [];
  querySnapshot1.forEach((doc) => {
    var eventdata = doc.data();
    //console.log("abc>>"+doc.id + doc.data())
    allEventData.push(eventdata);
    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    //const filterResultObj = { username, example };

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
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
    userName.addEventListener("click", () => {
      // clear container
      document.querySelector("#containerdis").innerHTML = "";
      // render user's text
      // const userEventData = allEventData.filter((text) => text.useruid === eventdata.useruid);
      // userEventData.forEach((text) => {
      //   // card
      //   let card = document.createElement('div');
      //   card.setAttribute('class', 'card bg-light mb-3');
      //   card.setAttribute('id', 'card-container');
      //   card.setAttribute('style', 'max-width: 70rem;');
      //   document.querySelector("#containerdis").appendChild(card);

      //   let userName = document.createElement('h5');
      //   userName.innerHTML = "Username: " + text.name;

      //   let targettext = document.createElement('p');
      //  // targettext.innerHTML = "TargetText: " + text.targetText;

      //   let exampleSentence = document.createElement('p');
      //  /// exampleSentence.innerHTML = "Example Sentence: " + text.ExampleSentence; // added this

      //   let cardheader = document.createElement('div');
      //   cardheader.setAttribute('class', 'card-header');
      //   card.appendChild(cardheader);

      //   let cardbody = document.createElement('div');
      //   cardbody.setAttribute('class', 'card-body');
      //   card.appendChild(cardbody);

      //   let cardtitle = document.createElement('h5');
      //   cardtitle.setAttribute('class', 'card-title');
      //   document.querySelector(".card-body").appendChild(cardtitle);

      //   cardheader.appendChild(userName);
      //   cardbody.appendChild(targettext);
      //   cardbody.appendChild(exampleSentence);
      // })
    });
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);

    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}

// Filter data Verb+Prep
export async function filterFirestoreDataVPrep() {
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  const VP = query(citiesRef, where("type", "==", "Verb + Prep"));
  const querySnapshot1 = await getDocs(VP);
  console.log("V+P how many document filter out: " + querySnapshot1.size); // how many document filter out

  document.querySelector("#containerdis").innerHTML = "";
  const allEventData = [];
  querySnapshot1.forEach((doc) => {
    var eventdata = doc.data();
    //console.log("abc>>"+doc.id + doc.data())
    allEventData.push(eventdata);
    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    //const filterResultObj = { username, example };

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
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
    userName.addEventListener("click", () => {
      // clear container
      document.querySelector("#containerdis").innerHTML = "";
    });
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);

    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}

// Filter data Verb+Adv
export async function filterFirestoreDataVAdv() {
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  const VA = query(citiesRef, where("type", "==", "Verb + Adv"));
  const querySnapshot1 = await getDocs(VA);
  console.log("V+Adv how many document filter out: " + querySnapshot1.size); // how many document filter out

  document.querySelector("#containerdis").innerHTML = "";
  const allEventData = [];
  querySnapshot1.forEach((doc) => {
    var eventdata = doc.data();
    //console.log("abc>>"+doc.id + doc.data())
    allEventData.push(eventdata);
    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    //const filterResultObj = { username, example };

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
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
    userName.addEventListener("click", () => {
      // clear container
      document.querySelector("#containerdis").innerHTML = "";
    });
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);

    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}

//sort V+N and listen to sort by username
const sortVerbNoun = document.querySelector('[data-link="sortVerbNoun"]');
sortVerbNoun?.addEventListener("click", () => {
  filterFirestoreDataVN();
  //first filter V+N and then sort by username
  const sortUserVN = document.querySelector('[data-link="sortUser"]');
  sortUserVN?.addEventListener("click", () => {
    const wordtypeNoun = where("type", "==", "Verb + Noun");
    filterFirestoreDataUser(wordtypeNoun);
  });
});

//sort V+Adv and listen to sort by username
const sortVerbAdv = document.querySelector('[data-link="sortVerbAdv"]');
sortVerbAdv?.addEventListener("click", () => {
  filterFirestoreDataVAdv();

  //first filter V+Adv and then sort by username
  const sortUserAdv = document.querySelector('[data-link="sortUser"]');
  sortUserAdv?.addEventListener("click", () => {
    const wordtypeAdv = where("type", "==", "Verb + Adv");
    filterFirestoreDataUser(wordtypeAdv);
  });
});

//sort V+Prep and listen to sort by username
const sortVerbPrep = document.querySelector('[data-link="sortVerbPrep"]');
sortVerbPrep?.addEventListener("click", () => {
  filterFirestoreDataVPrep();

  //first filter V+Adv and then sort by username
  const sortUserPrep = document.querySelector('[data-link="sortUser"]');
  sortUserPrep?.addEventListener("click", () => {
    const wordtypePrep = where("type", "==", "Verb + Prep");
    filterFirestoreDataUser(wordtypePrep);
  });
});

//only sort user but nt need to do anythings
const sortUser = document.querySelector('[data-link="sortUser"]');
sortUser?.addEventListener("click", () => {
  document.querySelector("#containerdis").innerHTML = "";
  //filterFirestoreDataUser();
});

//only sort frequency but nt need to do anythings
const sortFrequency = document.querySelector('[data-link="sortFrequency"]');
sortFrequency?.addEventListener("click", () => {
  document.querySelector("#containerdis").innerHTML = "";
  //filterFiresnostoreDataFrequency();
});

//sort V+N and listen to sort by frequency
const sortVNFrequency = document.querySelector('[data-link="sortVerbNoun"]');
sortVNFrequency?.addEventListener("click", () => {
  filterFirestoreDataVN();
  //first filter V+N and then sort by frequency
  const sortFrequnVN = document.querySelector('[data-link="sortFrequency"]');
  sortFrequnVN?.addEventListener("click", () => {
    const wordtypeFreqNoun = where("type", "==", "Verb + Noun");
    filterFirestoreDataFrequency(wordtypeFreqNoun);
  });
});

//sort V+Adv and listen to sort by frequency
const sortVAdvFrequency = document.querySelector('[data-link="sortVerbAdv"]');
sortVAdvFrequency?.addEventListener("click", () => {
  filterFirestoreDataVAdv();
  //first filter V+N and then sort by frequency
  const sortFrequnVAdv = document.querySelector('[data-link="sortFrequency"]');
  sortFrequnVAdv?.addEventListener("click", () => {
    const wordtypeFreqVAdv = where("type", "==", "Verb + Adv");
    filterFirestoreDataFrequency(wordtypeFreqVAdv);
  });
});

//sort V+Prep and listen to sort by frequency
const sortVPrepFrequency = document.querySelector('[data-link="sortVerbPrep"]');
sortVPrepFrequency?.addEventListener("click", () => {
  filterFirestoreDataVPrep();
  //first filter V+Prep and then sort by frequency
  const sortFrequnVPrep = document.querySelector('[data-link="sortFrequency"]');
  sortFrequnVPrep?.addEventListener("click", () => {
    const wordtypeFreqVprep = where("type", "==", "Verb + Prep");
    filterFirestoreDataFrequency(wordtypeFreqVprep);
  });
});

export async function filtercountingGroupbytargettext() {
  //const wordtype = WordTypeFreq;
  const citiesRef = collection(firestoreDB, "TargetText");
  const qCondition = query(citiesRef, orderBy("targetText"));
  const querySnapshot = await getDocs(qCondition);
  console.log("All firestore order by targettext and wordtype how many document filter out: " + querySnapshot.size); // how many document filter out
  //clear
  //document.querySelector("#containerdis").innerHTML = "";
  querySnapshot.forEach((doc) => {
  
   var eventdata = doc.data();
   const id = doc.id;
   const username = `${doc.data().name}`;
   const type = `${doc.data().type}`;
   const target = `${doc.data().targetText}`;
   const example = `${doc.data().ExampleSentence}`;
   const filterResultObj = { id,username,type,target };
   //console.log("filtercouting"+ doc.id + username + type + target + example );
   console.log(filterResultObj);
});

}
filtercountingGroupbytargettext();