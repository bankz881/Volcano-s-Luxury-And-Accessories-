// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// Close the menu after tapping a link
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Demo quote form (does not send data anywhere)
const form = document.getElementById("quoteForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const missing = ["name", "phone", "email", "service"].filter(
    id => !document.getElementById(id).value.trim()
  );
  if (missing.length) {
    msg.className = "form-msg error";
    msg.textContent = "Please fill in your name, phone, email and the service you need.";
    document.getElementById(missing[0]).focus();
    return;
  }
  msg.className = "form-msg ok";
  msg.textContent = "Thanks! This is a demo form, so your request was not sent.";
  form.reset();
});