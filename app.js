//상수 설정
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");
const image = document.getElementById("jsImage");
const jsTri = document.getElementById("jsTri");
const jsRect = document.getElementById("jsRect");
const jsCircle = document.getElementById("jsCircle");
const fontBt = document.getElementById("jsFontBt");
const ftSize = document.getElementById("jsFtSize");

const INITIAL_COLOR = "#000000";
//변수 초기화
let painting = false;
let filling = false;
let changing = false;
let drawRect = false;
let drawTriangle = false;
let drawCircle = false;
let sizeChange = 0;

//캔버스 사이즈
canvas.width = 1000;
canvas.height = 700;

ctx.fontSize = "20px";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 마우스 경로
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
//그리기, 멈추기
function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function onMouseUp() {
  stopPainting();
}

//색깔 바꾸기
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//두께조절
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//그리기, 채우기 전환 함수
function handleModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerText = "그리기";
  } else {
    filling = true;
    mode.innerText = "채우기";
  }
}

//배경색 채우기
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//저장하기 함수
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "JS_Canvas";
  link.click();
}

//모두지우기 함수
function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//이미지 불러오기 함수
function handleImageClick(files) {
  var file = files[0];

  if (!file.type.match(/image.*/)) {
    alert("not image file!");
  }
  var reader = new FileReader();

  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

//삼각형 그리기
function handleTriangleClick() {
  if (drawTriangle == true) {
    drawTriangle = false;
    jsTri.innerText = "삼각형";
  } else {
    drawTriangle = true;
    jsTri.innerText = "멈추기";
  }

  canvas.onclick = function (e) {
    if (drawTriangle) {
      const color = e.target.style.backgroundColor;
      var x = e.offsetX;
      var y = e.offsetY;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 60, y + 60);
      ctx.lineTo(x + 60, y + 60);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  };
}

//사각형 그리기
function handleRectangleClick() {
  if (drawRect == true) {
    drawRect = false;
    jsRect.innerText = "사각형";
  } else {
    drawRect = true;
    jsRect.innerText = "멈추기";
  }

  canvas.onclick = function (e) {
    if (drawRect) {
      const color = e.target.style.backgroundColor;
      var x = e.offsetX;
      var y = e.offsetY;
      ctx.beginPath();
      ctx.rect(x, y, 70, 70);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  };
}

//원 그리기
function handleCircleClick() {
  if (drawCircle == true) {
    drawCircle = false;
    jsCircle.innerText = "원형";
  } else {
    drawCircle = true;
    jsCircle.innerText = "멈추기";
  }

  canvas.onclick = function (e) {
    if (drawCircle) {
      const color = e.target.style.backgroundColor;
      var x = e.offsetX;
      var y = e.offsetY;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.arc(x, y, 30, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  };
}

//글자 크기 변경 5단계
function fontSizeChange() {
  if (sizeChange == 0) {
    sizeChange = 1;
    ftSize.innerText = "글자크기2";
    ctx.fontSize = "30px";
  } else if (sizeChange == 1) {
    sizeChange = 2;
    ftSize.innerText = "글자크기3";
    ctx.fontSize = "40px";
  } else if (sizeChange == 2) {
    sizeChange = 3;
    ftSize.innerText = "글자크기4";
    ctx.fontSize = "50px";
  } else if (sizeChange == 3) {
    sizeChange = 4;
    ftSize.innerText = "글자크기5";
    ctx.fontSize = "60px";
  } else if (sizeChange == 4) {
    sizeChange = 0;
    ftSize.innerText = "글자크기1";
    ctx.fontSize = "20px";
  }
}

//폰트 변경 버튼
function handleFontBtClick() {
  if (changing == true) {
    changing = false;
    fontBt.innerText = "폰트1";
  } else {
    changing = true;
    fontBt.innerText = "폰트2";
  }
}

//폰트 변경
function handleFontChange() {
  font = ctx.fontSize + " arial sans-Serif";
  if (changing) {
    font = ctx.fontSize + " Times New Roman";
  }
}

//텍스트 쓰기
window.onload = function () {
  canvas.ondblclick = function (e) {
    //더블클릭
    addInput(e.offsetX, e.offsetY);
  };

  function addInput(x, y) {
    var input = document.createElement("input");

    input.type = "text";
    input.style.position = "fixed";
    input.style.left = x + "px";
    input.style.top = y + "px";

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();
  }

  //엔터 인식, 텍스트 입력
  function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      //13은 Enter의 키코드값
      let drawTx = new draw_Text(
        this.value,
        parseInt(this.style.left, 10),
        parseInt(this.style.top, 10)
      );
      drawTx.drawText(drawTx.txt, drawTx.x, drawTx.y);
      document.body.removeChild(this);
    }
  }

  //텍스트 츨력, 객체
  class draw_Text {
    constructor(txt, x, y) {
      this.txt = txt;
      this.x = x;
      this.y = y;
    }
    drawText(txt, x, y) {
      handleFontChange();
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.font = font;
      ctx.fillText(txt, x, y);
    }
  }
};
//버튼 인식,및 실행
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (clear) {
  clear.addEventListener("click", handleClearClick);
}

if (image) {
  image.addEventListener("click", handleImageClick);
}

if (jsTri) {
  jsTri.addEventListener("click", handleTriangleClick);
}

if (jsRect) {
  jsRect.addEventListener("click", handleRectangleClick);
}

if (jsCircle) {
  jsCircle.addEventListener("click", handleCircleClick);
}

if (fontBt) {
  fontBt.addEventListener("click", handleFontBtClick);
}

if (ftSize) {
  ftSize.addEventListener("click", fontSizeChange);
}
