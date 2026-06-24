
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
    nationalityGlow.style.left = `${e.offsetX }px`;
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

// educationCard.addEventListener("mouseleave", () => {
//     educationGlow.style.left = "calc(100% - 100px)";
//     educationGlow.style.top = "40%";
// });


dreamCard.addEventListener("mousemove", (e) => {
    dreamGlow.style.left = `${e.offsetX}px`;
    dreamGlow.style.top = `${e.offsetY}px`;
});

// dreamCard.addEventListener("mouseleave", () => {
//     dreamGlow.style.left = "0px";
//     dreamGlow.style.top = "calc(100% - 100px)";
// });



