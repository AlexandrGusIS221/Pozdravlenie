// Предыдущий скрипт с лепестками остается
        
// Добавляем эффект искорок
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sparks = [];

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95;
        this.alpha -= 0.03;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

function handleMouseMove(e) {
    for(let i = 0; i < 5; i++) {
        sparks.push(new Spark(e.clientX, e.clientY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < sparks.length; i++) {
        sparks[i].update();
        sparks[i].draw();
        
        if(sparks[i].alpha <= 0) {
            sparks.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function createPetals() {
    const flowers = document.getElementById('flowers');
    for(let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 3 + 5 + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        flowers.appendChild(petal);
    }
}

createPetals();

// Добавляем мерцание
setInterval(() => {
    document.body.style.background = `linear-gradient(45deg, 
        hsl(${Math.random() * 360}, 70%, 85%),
        hsl(${Math.random() * 360}, 70%, 75%),
        hsl(${Math.random() * 360}, 70%, 65%))`;
}, 5000);

animate();