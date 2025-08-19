let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;

function updateDisplay() {
  let hr = String(hours).padStart(2, '0');
  let min = String(minutes).padStart(2, '0');
  let sec = String(seconds).padStart(2, '0');
  document.getElementById("display").textContent = `${hr}:${min}:${sec}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

function start() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  document.getElementById("lapList").innerHTML = "";
}

function lap() {
  let hr = String(hours).padStart(2, '0');
  let min = String(minutes).padStart(2, '0');
  let sec = String(seconds).padStart(2, '0');
  let li = document.createElement("li");
  li.textContent = `${hr}:${min}:${sec}`;
  document.getElementById("lapList").appendChild(li);
}