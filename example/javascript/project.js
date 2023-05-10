$("#btn-add").click(() => {
  const btnHTML = `<button class="btn btn-md btn-success m-2" onclick="openModal(this)" data-id="${Math.floor(Math.random() * 100000)}">Edit Btn</button>`;
  $("#btn-area")[0].insertAdjacentHTML("beforeend", btnHTML);
});

function openModal(e) {
  const dataId = $(e).attr("data-id");
  $(`#exampleModal`).addClass("show");
  $(`#exampleModal`).css("display", "block");
  $("#exampleModal #text").text(`${dataId}`);
}

function closeModal(id) {
  $(`#${id}`).removeAttr("style");
}
