
/* =========================
   Card Glow Effect
========================= */

const nationalityCard = document.getElementById("nationality-card");
const educationCard = document.getElementById("education-card");
const dreamCard = document.getElementById("dream-card");

const nationalityGlow = document.getElementById("nationality-glow");
const educationGlow = document.getElementById("education-glow");
const dreamGlow = document.getElementById("dream-glow");


nationalityCard.addEventListener("mousemove", (e) => {
    nationalityGlow.style.left = `${e.offsetX}px`;
    nationalityGlow.style.top = `${e.offsetY}px`;
});

// nationalityCard.addEventListener("mouseleave", () => {
//     nationalityGlow.style.left = "0px";
//     nationalityGlow.style.top = "0px";
// });


educationCard.addEventListener("mousemove", (e) => {
    educationGlow.style.left = `${e.offsetX}px`;
    educationGlow.style.top = `${e.offsetY}px`;
});



dreamCard.addEventListener("mousemove", (e) => {
    dreamGlow.style.left = `${e.offsetX}px`;
    dreamGlow.style.top = `${e.offsetY}px`;
});

// ================================
//  Certificate Carousel
//  Add this to your main.js
// ================================

const certificates = [
    {
        title: "Advanced Python<br>Engineering",
        issuer: "META PROFESSIONAL CERTIFICATION",
        skills: [
            "OOP Principles & Design Patterns",
            "PYTHON Backend Frameworks",
            "REGULAR Expressions & Data Scraping"
        ],
        courseLink: "https://www.codezilla.courses/",
        courseLinkText: "Course link website",
        image: "images/c-1.webp"
    },
    // Add more certificates here:
    {
        title: "Creativo",
        issuer: "Creativo CERTIFICATION",
        skills: ["HTML & CSS & JS", "Vue.js & React.js & jQuery", 'Bootsartap', 'PHP & laravel', 'SQL & phpMyAdmin'],
        courseLink: "https://createivo.com/",
        courseLinkText: "Course link website",
        image: "images/c-2.webp"
    },
];

(function initCertCarousel() {
    let current = 0;

    const holder = document.querySelector('.certifcat-holder');
    const dotsWrap = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!holder || !dotsWrap || !prevBtn || !nextBtn) return;

    // Build dots dynamically from data length
    dotsWrap.innerHTML = '';
    certificates.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    function render(index) {
        const cert = certificates[index];

        // Update left column
        holder.querySelector('.Course-info h2').innerHTML = cert.title;
        holder.querySelector('.Course-info p').textContent = cert.issuer;

        const ul = holder.querySelector('.skills ul');
        ul.innerHTML = cert.skills
            .map(s => `<li>${s}</li>`)
            .join('');

        const link = holder.querySelector('.course-link');
        link.href = cert.courseLink;
        link.innerHTML = `${cert.courseLinkText} ↗`;

        // Update right column
        holder.querySelector('.right img').src = cert.image;
        holder.querySelector('.right img').alt = cert.title.replace(/<br>/g, ' ');

        // Update dots
        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    function goTo(index) {
        current = (index + certificates.length) % certificates.length;
        // Fade transition
        holder.style.opacity = '0';
        holder.style.transform = 'translateY(8px)';
        setTimeout(() => {
            render(current);
            holder.style.opacity = '1';
            holder.style.transform = 'translateY(0)';
        }, 180);
    }

    // Add CSS transition for fade
    holder.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const section = document.getElementById('certificate');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Initial render
    render(0);
})();