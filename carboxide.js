    const emojis = ['O', 'C'];
    const sizes = [8, 10, 12, 16, 20];

    document.addEventListener('mousemove', (event) => {
        const emojiElement = document.createElement('div');
        emojiElement.classList.add('emoji');
        const sizeIndex = Math.floor(Math.random() * sizes.length);
        emojiElement.style.fontSize = `${sizes[sizeIndex]}px`;
        emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(emojiElement);

        let posX = event.pageX;
        let posY = event.pageY;
        let directionX = (Math.random() - 0.5) * 2;
        let directionY = (Math.random() - 0.5) * 2;

        emojiElement.style.left = `${posX}px`;
        emojiElement.style.top = `${posY}px`;

        function moveEmoji() {
            posX += directionX;
            posY += directionY;

            // Apply new position
            emojiElement.style.left = `${posX}px`;
            emojiElement.style.top = `${posY}px`;

            // Fade out and remove emoji after it moves a certain distance
            if (Math.abs(directionX) + Math.abs(directionY) < 0.5) {
                emojiElement.style.opacity = 0;
                setTimeout(() => {
                    document.body.removeChild(emojiElement);
                }, 2000);
            } else {
                requestAnimationFrame(moveEmoji);
            }

            // Slow down movement over time
            directionX *= 0.99;
            directionY *= 0.99;
        }

        requestAnimationFrame(moveEmoji);
    });
