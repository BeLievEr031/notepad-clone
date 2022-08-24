let body = document.querySelector("body");
let zoomIn = document.querySelector('[action="z-in"]');
let zoomOut = document.querySelector("[action='z-out']");
let fontTab = document.querySelector("[action='font_popup_btn']");
let fontDiv = document.querySelector(".font_popup");
let selectFontFamily = document.querySelector('[name="font-family"]');
let selectFontStyle = document.querySelector("[name='font-style']");
let selectFontSize = document.querySelector("[name='font-size']");
let sampleData = document.querySelector(".sample-data");
let popCloseBtn = document.querySelector("[action=close-popup-btn]");
let textArea = document.querySelector(".text-editor-area");
let doneBtn = document.querySelector("#done");
let cancleBtn = document.querySelector("#cancle");
let timeDateBtn = document.querySelector('[action="time"]');
let newBtn = document.querySelector('[action="new"]');
let saveBtn = document.querySelector("[action='save']");
let openBtn = document.querySelector("[action='open']");
let fileToOpen = document.querySelector("[type='file']");
let replaceBtn = document.querySelector("#Replace-btn");
let replaceAllBtn = document.querySelector("#ReplaceAll-btn");
let cancelReplaceTab = document.querySelector(".cancel-bar span");
let replaceInitBtn = document.querySelector('[action="Replace"]');
let selectAll = document.querySelector("[action='selectAll']");
let exitBtn = document.querySelector("[action='exit']");
let undoBtn = document.querySelector("[action='undo']");
let cutBtn = document.querySelector("[action='cut']");
let copyBtn = document.querySelector("[action='copy']");
let pasteBtn = document.querySelector("[action='paste']");
let deleteBtn = document.querySelector("[action='delete']");

openBtn.addEventListener("click", () => {
  fileToOpen.click();
});

let zPixel = 30;
zoomIn.addEventListener("click", () => {
  console.log("zoom in");
  if (zPixel < 150) {
    zPixel += 10;
  }
  // body.style.fontSize = `${zPixel}px`;
  textArea.style.fontSize = `${zPixel}px`;
});

zoomOut.addEventListener("click", () => {
  console.log("zoom out");
  if (zPixel > 16) {
    zPixel -= 10;
  }
  textArea.style.fontSize = `${zPixel}px`;
});

fontTab.addEventListener("click", () => {
  fontDiv.style.display = "block";
});

selectFontFamily.addEventListener("change", () => {
  let fontFamily = selectFontFamily.value;
  sampleData.style.fontFamily = fontFamily;
});

selectFontStyle.addEventListener("change", () => {
  let fontStyle = selectFontStyle.value;
  if (fontStyle == "bold") {
    sampleData.style.fontWeight = fontStyle;
  } else if (fontStyle == "italic") {
    sampleData.style.fontStyle = fontStyle;
  } else if (fontStyle == "normal") {
    sampleData.style.fontWeight = fontStyle;
  } else {
    sampleData.style.fontWeight = "bold";
    sampleData.style.fontStyle = "italic";
  }
});

selectFontSize.addEventListener("change", () => {
  let fontSize = selectFontSize.value;
  sampleData.style.fontSize = fontSize + "px";
});

popCloseBtn.addEventListener("click", () => {
  fontDiv.style.display = "none";
});

doneBtn.addEventListener("click", () => {
  let fontSize = selectFontSize.value;
  let fontStyle = selectFontStyle.value;

  if (fontStyle == "bold") {
    textArea.style.fontWeight = fontStyle;
  } else if (fontStyle == "italic") {
    textArea.style.fontStyle = fontStyle;
  } else if (fontStyle == "normal") {
    textArea.style.fontWeight = fontStyle;
  } else {
    textArea.style.fontWeight = "bold";
    textArea.style.fontStyle = "italic";
  }

  let fontFamily = selectFontFamily.value;
  textArea.style.fontFamily = fontFamily;

  textArea.style.fontSize = fontSize + "px";
  fontDiv.style.display = "none";
});

cancleBtn.addEventListener("click", () => {
  fontDiv.style.display = "none";
});

timeDateBtn.addEventListener("click", () => {
  // textArea.focus();
  let time = new Date();
  textArea.value += time.toLocaleTimeString();
  textArea.value += " " + time.toLocaleDateString() + " ";
  textArea.focus();
});

newBtn.addEventListener("click", () => {
  let isYes = confirm("Do you want new Page..?");
  if (isYes) {
    // textArea.value = " ";
    location.reload();
    textArea.focus();
  }
});

let resource = [
  {
    fontFamily: "",
    fontSize: "",
    fontStyle: "",
    data: "",
  },
];
textArea.addEventListener("change", () => {
  resource[0].data = textArea.value;
  console.log(resource[0].data);
});

saveBtn.addEventListener("click", () => {
  resource[0].fontFamily = window.getComputedStyle(textArea).fontFamily;
  resource[0].fontSize = window.getComputedStyle(textArea).fontSize;
  resource[0].fontStyle = window.getComputedStyle(textArea).fontStyle;

  let strForDownload = JSON.stringify(resource);
  let encodedData = encodeURIComponent(strForDownload);

  // let aDownload = divNotepadMenu.querySelector("a[purpose='download']");

  saveBtn.setAttribute("href", "data:text/json; charset=utf-8, " + encodedData);
  saveBtn.setAttribute("download", "textFile"+ ".json");
});

fileToOpen.addEventListener("change", () => {
  let file = window.event.target.files[0];
  let reader = new FileReader();

  reader.addEventListener("load", function () {
    let data = window.event.target.result;
    let resource = JSON.parse(data);
    console.log(resource);
    textArea.value = resource[0].data;
    textArea.style.fontFamily = resource[0].fontFamily;
    textArea.style.fontStyle = resource[0].fontStyle;
    textArea.style.fontSize = resource[0].fontSize;
  });

  reader.readAsText(file);
});

replaceInitBtn.addEventListener("click", () => {
  document.querySelector(".replace-popup").style.display = "block";
});

replaceBtn.addEventListener("click", () => {
  let word = document.querySelector(".find-word-inp").value.trim();
  let replaceWord = document.querySelector(".replace-word-inp").value.trim();

  let str = textArea.value;
  if (str.includes(word) && word.length > 0) {
    str = str.replace(word, replaceWord);
  } else {
    alert("no data found");
  }
  textArea.value = str;
});

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

replaceAllBtn.addEventListener("click", () => {
  let word = document.querySelector(".find-word-inp").value.trim();
  let replaceWord = document.querySelector(".replace-word-inp").value.trim();
  let str = textArea.value;
  if (str.includes(word) && word.length > 0) {
    str = str.replaceAll(word, replaceWord);
  } else {
    alert("no data found");
  }
  textArea.value = str;
});

cancelReplaceTab.addEventListener("click", () => {
  document.querySelector(".replace-popup").style.display = "none";
});

selectAll.addEventListener("click", () => {
  textArea.value.trim();
  textArea.select();
});

exitBtn.addEventListener("click", () => {
  window.close();
});

let undoData = [];

undoBtn.addEventListener("click", () => {
  undoData = textArea.value.trim().split(" ");
  undoData.splice(undoData.length - 1, 1);

  console.log(undoData);
  let str = undoData.join(" ");
  textArea.value = str;
});

textArea.addEventListener("focus", () => {
  console.log(31);
  textArea.value = textArea.value.trim();
  textArea.focus();
});

cutBtn.addEventListener("click", () => {
  document.execCommand("cut");
});

copyBtn.addEventListener("click", async () => {
  let selection = document.getSelection();
  await navigator.clipboard.writeText(selection);
});

pasteBtn.addEventListener("click", async () => {
  let copiedData = await navigator.clipboard.readText();
  textArea.value += copiedData;
  textArea.focus();
});

deleteBtn.addEventListener("click", async () => {
  document.execCommand("delete");
});
