const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

function runTheClock() {
  var date = new Date();
  
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  // Convert sec/min/hr values to degrees
  let secPosition = sec*6; // 6 is from 360/60
  let minPosition = min*6 + sec/10 // breaks down increments between minute ticks on clock to account for seconds; 6*sec/60
  let hrPosition = hr*30 + min/2 // 30 is from 360/12; min/2 is from min*30deg/60

  HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
  MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
  SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
}

// update the clock every second
var interval = setInterval( runTheClock, 1000 );  // 1000ms = 1sec
