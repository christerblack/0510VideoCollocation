const select2Dropdown = ["select2-01", "select2-02", "select2-03"];
// In your Javascript (external .js resource or <script> tag)
$(document).ready(function () {
  select2Dropdown.forEach((selectID) => {
    // Dropdown init
    $(`#${selectID}`).select2({
      minimumResultsForSearch: -1,
      dropdownParent: $(`#${selectID}-parent`),
    });
  });
});

function modalSave() {
  let dropdownArrayValue = [];
  let inputArrayValue = [];
  select2Dropdown.forEach((selectID) => {
    const dropdownVal = $(`#${selectID}`).val();
    dropdownArrayValue.push({ selectID: dropdownVal });
  });

  const modalInput = $("#exampleModal input");

  for (let i = 0; i < modalInput.length; i++) {
    let inputName = modalInput[i].getAttribute("name");
    let inputValue = modalInput[i].value;

    let obj = {};
    obj[`${inputName}`] = inputValue;
    inputArrayValue.push(obj);
  }

  console.log({ inputArrayValue });
  console.log({ dropdownArrayValue });
}
