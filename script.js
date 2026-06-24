// =====================================================
// GOD FAVOR BLOCK FACTORY
// script.js
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

```
// =====================================================
// LOADER
// =====================================================

const loader = document.querySelector(".loader-wrapper");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 800);
});

// =====================================================
// MOBILE MENU
// =====================================================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// =====================================================
// STICKY NAVBAR
// =====================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// =====================================================
// ACTIVE NAVIGATION
// =====================================================

const sections = document.querySelectorAll("section[id]");

function highlightNav() {

    const scrollY = window.pageYOffset;

    sections.forEach(section => {

        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute("id");

        const navItem = document.querySelector(
            `.nav-menu a[href*="${sectionId}"]`
        );

        if (!navItem) return;

        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            navItem.classList.add("active");
        } else {
            navItem.classList.remove("active");
        }

    });
}

window.addEventListener("scroll", highlightNav);

// =====================================================
// BACK TO TOP BUTTON
// =====================================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// =====================================================
// SCROLL REVEAL
// =====================================================

const revealElements = document.querySelectorAll(
    ".section, .product-card, .feature-card, .timeline-item, .stat-card"
);

revealElements.forEach(el => {
    el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// =====================================================
// ANIMATED COUNTERS
// =====================================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = +counter.dataset.target;

            let current = 0;
            const increment = target / 200;

            const updateCounter = () => {

                if (current < target) {

                    current += increment;

                    counter.innerText =
                        Math.floor(current).toLocaleString();

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText =
                        target.toLocaleString();

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// =====================================================
// GALLERY LIGHTBOX
// =====================================================

const galleryImages =
    document.querySelectorAll(".gallery-grid img");

const lightbox =
    document.querySelector(".lightbox");

const lightboxImage =
    document.querySelector(".lightbox-image");

const closeLightbox =
    document.querySelector(".close-lightbox");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("show");
        lightboxImage.src = image.src;

    });

});

closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }

});

// =====================================================
// TESTIMONIAL SLIDER
// =====================================================

const testimonials =
    document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

function showTestimonial(index) {

    testimonials.forEach(item => {
        item.classList.remove("active");
    });

    testimonials[index].classList.add("active");
}

function nextTestimonial() {

    testimonialIndex++;

    if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
    }

    showTestimonial(testimonialIndex);
}

if (testimonials.length > 0) {

    showTestimonial(testimonialIndex);

    setInterval(() => {
        nextTestimonial();
    }, 5000);

}

// =====================================================
// FAQ ACCORDION
// =====================================================

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});

// =====================================================
// CONTACT FORM VALIDATION
// =====================================================

const form =
    document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern =
            /^[0-9+\-\s()]{7,20}$/;

        if (name.length < 3) {

            alert(
                "Please enter a valid full name."
            );

            return;
        }

        if (!phonePattern.test(phone)) {

            alert(
                "Please enter a valid phone number."
            );

            return;
        }

        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }

        if (message.length < 10) {

            alert(
                "Message must contain at least 10 characters."
            );

            return;
        }

        alert(
            "Thank you! Your inquiry has been submitted successfully."
        );

        form.reset();

    });

}

// =====================================================
// ESC KEY CLOSE LIGHTBOX
// =====================================================

document.addEventListener("keydown", e => {

    if (
        e.key === "Escape" &&
        lightbox.classList.contains("show")
    ) {

        lightbox.classList.remove("show");

    }

});

// =====================================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// =====================================================

document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

// =====================================================
// PERFORMANCE:
// PRELOAD REVEAL ITEMS
// =====================================================

window.addEventListener("resize", () => {
    highlightNav();
});

highlightNav();
```

});

// =====================================================
// END OF FILE
// =====================================================

