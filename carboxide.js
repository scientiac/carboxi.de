const emojis = ['O', 'C'];
const sizes = [8, 10, 12, 16, 20];

function createEmoji(eventX, eventY) {
    const emojiElement = document.createElement('div');
    emojiElement.classList.add('emoji');
    const sizeIndex = Math.floor(Math.random() * sizes.length);
    emojiElement.style.fontSize = `${sizes[sizeIndex]}px`;
    emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emojiElement);

    // Convert page coordinates to viewport coordinates for fixed positioning
    const posX = eventX - window.pageXOffset;
    const posY = eventY - window.pageYOffset;
    emojiElement.style.left = `${posX}px`;
    emojiElement.style.top = `${posY}px`;

    let directionX = (Math.random() - 0.5) * 2;
    let directionY = (Math.random() - 0.5) * 2;

    function moveEmoji() {
	emojiElement.style.left = `${parseFloat(emojiElement.style.left) + directionX}px`;
	emojiElement.style.top = `${parseFloat(emojiElement.style.top) + directionY}px`;

	// Gradually decrease speed and fade out
	directionX *= 0.99;
	directionY *= 0.99;
	if (Math.abs(directionX) + Math.abs(directionY) < 0.5) {
	    emojiElement.style.opacity = 0;
	    setTimeout(() => document.body.removeChild(emojiElement), 3000);
	} else {
	    requestAnimationFrame(moveEmoji);
	}
    }

    moveEmoji();
}

function handleEvent(event) {
    let eventX, eventY;
    if (event.type.startsWith('touch')) {
	// Prevent the window from being scrolled
	event.preventDefault();
	eventX = event.touches[0].clientX;
	eventY = event.touches[0].clientY;
    } else {
	eventX = event.clientX;
	eventY = event.clientY;
    }
    createEmoji(eventX, eventY);
}

// Randomly spawn emojis to keep the site feeling fresh
function randomSpawnEmoji() {
    // Generate random positions within the viewport
    const eventX = Math.random() * window.innerWidth;
    const eventY = Math.random() * window.innerHeight;

    for (let i = 0; i < 5; i++) {
	createEmoji(eventX, eventY);
    }

    // Adjust the timeout to control the frequency of random spawns
    setTimeout(randomSpawnEmoji, Math.random() * 3500); // Random spawn between 1 to 3 seconds
}

// Start the random spawning process
randomSpawnEmoji();

// Use `mousemove` for desktop
document.addEventListener('mousemove', handleEvent);
// Use `touchmove` for continuous touch events on mobile
document.addEventListener('touchmove', handleEvent, { passive: false });
