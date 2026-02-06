document.addEventListener('DOMContentLoaded', () => {

    const techIcons = {
        "Python": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/500px-Python-logo-notext.svg.png",
        "HTML": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/langfr-330px-HTML5_logo_and_wordmark.svg.png",
        "CSS": "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
        "JavaScript": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        "PHP": "https://cdn-icons-png.flaticon.com/512/5968/5968332.png",
        "C#": "https://img.icons8.com/color/512/c-sharp-logo.png",
        "BluePrint": "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/video-games/unreal-engine-qdh1c46xy8c1nedruo2v5.png/unreal-engine-xwo7bd8vu6fzpnkcifgtu.png?_a=DATAiZAAZAA0",
        "SQL": "https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
    };

    const projectsData = [
        {
            name: "Patch FR - Yo-kai Watch Blasters 2",
            desc: "Voici mon premier projet, la réalisation d'un patch de traduction en équipe, pour le jeu Yo-kai Watch Blasters 2 sur Nintendo 3DS.",
            img: "../img/b2.png",
            stack: [],
            link: "https://discord.gg/p2YraVYGBd"
        },
        {
            name: "Yo-Trad Tools",
            desc: "Des outils ayant servi à la création du patch de traduction pour Yo-kai Watch Blasters 2, comprenant un éditeur de texte et un outil de gestion des fichiers de jeu.",
            img: "../img/yo-trad_tools.png",
            stack: ["Python"],
            link: "https://github.com/YoTradWatchTeam/Yo-Trad-Tools"
        },
        {
            name: "Flappy Bird",
            desc: "Le premier jeu que j'ai développé, sur Unity, une réplique du célèbre Flappy Bird avec des graphismes en HD.",
            img: "../img/Flappy_Bird_icon.png",
            stack: ["C#"],
            link: "https://github.com/Nono7829/FlappyBird"
        },
        {
            name: "Zombie Kill",
            desc: "Mon premier jeu sur Unreal Engine, lors d'un stage dans le Gaming Campus de la Défense.",
            img: "../img/Zombie_Kill.png",
            stack: ["BluePrint"],
            link: "https://github.com/Nono7829/ZombieKill"
        },
        {
            name: "Flappy Bird JS",
            desc: "Mon premier jeu en JavaScript, pour un devoir de NSI.",
            img: "../img/Flappy_Bird_icon.png",
            stack: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com/Nono7829/Flappy-Bird-JS"
        },
        {
            name: "BlendHleper",
            desc: "Un outil d'aide pour l'application Blender.",
            img: "../img/BlendHelper.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/BlendHelper"
        },
        {
            name: "EquaSolve",
            desc: "Un outil de résolution d'équations mathématiques.",
            img: "../img/EquaSolve.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/EquaSolve"
        },
        {
            name: "PHP-INTERPRETER",
            desc: "Un interpréteur PHP en Python.",
            img: "../img/PHP-INTERPRETER.png",
            stack: ["HTML", "CSS", "JavaScript", "PHP"],
            link: "https://github.com/Nono7829/PHP-INTERPRETER"
        },
        {
            name: "PHP-INTERPRETER",
            desc: "Un interpréteur PHP en Python.",
            img: "../img/PHP-INTERPRETER.png",
            stack: ["HTML", "CSS", "JavaScript", "PHP"],
            link: "https://github.com/Nono7829/PHP-INTERPRETER"
        },
        {
            name: "ProjStruct",
            desc: "Un outil affichant la structure d'un projet.",
            img: "../img/ProjStruct.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/ProjStruct"
        },
        {
            name: "HTMLCleaner",
            desc: "Un outil nettoyant le code HTML et CSS d'un projet.",
            img: "../img/HTMLCleaner.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/HTMLCleaner"
        },
        {
            name: "Batch-Image-Compressor",
            desc: "Un outil compressant les images d'un dossier.",
            img: "../img/Batch-Image-Compressor.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/Batch-Image-Compressor"
        },
        {
            name: "Model3DtoFBX",
            desc: "Un outil convertissant les modèles 3D en format FBX.",
            img: "../img/Model3DtoFBX.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/Model3DtoFBX"
        }
    ];

    const gridContainer = document.getElementById('projects-grid');

    if (gridContainer) {
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');

            let stackHtml = '';
            project.stack.forEach(techName => {
                const iconUrl = techIcons[techName];
                if (iconUrl) {
                    stackHtml += `<img src="${iconUrl}" alt="${techName}" title="${techName}">`;
                }
            });

            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.img}" alt="${project.name}">
                    <div class="project-overlay">
                        <div class="project-stack">
                            ${stackHtml}
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p>${project.desc}</p>
                    <a href="${project.link}" target="_blank" class="project-link">Voir le projet</a>
                </div>
            `;

            gridContainer.appendChild(card);
        });
    }
});