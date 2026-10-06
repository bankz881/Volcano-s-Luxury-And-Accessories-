// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Quote form: sends to Web3Forms
const form = document.getElementById("quoteForm");
const msg = document.getElementById("formMsg");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (e) => {
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

  submitBtn.disabled = true;
  msg.className = "form-msg";
  msg.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    });
    const result = await response.json();
    if (response.ok && result.success) {
      msg.className = "form-msg ok";
      msg.textContent = "Thank you! Your request was sent. We'll be in touch soon.";
      form.reset();
    } else {
      throw new Error(result.message || "Send failed");
    }
  } catch (err) {
    msg.className = "form-msg error";
    msg.textContent = "Sorry, something went wrong. Please call us instead.";
  } finally {
    submitBtn.disabled = false;
  }
});
