document.addEventListener('DOMContentLoaded', () => {

    const skillsData = [
        {
            name: "Python",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/500px-Python-logo-notext.svg.png",
            level: 4
        },
        {
            name: "HTML",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/langfr-330px-HTML5_logo_and_wordmark.svg.png",
            level: 5
        },
        {
            name: "CSS",
            img: "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
            level: 5
        },
        {
            name: "JavaScript",
            img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            level: 3
        },
        {
            name: "PHP",
            img: "https://cdn-icons-png.flaticon.com/512/5968/5968332.png",
            level: 2
        },
        {
            name: "C#",
            img: "https://img.icons8.com/color/512/c-sharp-logo.png",
            level: 1
        },
        {
            name: "BluePrint",
            img: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/video-games/unreal-engine-qdh1c46xy8c1nedruo2v5.png/unreal-engine-xwo7bd8vu6fzpnkcifgtu.png?_a=DATAiZAAZAA0",
            level: 4
        },
        {
            name: "Batch",
            img: "https://cdn-icons-png.flaticon.com/512/5261/5261229.png",
            level: 1
        }
    ];

    const levelLabels = {
        1: "Beginner",
        2: "Elementary",
        3: "Intermediate",
        4: "Advanced",
        5: "Expert"
    };

    const levelColors = {
        1: "#ff3333", // Rouge
        2: "#ff8833", // Orange
        3: "#ffd700", // Jaune
        4: "#00ff88", // Vert
        5: "#00f2ff"  // Cyan
    };

    skillsData.sort((a, b) => a.name.localeCompare(b.name));
    skillsData.sort((a, b) => b.level - a.level);

    const gridContainer = document.getElementById('languages-grid');

    if (gridContainer) {
        skillsData.forEach(skill => {
            const card = document.createElement('div');
            card.classList.add('skill-card');

            const color = levelColors[skill.level];
            card.style.setProperty('--level-color', color);

            let barsHtml = '';
            for (let i = 1; i <= 5; i++) {
                const type = i <= skill.level ? 'filled' : 'empty';
                barsHtml += `<div class="bar ${type}"></div>`;
            }

            const levelText = levelLabels[skill.level] || "Unknown";

            card.innerHTML = `
                <div class="skill-icon">
                    <img src="${skill.img}" alt="${skill.name}">
                </div>
                <h3>${skill.name}</h3>
                <div class="skill-level-container" data-tooltip="${levelText}">
                    ${barsHtml}
                </div>
            `;

            gridContainer.appendChild(card);
        });
    }
});