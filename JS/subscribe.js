let summary = Array(5).fill("__");
const summaryEl = document.getElementById("summary");
const itemsList = document.querySelectorAll(".items-list");
const items = document.querySelectorAll(".item");
const stepperLinks = document.querySelectorAll(".stepper__link");

const initialSummary = `
  "I drink my coffee as <span class="summary-item">__</span>, with a <span class="summary-item">__</span> type of bean. <span class="summary-item">__</span> ground ala <span class="summary-item">__</span>, sent to me <span class="summary-item">__</span>."`;
summaryEl.innerHTML = initialSummary;

function generateSummaryHTML(summary) {
  return `
    "I drink my coffee as <span class="summary-item">${summary[0]}</span>, with a <span class="summary-item">${summary[1]}</span> type of bean. <span class="summary-item">${summary[2]}</span> ground ala <span class="summary-item">${summary[3]}</span>, sent to me <span class="summary-item">${summary[4]}</span>."
  `;
}

items.forEach((item) => {
  item.addEventListener("click", handleItemClick);
  item.addEventListener("keyup", handleItemEnter);
});

function handleItemClick() {
  const item = this;
  const parentUl = item.parentNode;
  const ulItems = parentUl.querySelectorAll(".item");
  const parentUlIndex = Array.from(itemsList).indexOf(parentUl);
  summary[parentUlIndex] = [item.firstElementChild.textContent];

  ulItems.forEach((ulItem) => {
    ulItem.classList.remove("selected");
  });

  item.classList.add("selected");
  summaryEl.innerHTML = generateSummaryHTML(summary);
  activeSelectStep();
}

function handleItemEnter(e) {
  if (e.keyCode === 13) {
    handleItemClick.call(this);
  }
}

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", handleSubmitClick);

function handleSubmitClick(e) {
  e.preventDefault();
  if (summary.includes("__")) {
    alert("Please select all options");
    return;
  }

  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";

  const modal = createModal();
  document.body.appendChild(modal);

  const container = document.querySelector(".container");
  const backdrop = createBackdrop();
  container.appendChild(backdrop);

  container.addEventListener("click", handleBackdropClick);

  const confirmationBtn = document.getElementById("confirmation");
  confirmationBtn.addEventListener("click", handleConfirmationClick);
}

function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const windowSize = window.innerWidth;
  let btnValue = windowSize < 768 ? "Checkout - $14.00 / month" : "Checkout";

  modal.innerHTML = `
    <form class="modal" method="post">
      <div class="modal__header"> 
        <h3 class="modal__title">Order Summary</h3>
      </div>
      <div class="modal__body">
        <div class="modal__body__wrapper">
          <p class="modal__summary">${generateSummaryHTML(summary)}</p>
          <p class="modal__alert">Is this correct? You can proceed to checkout or go back to plan selection if something is off. Subscription discount codes can also be redeemed at the checkout.</p>
        </div>
        <div class="modal__footer__wrapper">
          <span class="modal__price">$14.00 / month</span>
          <input type="button" value="${btnValue}" class="btn modal__confirm" id="confirmation">
        </div>
      </div>
    </form>
  `;
  return modal;
}

function createBackdrop() {
  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");
  return backdrop;
}

function handleModalBackdropRemove() {
  const modal = document.querySelector(".modal");
  const backdrop = document.querySelector(".backdrop");
  modal.remove();
  backdrop.remove();
  document.body.style.overflow = "auto";
}

function handleBackdropClick(e) {
  if (e.target.classList.contains("backdrop")) {
    handleModalBackdropRemove();
  }
}

function handleConfirmationClick() {
  summaryEl.innerHTML = initialSummary;
  summary.forEach((item) => item.pop());
  items.forEach((item) => item.classList.remove("selected"));
  handleModalBackdropRemove();
  resetStepper();
}

function activeSelectStep() {
  const selectedItems = document.querySelectorAll(".selected");
  const selectedItemsId = Array.from(selectedItems).map(
    (item) => item.parentNode.parentNode.id
  );

  stepperLinks.forEach((link) => {
    const linkId = link.getAttribute("href").slice(1);
    if (selectedItemsId.includes(linkId)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function resetStepper() {
  stepperLinks.forEach((link) => {
    link.classList.remove("active");
  });
}

// Select event listeners
const labels = document.querySelectorAll(".select__label");

labels.forEach((label) => {
  label.addEventListener("click", handleSelectClick);
  label.addEventListener("keyup", handleSelectEnter);
});

function handleSelectClick(e) {
  this.nextElementSibling.classList.toggle("close");

  if (this.nextElementSibling.classList.contains("close")) {
    this.firstElementChild.classList.add("close");
  } else {
    this.firstElementChild.classList.remove("close");
  }
}

function handleSelectEnter(e) {
  if (e.keyCode === 13) {
    handleSelectClick.call(this);
  }
}
