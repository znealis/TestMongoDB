
var alarmString = null;

// Select HTML5 Audio element

// Select DOM element with create-alarm id
const createAlarm = document.querySelector(".create-alarm");

// Select DOM element of active alarm container
const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("clear-alarm");
// Select DOM element of active alarm text
const alarmTextContainer = document.getElementById("alarm-text");

const alarmText = (time) => `Alarm set at time ${time}`;

// Initialize alarm sound
const alarmAudio = document.getElementById("alarm-audio");
alarmAudio.src = "./audio/Hope.mp3";
alarmAudio.load();

const secondAudio = document.getElementById("alarm-audio2");
secondAudio.src = "./audio/Ice.mp3";
secondAudio.load();


let alarmHeader = document.getElementById("alarm-header");
let gridContainer = document.getElementById("grid");
let currentTimeHTML = document.getElementById("current-time");

let nextIncrementShouldBe5 = false;
let nextIncrementShouldBe25 = true;

// Handle Create Alarm submit
const handleSubmit = (event) => {
    // Prevent default action of reloading the page
    event.preventDefault();
    // const { hour, sec, min } = {}; //document.forms[0];

    let hour = { value: 0 }
    let min = {value:0}
    let sec = {value:0};

    if(nextIncrementShouldBe5 === true) {
      hour.value = 0;
      sec.value = 2;
      min.value = 0;
      alarmAudio.play();
    } else if(nextIncrementShouldBe25 === true) {
      hour.value = 0;
      sec.value = 10;
      min.value = 0;
      secondAudio.play();
    }

    alarmString = getTimeString_fromNow({ hours: hour.value, minutes: min.value, seconds: sec.value,});


    gridContainer.style.backgroundColor="red"
    alarmHeader.style.color="red";
    document.forms[0].reset();// Reset form after submit
    createAlarm.style.display = "none";// Hide create alarm
    activeAlarm.style.display = "block";// show active alarm with text
    alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};

// Trigger handleClear on button click
clearAlarm.addEventListener("click", handleClear);
// Attach submit event to the form
document.forms[0].addEventListener("submit", handleSubmit);

// Function to convert time to string value
const getTimeString_fromNow = ({ hours, minutes, seconds }) => {
  // console.log(hours, minutes, seconds)
  let currentTime = new Date();
  let timeNeeded = new Date();
  timeNeeded.setTime(currentTime.getTime()+1000*seconds + minutes * 60*1000 + hours*60*60*1000);
  let timeStr = timeNeeded.toTimeString().split(" ")[0];
  let hms = timeStr.split(":"); //hours minutes seconds
  if(hms[1].length===1) {
    hms[1] = "0" + hms[1];
  }
  if(hms[2].length===1) {
    hms[2] = "0" + hms[2];
  }
  return `${hms[0]}:${hms[1]}:${[hms[2]]}`;
};

const getTimeString = ( hours, minutes, seconds ) => {
  let _s = "";
  let _m = "";

  _s = seconds;
  _m = minutes;

  if((""+_s).length===1){
    _s="0"+_s
  }
  if((""+_m).length===1){
    _m="0"+_m
  }
  return `${hours}:${_m}:${_s}`;
};


// Function to display current time on screen
const renderTime = () => {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  
  const timeString = getTimeString( hours, minutes, seconds );
  // console.log("time string :: ", timeString)
  if (alarmString === timeString) {
    
    if(nextIncrementShouldBe25 === true) {
      alarmAudio.play();
      secondAudio.pause();
      alarmString = getTimeString_fromNow({hours:0, minutes:0, seconds:2});
      alarmHeader.style.color="blue";
      gridContainer.style.backgroundColor="blue";
    } else if(nextIncrementShouldBe5 === true) {
      secondAudio.play();
      alarmAudio.pause();
      alarmString = getTimeString_fromNow({hours:0, minutes:0, seconds:10});
      gridContainer.style.backgroundColor="red"
      alarmHeader.style.color="red";
    }
    
    nextIncrementShouldBe25 = !nextIncrementShouldBe25;
    nextIncrementShouldBe5 = !nextIncrementShouldBe5;
    
    alarmTextContainer.innerHTML = alarmText(alarmString);

  }
  currentTimeHTML.innerHTML = timeString;
};

// Update time every second
setInterval(renderTime, 500);
console.log("test");