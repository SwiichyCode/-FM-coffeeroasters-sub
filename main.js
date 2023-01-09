const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("openBtn");
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

// open select options

const summary = [[], [], [], [], []];
const summaryEl = document.getElementById("summary");
const summaryItems = document.querySelectorAll(".summary-item");
const itemsList = document.querySelectorAll(".items-list");
const items = document.querySelectorAll(".item");
const selected = document.querySelector(".selected");
const initialSummary = `
  "I drink my coffee as <span class="summary-item">__</span>, with a <span class="summary-item">__</span> type of bean. <span class="summary-item">__</span> ground ala <span class="summary-item">__</span>, sent to me <span class="summary-item">__</span>."`;
summaryEl.innerHTML = initialSummary;

items.forEach((item) => {
  item.addEventListener("click", function () {
    item.classList.toggle("selected");

    const parentUlIndex = Array.from(itemsList).indexOf(item.parentNode);
    summary[parentUlIndex].push(item.firstElementChild.textContent);
    if (summary[parentUlIndex].length > 1) {
      summary[parentUlIndex].shift();
    }

    const parentUl = item.parentNode;
    const ulItems = parentUl.querySelectorAll(".item");

    ulItems.forEach((ulItem) => {
      ulItem.classList.remove("selected");
    });

    item.classList.add("selected");

    summaryEl.innerHTML = `
      "I drink  my coffee as <span class="summary-item">${
        summary[0].length ? summary[0] : "__"
      }</span>, with a <span class="summary-item">${
      summary[1].length ? summary[1] : "__"
    }</span> type of bean. <span class="summary-item">${
      summary[2].length ? summary[2] : "__"
    }</span> ground ala <span class="summary-item">${
      summary[3].length ? summary[3] : "__"
    }</span>, sent to me <span class="summary-item">${
      summary[4].length ? summary[4] : "__"
    }</span>." `;
  });
});

const labels = document.querySelectorAll(".select__label");

labels.forEach((label) => {
  label.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");
  });
});
