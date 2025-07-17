
document.addEventListener("DOMContentLoaded", () => {
  // === COUNTER ===
  document.querySelectorAll(".counter").forEach(counter => {
    const target = +counter.dataset.count;
    let count = 0;
    const duration = 2000, frameRate = 800;
    const steps = duration / (1000 / frameRate), increment = target / steps;

    const update = () => {
      count += increment;
      counter.innerText = count < target
        ? `${Math.ceil(count).toLocaleString()}+`
        : `${target.toLocaleString()}+`;
      if (count < target) requestAnimationFrame(update);
    };
    update();
  });

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const section = document.querySelector(anchor.getAttribute("href"));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  });

  // === BOOK NOW SCROLL ===
  document.querySelectorAll(".book-now, .book-btn").forEach(btn =>
    btn.addEventListener("click", () =>
      document.querySelector("#inventory")?.scrollIntoView({ behavior: "smooth" })
    )
  );

  // === CAR SEARCH DYNAMIC RESULT ===
  const searchBtn = document.querySelector(".search-btn");
  searchBtn?.addEventListener("click", e => {
    e.preventDefault();

    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const pickDate = new Date(document.getElementById("pick-date").value);
    const returnDate = new Date(document.getElementById("return-date").value);

    if (pickup === drop) return alert("Pick-up and drop locations cannot be the same.");
    if (pickDate >= returnDate) return alert("Return date must be after pick-up date.");

    const container = document.querySelector(".inventory-section .car-container");
    container.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
      const carCard = document.createElement("div");
      carCard.className = "car-card";
      carCard.innerHTML = `
        <img src="https://via.placeholder.com/350x180?text=Car+${i}" alt="Car ${i}">
        <div class="car-info">
          <h3>Sample Car ${i}</h3>
          <p>₹${(10000 + i * 500).toLocaleString()}/day • Petrol • 5 Seats • Auto</p>
          <span class="tag">Demo</span>
          <button class="book-btn">🚗 Book Now</button>
        </div>
      `;
      container.appendChild(carCard);
      carCard.querySelector(".book-btn").addEventListener("click", () =>
        document.querySelector("#inventory")?.scrollIntoView({ behavior: "smooth" })
      );
    }
  });

  // === DATE MINIMUM ===
  const today = new Date().toISOString().split("T")[0];
  const pickDateEl = document.getElementById("pick-date");
  const returnDateEl = document.getElementById("return-date");
  pickDateEl.setAttribute("min", today);
  returnDateEl.setAttribute("min", today);
  pickDateEl.addEventListener("change", e => {
    returnDateEl.setAttribute("min", e.target.value);
  });

  // === SCROLL TO TOP BUTTON ===
  const topBtn = document.createElement("button");
  topBtn.className = "top-btn";
  topBtn.innerText = "↑ Top";
  document.body.appendChild(topBtn);
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === MODAL LOGIN/SIGNUP ===
  document.querySelector(".login").addEventListener("click", () => {
    document.getElementById("authModal").style.display = "flex";
    switchTab("login");
  });

  document.querySelector(".signup").addEventListener("click", () => {
    document.getElementById("authModal").style.display = "flex";
    switchTab("signup");
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("authModal").style.display = "none";
  });

  function switchTab(tab) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");

    if (tab === "login") {
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
      loginTab.classList.add("active");
      signupTab.classList.remove("active");
    } else {
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      signupTab.classList.add("active");
      loginTab.classList.remove("active");
    }
  }

  // === PASSWORD TOGGLE ===
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = document.querySelector(icon.getAttribute("toggle"));
      input.type = input.type === "password" ? "text" : "password";
      icon.classList.toggle("fa-eye-slash");
    });
  });

  // === REGISTER API ===
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector('#signupForm input[placeholder="Your name"]').value;
    const email = document.querySelector('#signupForm input[placeholder="Enter email"]').value;
    const password = document.querySelector('#signupForm input[placeholder="Create password"]').value;

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registered successfully!");
        document.getElementById("authModal").style.display = "none";
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Server Error");
    }
  });

  // === LOGIN API ===
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector('#loginForm input[placeholder="Enter email"]').value;
    const password = document.querySelector('#loginForm input[placeholder="Enter password"]').value;

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Login successful");
        localStorage.setItem("token", data.token);
        document.getElementById("authModal").style.display = "none";
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Server Error");
    }
  });
});
