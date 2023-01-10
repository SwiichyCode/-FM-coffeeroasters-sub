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

const labels = document.querySelectorAll(".select__label");

labels.forEach((label) => {
  label.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");
  });
});

//-------------------//

const summary = [[], [], [], [], []];
const summaryEl = document.getElementById("summary");
const summaryItems = document.querySelectorAll(".summary-item");
const itemsList = document.querySelectorAll(".items-list");
const items = document.querySelectorAll(".item");
const selected = document.querySelector(".selected");

const initialSummary = `
  "I drink my coffee as <span class="summary-item">__</span>, with a <span class="summary-item">__</span> type of bean. <span class="summary-item">__</span> ground ala <span class="summary-item">__</span>, sent to me <span class="summary-item">__</span>."`;
summaryEl.innerHTML = initialSummary;

function generateSummaryHTML(summary) {
  return `
    "I drink my coffee as <span class="summary-item">${
      summary[0].length ? summary[0] : "__"
    }</span>, with a <span class="summary-item">${
    summary[1].length ? summary[1] : "__"
  }</span> type of bean. <span class="summary-item">${
    summary[2].length ? summary[2] : "__"
  }</span> ground ala <span class="summary-item">${
    summary[3].length ? summary[3] : "__"
  }</span>, sent to me <span class="summary-item">${
    summary[4].length ? summary[4] : "__"
  }</span>."
  `;
}

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

    summaryEl.innerHTML = generateSummaryHTML(summary);
  });
});

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (summary.map((item) => item.length).includes(0)) {
    alert("Please select all options");
    return;
  }

  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal">
      <div class="modal__header"> 
        <h3 class="modal__title">Order Summary</h3>
      </div>
      <div class="modal__body">
        <div class="modal__body__wrapper">
          <p class="modal__summary">${generateSummaryHTML(summary)}</p>
          <p class="modal__alert">Is this correct? You can proceed to checkout or go back to plan selection if something is off. Subscription discount codes can also be redeemed at the checkout.</p>
        </div>
        <button class="btn" id="confirmation">Checkout - $14.00 / month</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const container = document.querySelector(".container");
  const backdrop = document.createElement("div");

  backdrop.classList.add("backdrop");
  container.appendChild(backdrop);

  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("backdrop")) {
      modal.remove();
      backdrop.remove();
      document.body.style.overflow = "auto";
      container.classList.remove("backdrop");
    }
  });

  const confirmationBtn = document.getElementById("confirmation");
  confirmationBtn.addEventListener("click", function () {
    summaryEl.innerHTML = initialSummary;
    summary.forEach((item) => item.pop());
    items.forEach((item) => item.classList.remove("selected"));
    modal.remove();
    backdrop.remove();
    document.body.style.overflow = "auto";
    container.classList.remove("backdrop");
  });
});
