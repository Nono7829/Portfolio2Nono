document.addEventListener('DOMContentLoaded', () => {

    const skillsData = [
        {
            name: "Python",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
            level: 4
        },
        {
            name: "HTML",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
            level: 5
        },
        {
            name: "CSS",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
            level: 5
        },
        {
            name: "JavaScript",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
            level: 3
        },
        {
            name: "PHP",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
            level: 3
        },
        {
            name: "C#",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
            level: 1
        },
        {
            name: "BluePrint",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg",
            level: 4
        },
        {
            name: "Batch",
            img: "https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@master/icons/file_type_bat.svg",
            level: 2
        },
        {
            name: "C++",
            img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
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
