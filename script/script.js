document.addEventListener('DOMContentLoaded', () => {
    
    const box = document.querySelector('.scrolling-words-box');
    
    // On vérifie si l'élément existe pour éviter des erreurs
    if (box) {
        // Récupération des mots et comptage
        const originalWords = Array.from(box.children);
        const totalWords = originalWords.length;
        
        // Ajout du clone du premier mot à la fin pour une boucle fluide
        const clone = originalWords[0].cloneNode(true);
        box.appendChild(clone);

        // Configuration de l'animation
        const durationPerWord = 3; // Temps de pause par mot (en secondes)
        const totalDuration = totalWords * durationPerWord;
        // La hauteur doit correspondre exactement à celle définie dans le CSS (--subtitle-height)
        const itemHeight = 1.2; 

        // Construction dynamique des Keyframes CSS
        let keyframesCSS = '@keyframes dynamicScroll {';
        
        for (let i = 0; i < totalWords; i++) {
            // Pourcentage de début de la phase pour ce mot
            const startPercent = (i / totalWords) * 100;
            // Pourcentage de fin de la "pause" (le mot reste fixe 85% du temps de son créneau)
            const pauseEndPercent = startPercent + (100 / totalWords * 0.85);
            
            // Position Y négative (on monte)
            const yPosition = i * itemHeight;

            keyframesCSS += `
                ${startPercent.toFixed(2)}%, ${pauseEndPercent.toFixed(2)}% { transform: translateY(-${yPosition}em); }
            `;
        }
        
         keyframesCSS += `
            100% { transform: translateY(-${totalWords * itemHeight}em); }
        }`;

        // Injection du style CSS dans le <head> de la page
        const styleSheet = document.createElement("style");
        styleSheet.innerHTML = keyframesCSS;
        document.head.appendChild(styleSheet);

        // Application de l'animation générée à la boîte
        box.style.animation = `dynamicScroll ${totalDuration}s ease-in-out infinite`;
    }


    // =================================================================
    // Effet de parallaxe souris sur l'image (Tilt)
    // =================================================================
    
    const tiltContainer = document.querySelector('.js-tilt');

    if (tiltContainer) {
        document.addEventListener('mousemove', (e) => {
            const xNormalized = (e.clientX / window.innerWidth) * 2 - 1;
            const yNormalized = (e.clientY / window.innerHeight) * 2 - 1;

            // Intensité du mouvement
            const movementStrength = 30;

            // Inversion de l'axe X (-xNormalized)
            const moveX = -xNormalized * movementStrength;
            const moveY = yNormalized * movementStrength;

            // Application de la transformation
            tiltContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});

const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active'); // Affiche/Cache le menu
        menuToggle.classList.toggle('is-active'); // Transforme le burger en X
    });
}

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});