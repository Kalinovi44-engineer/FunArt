var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

let range = document.querySelector('.number');
let rangeNum = document.querySelector('.range-num');
let startsFlag = 0;

var timer;
var textArray = [];

var currentTextIndex = -1;
var findTextIndex = 0;
var prevTextIndex;
var nextTextIndex;

//  Описываем поведение зарисовки круга
// Определяем центр круга
const x = canvas.width / 2;
const y = canvas.height / 2;

// Определяем радиус круга
const radius = 60;
var kFill = 0;

statusMuteVoice = 0;
function muteVoice() {
    if (statusMuteVoice == 0) {
        statusMuteVoice = 1;
        document.getElementById("btn-mute-voice").style.color = "#00ff00";
    } else {
        statusMuteVoice = 0;
        document.getElementById("btn-mute-voice").style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-btn-color');
    }
}

function playVoice(index) {
    let audio = new Audio('sound/voice/ua-w-' + index + '.mp3');
    audio.volume = statusMuteVoice;
    audio.play();
}

let numberSong = 1;
let playbackStatus = 0;

//Указать сколько песен в папке источнике
let numberOfSongs = 50;

let song = new Audio('sound/songs/' + numberSong + '.mp3');

function playMusic() {
    if (playbackStatus == 0) {
        song.volume = 0.1;
        song.play();
        playbackStatus = 1;
        document.getElementById("btn-play").style.color = "#00ff00";
        document.getElementById("btn-play").querySelector("i").classList.remove("fa-play");
        document.getElementById("btn-play").querySelector("i").classList.add("fa-pause");
    } else {
        song.pause();
        playbackStatus = 0;
        document.getElementById("btn-play").style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-btn-color');
        document.getElementById("btn-play").querySelector("i").classList.remove("fa-pause");
        document.getElementById("btn-play").querySelector("i").classList.add("fa-play");
    }
}

function nextSong() {
    song.pause();
    playbackStatus = 0;
    if (numberSong < numberOfSongs) {
        numberSong++;

    } else {
        numberSong = 1;
    }
    console.log(numberSong);
    song = new Audio('sound/songs/' + numberSong + '.mp3');
    song.volume = 0.1;
    song.play();
    playbackStatus = 1;
    document.getElementById("btn-play").style.color = "#00ff00";
    document.getElementById("btn-play").querySelector("i").classList.remove("fa-play");
    document.getElementById("btn-play").querySelector("i").classList.add("fa-pause");
}

function prevSong() {
    song.pause();
    playbackStatus = 0;
    if (numberSong > 1) {
        numberSong--;

    } else {
        numberSong = numberOfSongs;
    }
    console.log(numberSong);
    song = new Audio('sound/songs/' + numberSong + '.mp3');
    song.volume = 0.2;
    song.play();
    playbackStatus = 1;
    document.getElementById("btn-play").style.color = "#00ff00";
    document.getElementById("btn-play").querySelector("i").classList.remove("fa-play");
    document.getElementById("btn-play").querySelector("i").classList.add("fa-pause");
}

function drawCircle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Начинаем новый путь
    context.beginPath();
    // Рисуем круг
    context.arc(x, y, radius, 0, 2 * Math.PI * kFill);
    // Задаем цвет обводки
    context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--filling-circle');
    // Задаем толщину линии обводки
    context.lineWidth = 10;
    // Рисуем обводку круга
    context.stroke();

    // Рисуем второй круг
    context.beginPath();
    context.arc(x, y, radius + 5, 0, 2 * Math.PI);
    context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
    context.lineWidth = 1;
    context.stroke();
}

//создаем преветствующий текст
context.font = "28px Arial";
context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--main-number');
context.textBaseline = "middle";
context.textAlign = "center";
context.fillText("Добро пожаловать!", canvas.width / 2, canvas.height / 3);
context.font = "14px Arial";
context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
context.fillText("Введите ключ для запуска программы", canvas.width / 2, canvas.height / 3 * 2);

//обработка значения на ползунке установки времени
range.oninput = function () {
    btnStop();
    rangeNum.innerHTML = this.value;
}

function btnNext() {
    if (currentTextIndex < textArray.length - 1) {
        currentTextIndex++;
        kFill += 1 / textArray.length;
    } else {
        currentTextIndex = 0;
        kFill = 1 / textArray.length;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (kFill <= 1.01) {
        drawCircle();
    }

    context.font = "50px Righteous";
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--main-number');
    context.fillText(textArray[currentTextIndex], canvas.width / 2, canvas.height / 2);
    context.font = "12px Righteous";
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
    context.fillText(currentTextIndex + 1 + "/" + textArray.length, canvas.width / 2, canvas.height / 4 * 3);
    if (currentTextIndex > 0) {
        prevTextIndex = currentTextIndex - 1;
        context.font = "26px Righteous";
        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
        context.fillText(textArray[prevTextIndex], 50, canvas.height / 2);
        playVoice(textArray[currentTextIndex]);
    }
    if (currentTextIndex < textArray.length - 1) {
        nextTextIndex = currentTextIndex + 1;
        context.font = "26px Righteous";
        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
        context.fillText(textArray[nextTextIndex], 250, canvas.height / 2);
    }
}
function btnPrev() {
    if (currentTextIndex > 0) {
        currentTextIndex--;
        kFill -= 1 / textArray.length;
    } else {
        currentTextIndex = textArray.length - 1;
        kFill = 1 / textArray.length;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (kFill < 1.01) {
        drawCircle();
    }
    context.font = "50px Righteous";
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--main-number');
    context.fillText(textArray[currentTextIndex], canvas.width / 2, canvas.height / 2);
    context.font = "12px Righteous";
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
    context.fillText(currentTextIndex + 1 + "/" + textArray.length, canvas.width / 2, canvas.height / 4 * 3);
    if (currentTextIndex > 0) {
        prevTextIndex = currentTextIndex - 1;
        context.font = "26px Righteous";
        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
        context.fillText(textArray[prevTextIndex], 50, canvas.height / 2);
    }
    if (currentTextIndex < textArray.length - 1) {
        nextTextIndex = currentTextIndex + 1;
        context.font = "26px Righteous";
        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--side-numbers');
        context.fillText(textArray[nextTextIndex], 250, canvas.height / 2);
    }
}

function btnStart() {
    if (startsFlag == 0) {
        startsFlag = 1;
        if (range.value > 0) {
            var time = range.value * 1000;
            timer = setInterval(btnNext, time);
            document.getElementById("btn-start").style.color = "#00ff00";
        }
    }
}

function btnStop() {
    startsFlag = 0;
    clearInterval(timer);
    document.getElementById("btn-start").style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-btn-color');
}
// Описываем загрузку кода и парсинг его в массив
function loadData() {
    let inputVal = document.getElementById("myLoad").value;
    let decodedValue = window.atob(inputVal).split('').map(function (v) { return v.codePointAt(0) });
    textArray = decodedValue;
    document.getElementById("myLoad").value = "";
    if (textArray[0] == "0") {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "28px Arial";
        context.fillStyle = "#4a5568";
        context.fillText("Добро пожаловать!", canvas.width / 2, canvas.height / 3);
        context.font = "14px Arial";
        context.fillStyle = "#24e33b";
        context.fillText("Ключ задан верно!", canvas.width / 2, canvas.height / 3 * 2);
        document.getElementById("myLoad").placeholder = "Ключ был введён";
        document.getElementById("myLoad").disabled = true;
        document.getElementById("load-key").disabled = true;
        document.getElementById("load-key").classList.remove("active")
        document.getElementById("load-key").querySelector("i").classList.remove("fa-key");
        document.getElementById("load-key").querySelector("i").classList.add("fa-check");
        document.getElementById("btn-start").disabled = false;
        document.getElementById("btn-start").classList.add("active");
        document.getElementById("btn-stop").classList.add("active");
        document.getElementById("btn-next").classList.add("active");
        document.getElementById("btn-prev").classList.add("active");
        document.getElementById("btn-goto").classList.add("active");
        document.getElementById("btn-stop").disabled = false;
        document.getElementById("btn-next").disabled = false;
        document.getElementById("btn-prev").disabled = false;
        document.getElementById("btn-goto").disabled = false;
        document.getElementById("gotoInput").disabled = false;
        document.getElementById("show-menu-find").disabled = false;
        document.getElementById("show-menu-find").classList.add("active");
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "28px Arial";
        context.fillStyle = "#4a5568";
        context.fillText("Добро пожаловать!", canvas.width / 2, canvas.height / 3);
        context.font = "14px Arial";
        context.fillStyle = "#e33724";
        context.fillText("Неверный ввод, повторите попытку!", canvas.width / 2, canvas.height / 3 * 2);
    }
}

function goto() {
    let gotoInput = document.getElementById("gotoInput").value;
    if (gotoInput >= 1 && gotoInput <= textArray.length) {
        btnStop();
        currentTextIndex = gotoInput - 2;
        kFill = 1 / textArray.length * gotoInput;
        btnNext();
        document.getElementById("gotoInput").value = "";
    } else {
        alert("Неподходяшее значение");
        document.getElementById("gotoInput").value = "";
    }
}

let topPositionMenu = 0;
function openPlayer() {
    let posTop = document.getElementById("open-player").style.top;
    if (topPositionMenu == 0) {
        document.getElementById("player").style.top = "1px";
        topPositionMenu = 1;
    } else {
        document.getElementById("player").style.top = "-100%";
        topPositionMenu = 0;
    }
}


let leftPositionMenu = 0;
function openMenuFindPos() {
    btnStop();
    if (leftPositionMenu == 0) {
        document.getElementById("find-pos-float").style.left = "50%";
        leftPositionMenu = 1;
    } else {
        document.getElementById("find-pos-float").style.left = "-50%";
        leftPositionMenu = 0;
    }
}

function findPosition() {
    let input1 = document.getElementById("inpFind1").value;
    let input2 = document.getElementById("inpFind2").value;
    let input3 = document.getElementById("inpFind3").value;

    for (let i = 0; i < textArray.length; i++) {
        if (textArray[i] == input1 && textArray[i - 1] == input2 && textArray[i - 2] == input3) {
            let pos = parseInt(`${i - 1}`)
            console.log(pos);
            findTextIndex = pos - 2;
            kFill = 1 / textArray.length * pos;
            document.getElementById("findCondition").querySelector("p").innerHTML = "Позиция найдена!";
            document.getElementById("findCondition").querySelector("p").style.color = "green";
            document.getElementById("goToFoundPos").disabled = false;
            document.getElementById("goToFoundPos").classList.add("active");
        }
    }
    document.getElementById("inpFind1").value = "";
    document.getElementById("inpFind2").value = "";
    document.getElementById("inpFind3").value = "";

}
function goToFoundPos() {
    document.getElementById("find-pos-float").style.left = "-50%";
    leftPositionMenu = 0;
    currentTextIndex = findTextIndex;
    btnNext();
    document.getElementById("findCondition").querySelector("p").innerHTML = "";
}

// Нажатие на клавишу 'Пробел'
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if(startsFlag == 0){
            btnStart();
            startsFlag = 1;
        } else {
            btnStop();
            startsFlag = 0;
        }        
    }
  });

  // Нажатие на клавишу 'Стрелка вправо'
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        btnNext();
    }
});
  // Нажатие на клавишу 'Стрелка влево'
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        btnPrev();
    }
});
  // Нажатие на клавишу 'Стрелка вверх'
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        btnStop();
        range.value ++;
        rangeNum.innerHTML = range.value;
        btnStart();
    }
});
// Нажатие на клавишу 'Стрелка вних'
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowDown') {
        btnStop();
        range.value --;
        rangeNum.innerHTML = range.value;
        btnStart();
    }
});
