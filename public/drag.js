import { createFirestoreData } from "./crud.js";
import { readFirestoreData } from "./crud.js";

// events fired on the draggable target //
document.addEventListener("drag", (event) => {
  event.preventDefault();

  let target_text = window.getSelection().toString();
  // console.log(event);

  //localStorage.clear();

  window.localStorage.setItem("targetText", target_text); // 同步的问题 我存到旧的 而不是最新的那一笔资料
  if (target_text.length > 0 && target_text !== "undefined") {
    createFirestoreData(target_text)
      .then(() => {
        console.log("save successful");
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  readFirestoreData(target_text)
    .then(() => {
      console.log("read successful");
    })
    .catch((err) => {
      console.error({ err });
    });

 // createspan(target_text);
  let origin_text = document.getElementById("text_english").textContent;
  createbutton(target_text, origin_text);
});

const target = document.getElementById("dict");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

// function createspan(target_text) {
//   let video_time = document.getElementById("video1");
//   let videotimemin = Math.floor(video_time.currentTime / 60);
//   let videotimesc = Math.floor(video_time.currentTime % 60);

//   let text2 = document.getElementById("text_english");
//   let b = text2.innerHTML;
//   let c = "<fa id='targetText' style='color: red;'>" + target_text + "</fa>";
//   var str = b;
//   var newstr = str.replace(target_text, c);
//   text2.innerHTML = newstr;

//   const newlist =
//     "<div class='dropzoneid' id='dict12' style='display: flex; padding:10px 10px' >" +
//     "<a href='javascript:void(0)' class='go-back-video-timer-btn'>" +
//     videotimemin +
//     ":" +
//     videotimesc +
//     "</a>" +
//     "<p id='collocationtargetword' >" +
//     target_text +
//     "</p>" +
//     "</div>";
//   $("#dict")[0].insertAdjacentHTML("beforeend", newlist);

//   let timer = document.querySelectorAll(".go-back-video-timer-btn");

//   for (let i = 0; i < timer.length; i++) {
//     timer[i].addEventListener("click", function (e) {
//       const goBackVideoTimer = e.target.text;

//       console.log(goBackVideoTimer);
//       const splitStr = goBackVideoTimer.split(":");
//       const min = parseInt(splitStr[0]); // min = number
//       const sec = parseInt(splitStr[1]); // sec = number

//       let minutetosec = min * 60;
//       let totalsec = parseInt(minutetosec + sec);

//       document.getElementById("video1").currentTime = totalsec;
//     });
//   }
// }

function createbutton(target_text, origin_text) {
  let video_time = document.getElementById("video1");
  let videotimemin = Math.floor(video_time.currentTime / 60);
  let videotimesc = Math.floor(video_time.currentTime % 60);
  //console.log(toHoursAndMinutes(video_time.currentTime/60));

  let text2 = document.getElementById("text_english");
  let b = text2.innerHTML;
  let c = "<fa id='targetText' style='color: red;'>" + target_text + "</fa>";
  var str = b;
  var newstr = str.replace(target_text, c);
  text2.innerHTML = newstr;
    
   // createbutton
   let text = target_text.toString();
   let origin = origin_text.trim().toString();

  const newlist =
    "<div class='dropzoneid' id='dict12' style='display: flex; padding:10px 10px' >" +
    "<a href='javascript:void(0)' class='go-back-video-timer-btn'>" +
    videotimemin +
    ":" +
    videotimesc +
    "</a>" +
    "<p id='collocationtargetword' >" +
    target_text +
    "</p>" +
    `<button class="btn btn-md btn-success m-2" onclick='openModal(this)' data-id="${Math.floor(Math.random() * 100000)}" data-target-text="${text}" data-origin-text="${origin}">Edit Btn</button>`;
    + "</div>";
  $("#dict")[0].insertAdjacentHTML("beforeend", newlist);

  let timer = document.querySelectorAll(".go-back-video-timer-btn");

  for (let i = 0; i < timer.length; i++) {
    timer[i].addEventListener("click", function (e) {
      const goBackVideoTimer = e.target.text;

      console.log(goBackVideoTimer);
      const splitStr = goBackVideoTimer.split(":");
      const min = parseInt(splitStr[0]); // min = number
      const sec = parseInt(splitStr[1]); // sec = number

      let minutetosec = min * 60;
      let totalsec = parseInt(minutetosec + sec);

      document.getElementById("video1").currentTime = totalsec;
    });
  }
  
  // const list ="<a href='javascript:void(0)' class='go-back-video-timer-btn'>" +
  //   videotimemin +
  //   ":" +
  //   videotimesc +
  //   "</a>";
  //   $("#modaltimestamp")[0].insertAdjacentHTML("beforeend", list);
  
  // createbutton
  // let text = target_text.toString();
  // let origin = origin_text.trim().toString();


  // const listHTML = `<button class="btn btn-md btn-success m-2" onclick='openModal(this)' data-id="${Math.floor(Math.random() * 100000)}" data-target-text="${text}" data-origin-text="${origin}">Edit Btn</button>`;
  // $('.dropzone')[0].insertAdjacentHTML("beforeend", listHTML);
}

target.addEventListener("drop", (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();

  // move dragged element to the selected drop target
  //if (event.target.className == "dropzone") {
  //createspan();

  //}
});

var submitbutton = document.querySelectorAll(".btn btn-primary");

submitbutton.forEach(box => {
  box.addEventListener('click', function handleClick(event) {
    console.log('box clicked', event);

  });
});
/*
    document.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        event.target.classList.add("dragging");
    });

    document.addEventListener("dragend", (event) => {
        // reset the transparency
        event.target.classList.remove("dragging");
    });

    /* events fired on the drop targets */
/*   document.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", (event) => {
        // highlight potential drop target when the draggable element enters it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");
        }
    });

    document.addEventListener("dragleave", (event) => {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
        }
    });

    document.addEventListener("drop", (event) => {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged element to the selected drop target
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
        }
    });
*/
