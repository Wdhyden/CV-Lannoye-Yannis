// ===============================
// Particules animées (Out of Bounds style)
// ===============================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numParticles = 60; // nombre de particules
const maxSize = 3;
const maxSpeed = 0.6;
const linkDistance = 120;

// Redimensionnement automatique
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Classe particule
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * maxSize + 1;
        this.speedX = (Math.random() - 0.5) * maxSpeed * 2;
        this.speedY = (Math.random() - 0.5) * maxSpeed * 2;
        this.color = "rgba(255, 111, 216, 0.8)"; // ton rose
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebond sur les bords
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialisation
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Connexion entre particules
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < linkDistance) {
                ctx.strokeStyle = "rgba(255, 111, 216, 0.1)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation principale
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particlesArray) {
        particle.update();
        particle.draw();
    }

    connectParticles();
    requestAnimationFrame(animateParticles);
}

// Lancer
initParticles();
animateParticles();
