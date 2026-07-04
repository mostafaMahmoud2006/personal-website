/* =========================================================
   MAIN.JS
   Sections: Config, Vue Data Islands, Navbar, Theme,
   Gallary (3D), Gallary Projects Carousel, Certificate
   Carousel, Download CV, Contact Form, Utilities
   ========================================================= */

(function () {
    "use strict";

    /* =========================================================
       1. CONFIG
       Central place to edit personal/site data and file paths.
       ========================================================= */
    const SITE_DATA = {
        role: "Web Developer & Web Trainer",
        company: "MZSAI",
        companyPeriod: "Jun 2022 - Owner",
        email: "mostafa.mahmoud.mzsai.2006@gmail.com",
        phone: "+201229358359",
        address: "Giza, Egypt",
        github: "https://github.com/mostafaMahmoud2006",
        linkedin: "",
        brand: "MZSAI"
    };

    // Fill these in with your real EmailJS credentials (https://www.emailjs.com/).
    const EMAILJS_CONFIG = {
        publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
        serviceId: "YOUR_EMAILJS_SERVICE_ID",
        templateId: "YOUR_EMAILJS_TEMPLATE_ID"
    };

    const PROJECTS = [
        { title: "Nike home page", image: "images/nike.webp", link: "projects/nike_store/index.html" },
        { title: "commercial_store", image: "images/comm.webp", link: "projects/commercial_store/index.html" },
        { title: "Bank system", image: "images/bank.webp", link: "projects/bank_account/index.html" },
        { title: "Card Game", image: "images/card.webp", link: "projects/Cards_Game/index.html" },
        { title: "Loading", image: "images/loading.webp", link: "projects/magic_loading.html" },
        { title: "BR Architects", image: "images/BRP.webp", link: "projects/architects_website/index.html" },
        { title: "Tic Tac Toe", image: "images/tic_tac_toe.webp", link: "projects/tic_tac_toe/index.html" },
        { title: "creative Hover", image: "images/tableP.webp", link: "projects/creative_table.html" },
        { title: "Chese Board", image: "images/cheseP.webp", link: "projects/chese-board.html" },
        { title: "Bar", image: "images/Bar.webp", link: "projects/progress_bar.html" },
        { title: "Camera design", image: "images/camP.webp", link: "projects/camera-design.html" },
        { title: "Grid System", image: "images/gridP.webp", link: "projects/grid_system.html" },
        { title: "Radio Box", image: "images/raidoP.webp", link: "projects/offers_designs.html" },
        { title: "Offers", image: "images/offersP.webp", link: "projects/offers_price.html" },
    ];

    const GALLARY_IMAGES = [
        "images/3d4.webp", "images/3d3.webp", "images/3d2.webp",
        "images/3d4.webp", "images/3d3.webp",
        "images/3d2.webp", "images/3d2.webp", "images/3d2.webp"
    ];

    const CERTIFICATES = [
        {
            title: "Advanced Python<br>Engineering",
            issuer: "Codzilla CERTIFICATION",
            skills: [
                "Object-Oriented Programming (OOP)",
                "Regular Expressions (Regex)",
                "File Handling & CSV",
                "Python Modules & Packages"
            ],
            image: "images/c-1.webp",
            link: "https://www.codezilla.courses/"
        },

        {
            title: "Full Stack<br>Web Development",
            issuer: "Createivo CERTIFICATION",
            skills: [
                "Responsive Web Design",
                "JavaScript & DOM",
                "Vue.js",
                "PHP & Laravel",
                "MySQL Database"
            ],
            image: "images/c-2.webp",
            link: "https://createivo.com/"
        }
        // Add further certificates here — the carousel renders
        // as many dots/slides as this array contains.
    ];

    /* =========================================================
       2. VUE DATA ISLANDS
       Vue is used only for small, editable text fragments
       (name/role, contact details, social links, footer).
       Everything else stays plain HTML/CSS/JS.
       ========================================================= */
    function initVueIslands() {
        if (typeof Vue === "undefined") return;

        const shared = Vue.reactive({
            ...SITE_DATA,
            phoneDigits: SITE_DATA.phone.replace(/[^\d+]/g, ""),
            year: new Date().getFullYear()
        });

        const mountIfPresent = (selector, computedExtra) => {
            const el = document.querySelector(selector);
            if (!el) return;
            Vue.createApp({
                data() {
                    return { ...shared };
                },
                ...computedExtra
            }).mount(el);
        };

        mountIfPresent("#vue-work-info");
        mountIfPresent("#vue-social-links");
        mountIfPresent("#vue-contact-methods");
        mountIfPresent("#vue-footer");
    }

    /* =========================================================
       3. NAVBAR — hamburger menu
       ========================================================= */
    function initNavbar() {
        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("nav-links");
        const nav = document.getElementById("nav");
        if (!hamburger || !navLinks || !nav) return;

        const openMenu = () => {
            navLinks.classList.add("is-open");
            hamburger.classList.add("is-open");
            hamburger.setAttribute("aria-expanded", "true");
            hamburger.setAttribute("aria-label", "Close navigation menu");
        };

        const closeMenu = () => {
            navLinks.classList.remove("is-open");
            hamburger.classList.remove("is-open");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.setAttribute("aria-label", "Open navigation menu");
        };

        const isOpen = () => navLinks.classList.contains("is-open");

        hamburger.addEventListener("click", () => {
            isOpen() ? closeMenu() : openMenu();
        });

        // Close after clicking a nav link
        navLinks.addEventListener("click", (event) => {
            if (event.target.closest("a")) closeMenu();
        });

        // Close when clicking outside the nav
        document.addEventListener("click", (event) => {
            if (isOpen() && !nav.contains(event.target)) closeMenu();
        });

        // Close on Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && isOpen()) {
                closeMenu();
                hamburger.focus();
            }
        });

        // Reset state if the viewport grows back to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1018 && isOpen()) closeMenu();
        });
    }

    /* =========================================================
       4. THEME — light/dark toggle
       ========================================================= */
    function initTheme() {
        const root = document.documentElement;
        const toggleBtn = document.getElementById("theme-toggle");
        const STORAGE_KEY = "site-theme";

        const applyTheme = (theme) => {
            root.setAttribute("data-theme", theme);
            if (toggleBtn) {
                const isLight = theme === "light";
                toggleBtn.setAttribute("aria-pressed", String(isLight));
                toggleBtn.innerHTML = isLight
                    ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
                    : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
            }
        };

        const stored = localStorage.getItem(STORAGE_KEY);
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        applyTheme(stored || (prefersLight ? "light" : "dark"));

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
                applyTheme(next);
                localStorage.setItem(STORAGE_KEY, next);
            });
        }

        // Follow system changes only if the user hasn't chosen manually
        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(event.matches ? "light" : "dark");
            }
        });
    }

    /* =========================================================
       5. GALLARY — 3D floating image showcase
       ========================================================= */
    function initGallary() {
        const container = document.getElementById("gallary-pres");
        if (!container) return;

        container.innerHTML = GALLARY_IMAGES
            .map((src) => `<img src="${src}" alt="" loading="lazy">`)
            .join("");
    }

    /* =========================================================
       6. GALLARY PROJECTS — horizontal scroll carousel
       ========================================================= */
    function initProjectsCarousel() {
        const track = document.getElementById("project-cards");
        const prevBtn = document.querySelector(".gallary-projects .scroll-btn.prev");
        const nextBtn = document.querySelector(".gallary-projects .scroll-btn.next");
        if (!track) return;

        track.innerHTML = PROJECTS.map((project) => `
            <li class="card">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="info">
                    <h2>${project.title}</h2>
                    <a href="${project.link}" aria-label="View ${project.title} project">
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
            </li>
        `).join("");

        const getStep = () => {
            const card = track.querySelector(".card");
            if (!card) return 300;
            const gap = parseFloat(getComputedStyle(track).gap) || 20;
            return card.offsetWidth + gap;
        };

        const updateButtonState = () => {
            if (!prevBtn || !nextBtn) return;
            const maxScroll = track.scrollWidth - track.clientWidth - 1;
            prevBtn.disabled = track.scrollLeft <= 0;
            nextBtn.disabled = track.scrollLeft >= maxScroll;
        };

        nextBtn?.addEventListener("click", () => {
            track.scrollBy({ left: getStep(), behavior: "smooth" });
        });

        prevBtn?.addEventListener("click", () => {
            track.scrollBy({ left: -getStep(), behavior: "smooth" });
        });

        track.addEventListener("scroll", updateButtonState);
        window.addEventListener("resize", updateButtonState);
        updateButtonState();
    }

    /* =========================================================
       7. CERTIFICATE CAROUSEL
       ========================================================= */
    function initCertificateCarousel() {
        const holder = document.getElementById("certificate-holder");
        const dotsContainer = document.getElementById("certificate-dots");
        const prevBtn = document.querySelector(".certificate .prev-btn");
        const nextBtn = document.querySelector(".certificate .next-btn");
        if (!holder || CERTIFICATES.length === 0) return;

        let current = 0;

        const render = () => {
            const cert = CERTIFICATES[current];
            holder.innerHTML = `
                <div class="left">
                    <div class="Course-info">
                        <h2>${cert.title}</h2>
                        <p>${cert.issuer}</p>
                    </div>
                    <div class="skills">
                        <h2>skills that i got:</h2>
                        <ul>
                            ${cert.skills.map((skill) => `<li>${skill}</li>`).join("")}
                        </ul>
                        <a href="${cert.link}" class="course-link">Course link website ↗</a>
                    </div>
                </div>
                <div class="right">
                    <img src="${cert.image}" alt="${cert.title.replace(/<br>/g, " ")} certificate">
                </div>
            `;

            if (dotsContainer) {
                dotsContainer.innerHTML = CERTIFICATES.map((_, index) => `
                    <button type="button" class="dot${index === current ? " active" : ""}"
                        role="tab" aria-selected="${index === current}"
                        aria-label="Show certificate ${index + 1}"></button>
                `).join("");
            }

            if (prevBtn) prevBtn.disabled = CERTIFICATES.length <= 1;
            if (nextBtn) nextBtn.disabled = CERTIFICATES.length <= 1;
        };

        const goTo = (index) => {
            current = (index + CERTIFICATES.length) % CERTIFICATES.length;
            render();
        };

        prevBtn?.addEventListener("click", () => goTo(current - 1));
        nextBtn?.addEventListener("click", () => goTo(current + 1));
        dotsContainer?.addEventListener("click", (event) => {
            const dot = event.target.closest(".dot");
            if (!dot) return;
            goTo([...dotsContainer.children].indexOf(dot));
        });

        render();
    }

    /* =========================================================
       8. DOWNLOAD CV — native JS download, no page reload
       ========================================================= */
    function initDownloadCV() {
        const btn = document.getElementById("download-cv");
        if (!btn) return;

        btn.addEventListener("click", async () => {
            const url = btn.dataset.resume;
            const filename = btn.dataset.filename || "resume.pdf";

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Resume file not found");
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error("CV download failed:", error);
                // Fallback: attempt a direct navigation to the file
                window.open(url, "_blank", "noopener");
            }
        });
    }

    /* =========================================================
       9. CONTACT FORM — validation + EmailJS
       ========================================================= */
    function initContactForm() {
        const form = document.getElementById("contact-form");
        if (!form) return;

        const nameInput = document.getElementById("cf-name");
        const emailInput = document.getElementById("cf-email");
        const messageInput = document.getElementById("cf-message");
        const submitBtn = document.getElementById("cf-submit");
        const statusEl = document.getElementById("cf-status");

        let isSubmitting = false;

        if (window.emailjs && EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
            emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        }

        const setError = (input, message) => {
            const errorEl = document.getElementById(`${input.id}-error`);
            if (errorEl) errorEl.textContent = message || "";
            input.setAttribute("aria-invalid", message ? "true" : "false");
        };

        const validate = () => {
            let valid = true;

            if (!nameInput.value.trim()) {
                setError(nameInput, "Please enter your name.");
                valid = false;
            } else {
                setError(nameInput, "");
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                setError(emailInput, "Please enter a valid email address.");
                valid = false;
            } else {
                setError(emailInput, "");
            }

            if (!messageInput.value.trim()) {
                setError(messageInput, "Please tell me about your project.");
                valid = false;
            } else {
                setError(messageInput, "");
            }

            return valid;
        };

        const setStatus = (message, state) => {
            if (!statusEl) return;
            statusEl.textContent = message;
            if (state) {
                statusEl.setAttribute("data-state", state);
            } else {
                statusEl.removeAttribute("data-state");
            }
        };

        const setLoading = (loading) => {
            isSubmitting = loading;
            if (!submitBtn) return;
            submitBtn.disabled = loading;
            submitBtn.querySelector(".btn-label").textContent = loading ? "Sending..." : "Send Message";
        };

        [nameInput, emailInput, messageInput].forEach((input) => {
            input.addEventListener("blur", validate);
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (isSubmitting) return;
            if (!validate()) {
                setStatus("Please fix the highlighted fields.", "error");
                return;
            }

            setLoading(true);
            setStatus("", null);

            const templateParams = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            try {
                if (!window.emailjs || EMAILJS_CONFIG.publicKey === "YOUR_EMAILJS_PUBLIC_KEY") {
                    throw new Error("EmailJS is not configured yet.");
                }

                await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);
                setStatus("Message sent — thank you! I'll get back to you soon.", "success");
                form.reset();
            } catch (error) {
                console.error("Contact form error:", error);
                setStatus("Something went wrong sending your message. Please try again or email me directly.", "error");
            } finally {
                setLoading(false);
            }
        });
    }

    /* =========================================================
       10. UTILITIES
       ========================================================= */
    function onReady(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    }

    /* =========================================================
       INIT
       ========================================================= */
    onReady(() => {
        initVueIslands();
        initNavbar();
        initTheme();
        initGallary();
        initProjectsCarousel();
        initCertificateCarousel();
        initDownloadCV();
        initContactForm();
    });
})();