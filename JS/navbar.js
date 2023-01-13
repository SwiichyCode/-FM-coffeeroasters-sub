const sidenav = document.querySelector(".sidenav");
const openBtn = document.querySelector(".sidenav-btn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", function () {
  sidenav.classList.toggle("active");
  openBtn.classList.toggle("close");
});

document.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    sidenav.classList.remove("active");
    openBtn.classList.remove("close");
  }
});

document.addEventListener("click", function (e) {
  if (sidenav.classList.contains("active")) {
    if (!sidenav.contains(e.target) && !openBtn.contains(e.target)) {
      sidenav.classList.remove("active");
      openBtn.classList.remove("close");
    }
  }
});
