document.addEventListener('DOMContentLoaded', () => {

    const skillsData = [
        {
            name: "Python",
            img: "https://en.wikipedia.org/wiki/File:Python-logo-notext.svg",
            level: 4
        },
        {
            name: "HTML",
            img: "https://en.wikipedia.org/wiki/File:HTML5_logo_and_wordmark.svg",
            level: 5
        },
        {
            name: "CSS",
            img: "https://en.wikipedia.org/wiki/File:Official_CSS_Logo.svg",
            level: 5
        },
        {
            name: "JavaScript",
            img: "https://en.wikipedia.org/wiki/File:Logo_of_TC39.svg",
            level: 3
        },
        {
            name: "PHP",
            img: "https://en.wikipedia.org/wiki/File:PHP-logo.svg",
            level: 3
        },
        {
            name: "C#",
            img: "https://en.wikipedia.org/wiki/File:C_Sharp_Logo_2023.svg",
            level: 1
        },
        {
            name: "BluePrint",
            img: "https://en.wikipedia.org/wiki/File:Unreal_Engine_Logo_(new_typeface).svg",
            level: 4
        },
        {
            name: "Batch",
            img: "https://en.wikipedia.org/wiki/File:Batch_file_icon.png",
            level: 2
        },
        {
            name: "C++",
            img: "https://en.wikipedia.org/wiki/File:ISO_C++_Logo.svg",
            level: 2
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
