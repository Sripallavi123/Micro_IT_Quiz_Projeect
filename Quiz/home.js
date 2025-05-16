document.addEventListener('DOMContentLoaded', () => {
    // Animate Welcome Text
    const welcomeText = document.getElementById('welcome-text');
    const text = welcomeText.textContent;
    welcomeText.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        span.style.animationDelay = `${index * 0.1}s`; // 100ms delay per letter
        welcomeText.appendChild(span);
    });

    // Toggle About Section
    const aboutBtn = document.getElementById('about-btn');
    const aboutSection = document.getElementById('about-section');

    aboutBtn.addEventListener('click', () => {
        aboutSection.classList.toggle('hidden');
        aboutSection.classList.toggle('active');
    });
});