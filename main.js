const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", function () {
  sidenav.classList.toggle("active");
  openBtn.classList.toggle("close");
});
