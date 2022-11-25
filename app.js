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
const main = document.querySelector("main");
const fontBt = document.getElementById("jsFontBt");

const INITIAL_COLOR = "#000000";

let painting = false;
let filling = false;
let changing = false;
let drawRect = false;
let drawTriangle = false;
let drawCircle = false;

canvas.width = 1000;
canvas.height = 700;

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
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
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
//배경색 채우기
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
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

//저장하기 함수
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
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
  font = "50px arial sans-Serif";
  if (changing) {
    font = "50px Times New Roman";
  }
}

//텍스트 쓰기
window.onload = function () {
  var hasInput = false;

  canvas.ondblclick = function (e) {
    if (hasInput) return;
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

    hasInput = true;
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
      hasInput = false;
    }
  }

  //텍스트 츨력
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
//버튼 인식
{
  if (save) {
    save.addEventListener("click", handleSaveClick);
  }

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
}
