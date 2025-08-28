// Mobile Navigation Toggle
// Add error handling for missing elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

let scrollTimeoutForNavbar;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeoutForNavbar);
  scrollTimeoutForNavbar = setTimeout(() => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.boxShadow = "none";
    }
  }, 10);
});

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  const scrollPosition = window.scrollY + 200; // Add offset

  // Find the section currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  // Update navigation
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Debounced scroll handler for better performance
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    updateActiveNav();
  }, 10);
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".project-card, .timeline-item, .about-content"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Submit to Formspree using fetch
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Success
          alert("Thank you for your message! I'll get back to you soon.");
          contactForm.reset();
        } else {
          // Error
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Sorry, there was an error sending your message. Please try again."
        );
      })
      .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
  });
}

// Resume button functionality
const resumeButtons = document.querySelectorAll(".resume-btn-selector");

resumeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const resumeBtn = e.target;
    const originalText = resumeBtn.textContent;

    resumeBtn.textContent = "Loading...";
    resumeBtn.style.opacity = "0.7";

    // Scroll to contact section
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Pre-populate form fields with animation
    setTimeout(() => {
      const subjectField = document.getElementById("subject");
      const messageField = document.getElementById("message");

      if (subjectField) {
        subjectField.value = "Requesting Resume";
        subjectField.style.backgroundColor = "#1a2f4a";
        subjectField.focus();

        // Reset background after animation
        setTimeout(() => {
          subjectField.style.backgroundColor = "#0a192f";
        }, 1000);
      }

      if (messageField) {
        messageField.value =
          "Hi Raj,\n\nI would like to see your resume.\n\nThanks.";
        messageField.style.backgroundColor = "#1a2f4a";
        messageField.focus();

        // Reset background after animation
        setTimeout(() => {
          messageField.style.backgroundColor = "#0a192f";
        }, 1000);
      }

      // Reset button state
      resumeBtn.textContent = originalText;
      resumeBtn.style.opacity = "1";
    }, 800);
  });
});
