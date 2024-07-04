const bolinha = document.getElementById("bolinha");

document.addEventListener("mousemove", (e) => {
  var x = e.clientX;
  var y = e.clientY;
  bolinha.style = `transform: translate(${x + 5}px, ${y - 7}px)`;
});
