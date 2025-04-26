const buttons = document.querySelectorAll("button");
const cooldownTime = 3;
let buttonsDisabled = false;
const dots = [
  document.getElementById("dot1"),
  document.getElementById("dot2"),
  document.getElementById("dot3"),
];
let lastPosition = -1;

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttonsDisabled = true;
}

function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
  buttonsDisabled = false;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (buttonsDisabled) return;

    disableButtons();

    const button = event.target;
    const buttonValue = button.dataset.value;

    console.log("Player pressed:", buttonValue);

    // Send buttonValue to server here
  });
});

function updateRoundProgress() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const position = Math.floor(seconds % cooldownTime);

  if (position !== lastPosition) {
    if (position >= 0 && position < dots.length) {
      dots[position].classList.add("pop");
      setTimeout(() => {
        dots[position].classList.remove("pop");
      }, 1000);
    }
    if (position === 0) {
      enableButtons();
    }
    lastPosition = position;
  }
}

setInterval(updateRoundProgress, 100);
