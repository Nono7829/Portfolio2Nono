document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // PARTIE 1 : Animation des mots défilants (Stop & Go auto-calculé)
    // =================================================================
    
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

            // Génération de l'étape : Reste à la position Y, puis commence à bouger
            keyframesCSS += `
                ${startPercent.toFixed(2)}%, ${pauseEndPercent.toFixed(2)}% { transform: translateY(-${yPosition}em); }
            `;
        }
        
        // Étape finale (100%) : Arrivée sur le clone (visuellement identique au départ)
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
    // PARTIE 2 : Effet de parallaxe souris sur l'image (Tilt)
    // =================================================================
    
    const tiltContainer = document.querySelector('.js-tilt');

    if (tiltContainer) {
        document.addEventListener('mousemove', (e) => {
            // On calcule la position de la souris par rapport au centre de l'écran
            // Les valeurs vont de -1 (gauche/haut) à +1 (droite/bas)
            const xNormalized = (e.clientX / window.innerWidth) * 2 - 1;
            const yNormalized = (e.clientY / window.innerHeight) * 2 - 1;

            // Intensité du mouvement (plus le chiffre est grand, plus ça bouge)
            const movementStrength = 25; // ex: 25 pixels max de déplacement

            // Inversion de l'axe X (-xNormalized) pour un effet plus naturel "en opposition"
            const moveX = -xNormalized * movementStrength;
            const moveY = yNormalized * movementStrength;

            // Application de la transformation
            tiltContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});