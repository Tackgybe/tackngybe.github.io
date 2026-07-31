document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const restartBtn = document.getElementById('restartBtn');

    let score = 0;
    let isGameOver = false;

    // Player (Boat) properties
    let boat = {
        x: canvas.width / 2 - 15,
        y: canvas.height - 60,
        width: 30,
        height: 45,
        speed: 5,
        dx: 0
    };

    // Obstacles (Rocks) array
    let obstacles = [];
    let obstacleTimer = 0;

    // Track keyboard controls
    let keys = {
        ArrowLeft: false,
        ArrowRight: false
    };

    window.addEventListener('keydown', (e) => {
        if (e.key in keys) keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        if (e.key in keys) keys[e.key] = false;
    });

    // Spawn obstacles periodically
    function spawnObstacle() {
        const width = Math.random() * 30 + 25;
        const x = Math.random() * (canvas.width - width);
        obstacles.push({
            x: x,
            y: -40,
            width: width,
            height: 25,
            speed: 3
        });
    }

    // Draw the player's boat
    function drawBoat() {
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(boat.x + 10, boat.y + 10, 10, 25); // Hull
        ctx.fillStyle = '#ff4500';
        ctx.beginPath();
        ctx.moveTo(boat.x + 15, boat.y);
        ctx.lineTo(boat.x + 30, boat.y + 15);
        ctx.lineTo(boat.x + 15, boat.y + 20);
        ctx.fill(); // Sail
    }

    // Draw obstacles (rocks)
    function drawObstacles() {
        ctx.fillStyle = '#808080';
        obstacles.forEach(obs => {
            ctx.beginPath();
            ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
            ctx.fill();
        });
    }

    // Check collision between boat and rocks
    function checkCollision() {
        obstacles.forEach(obs => {
            if (
                boat.x < obs.x + obs.width &&
                boat.x + boat.width > obs.x &&
                boat.y < obs.y + obs.height &&
                boat.y + boat.height > obs.y
            ) {
                isGameOver = true;
            }
        });
    }

    // Main game loop
    function updateGame() {
        if (isGameOver) {
            restartBtn.classList.remove('hidden');
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move boat based on input
        if (keys.ArrowLeft && boat.x > 0) {
            boat.x -= boat.speed;
        }
        if (keys.ArrowRight && boat.x < canvas.width - boat.width) {
            boat.x += boat.speed;
        }

        // Handle obstacle spawning and movement
        obstacleTimer++;
        if (obstacleTimer > 70) {
            spawnObstacle();
            obstacleTimer = 0;
        }

        obstacles.forEach((obs, index) => {
            obs.y += obs.speed;
            // Remove off-screen obstacles and add to score
            if (obs.y > canvas.height) {
                obstacles.splice(index, 1);
                score += 10;
                scoreDisplay.textContent = score;
            }
        });

        drawBoat();
        drawObstacles();
        checkCollision();

        requestAnimationFrame(updateGame);
    }

    // Restart game listener
    restartBtn.addEventListener('click', () => {
        score = 0;
        scoreDisplay.textContent = score;
        obstacles = [];
        boat.x = canvas.width / 2 - 15;
        isGameOver = false;
        restartBtn.classList.add('hidden');
        updateGame();
    });

    // Start the game loop for the first time
    updateGame();
});
