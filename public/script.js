//image slider function
const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");
const totalSlides = slider.children.length;
let currentIndex = 0;
let autoplay;

function showSlide(index) {
  currentIndex = (index + totalSlides) % totalSlides;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("opacity-100"));
  dots[currentIndex].classList.add("opacity-100");
}

// Arrows
document
  .getElementById("prev")
  .addEventListener("click", () => showSlide(currentIndex - 1));
document
  .getElementById("next")
  .addEventListener("click", () => showSlide(currentIndex + 1));

// Dots
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    showSlide(parseInt(e.target.dataset.index));
  });
});

// Autoplay
function startAutoplay() {
  autoplay = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 3000);
}
function stopAutoplay() {
  clearInterval(autoplay);
}
startAutoplay();

// Pause on hover
const carousel = document.getElementById("carousel");
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

// Swipe gestures
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
carousel.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    showSlide(currentIndex + 1);
  } else if (touchEndX > touchStartX + 50) {
    showSlide(currentIndex - 1);
  }
}

//hamburger dropdown
const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("hidden");
});
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.add("hidden");
  });
});
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
    navLinks.classList.add("hidden");
  }
});

function toggleAccordion(category) {
  const panel = document.getElementById('panel-' + category);
  const icon = document.getElementById('icon-' + category);
  const isHidden = panel.classList.contains('hidden');

  // Hide all other panels
  document.querySelectorAll('[id^="panel-"]').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('[id^="icon-"]').forEach(i => i.textContent = '+');

  // Toggle current
  if (isHidden) {
    panel.classList.remove('hidden');
    icon.textContent = '–';
  } else {
    panel.classList.add('hidden');
    icon.textContent = '+';
  }
}

//move to top from bottom
const topLink = document.querySelector('a[href="#home"]');
topLink.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//form submission
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Reservation sent successfully!!");
  form.reset();
});
