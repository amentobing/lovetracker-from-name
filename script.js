const inputElements = document.querySelectorAll("input");
inputElements.forEach((input, index) => {
  input.addEventListener("keydown", async (event) => {
    if (event.keyCode === 13) {
      if (index === inputElements.length - 1) {
        const i1 = inputElements[0].value,
          i2 = inputElements[1].value;
        return scan(i1, i2);
      }
      event.preventDefault();
      const nextIndex = index + 1;
      inputElements[nextIndex].focus();
    }
  });
});
function scan(nama1, nama2) {
  if (nama1 == "" || nama2 == "") {
    inputElements[0].focus();
    inputElements[0].value = "";
    inputElements[1].value = "";
    return window.alert("KOSONG WOEEE KOSONGGG!!!!!!");
  } else if (
    !/^[a-zA-Z]+$/.test(nama1.trim()) ||
    !/^[a-zA-Z]+$/.test(nama2.trim())
  ) {
    inputElements[0].focus();
    inputElements[0].value = "";
    inputElements[1].value = "";
    return window.alert("Pake HURUF KALO NAMA ORANGG!!");
  }
  if (!history.length < 1) {
    for (let i of history) {
      const data = i.split(",");
      const r_nama1 = data[0],
        r_nama2 = data[1],
        r_percentage = data[2];
      if (r_nama1 == nama1 && r_nama2 == nama2) {
        inputElements[0].focus();
        inputElements[0].value = "";
        inputElements[1].value = "";
        return showUp(r_nama1, r_nama2, r_percentage);
      }
    }
  }
  var randomNumber = Math.random();
  var percentage = randomNumber * 100;
  inputElements[0].focus();
  inputElements[0].value = "";
  inputElements[1].value = "";
  percentage = percentage.toString().slice(0, 4);
  showUp(nama1, nama2, percentage);
  history.push(`${nama1},${nama2},${percentage}`);
  const li = document.createElement("li"),
    h_value = document.createTextNode(`${nama1} & ${nama2} (${percentage}%)`);
  li.setAttribute("id", "history-list");
  li.appendChild(h_value);
  document.getElementById("history").appendChild(li);
}
function showUp(nama1, nama2, percentage) {
  document.getElementById("result").innerHTML = percentage + "%";
  if (percentage > 58) {
    document.getElementById(
      "jodoh"
    ).innerHTML = `<p style="text-align: center">${nama1} &#x2764; ${nama2}</p>`;
  } else {
    document.getElementById("jodoh").innerHTML = "";
  }
}
function reset() {
  history.length = [];
  const historyElements = document.querySelectorAll("li");
  if (historyElements.length === 0)
    return window.alert("History Kosong melompong...");
  historyElements.forEach((input, index) => {
    historyElements[index].remove();
  });
}
