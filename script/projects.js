document.addEventListener('DOMContentLoaded', () => {

    const techIcons = {
        "Python": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/500px-Python-logo-notext.svg.png",
        "HTML": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/langfr-330px-HTML5_logo_and_wordmark.svg.png",
        "CSS": "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
        "JavaScript": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        "PHP": "https://cdn-icons-png.flaticon.com/512/5968/5968332.png",
        "C#": "https://img.icons8.com/color/512/c-sharp-logo.png",
        "BluePrint": "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/video-games/unreal-engine-qdh1c46xy8c1nedruo2v5.png/unreal-engine-xwo7bd8vu6fzpnkcifgtu.png?_a=DATAiZAAZAA0",
        "Batch": "https://cdn-icons-png.flaticon.com/512/5261/5261229.png"
    };

    const projectsData = [
        {
            name: "Patch FR - Yo-kai Watch Blasters 2",
            desc: "My first project: a team translation patch for the game Yo-kai Watch Blasters 2 on Nintendo 3DS.",
            img: "../img/b2.png",
            stack: [],
            link: "https://discord.gg/p2YraVYGBd",
            begin: "Oct 23, 2023",
            end: "Feb 22, 2026"
        },
        {
            name: "Yo-Trad Tools",
            desc: "Tools created to help with the Yo-kai Watch Blasters 2 translation patch, including a text editor and file management tools.",
            img: "../img/yo-trad_tools.png",
            stack: ["Batch", "Python"],
            link: "https://github.com/YoTradWatchTeam/Yo-Trad-Tools",
            begin: "Mar 12, 2025",
            end: "Apr 9, 2025"
        },
        {
            name: "Flappy Bird",
            desc: "The first game I developed on Unity, a replica of the famous Flappy Bird with HD graphics.",
            img: "../img/Flappy_Bird_icon.png",
            stack: ["C#"],
            link: "https://github.com/Nono7829/FlappyBird",
            begin: "May 18, 2025",
            end: "Jun 5, 2025"
        },
        {
            name: "Flappy Bird JS",
            desc: "My first game in JavaScript, created for a Computer Science school assignment.",
            img: "../img/Flappy_Bird_icon.png",
            stack: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com/Nono7829/Flappy-Bird-JS",
            begin: "Jun 16, 2025",
            end: "Jan 25, 2026"
        },
        {
            name: "Zombie Kill",
            desc: "My first game on Unreal Engine, developed during an internship at the Gaming Campus in La Défense.",
            img: "../img/Zombie_Kill.png",
            stack: ["BluePrint"],
            link: "https://github.com/Nono7829/ZombieKill",
            begin: "Jul 15, 2025",
            end: "Jul 18, 2025"
        },
        {
            name: "EquaSolve",
            desc: "A tool designed to solve mathematical equations.",
            img: "../img/EquaSolve.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/EquaSolve",
            begin: "Sep 10, 2025",
            end: "Sep 10, 2025"
        },
        {
            name: "Model3DtoFBX",
            desc: "A tool that automatically converts 3D models into FBX format.",
            img: "../img/model3dtofbx.jpg",
            stack: ["Python"],
            link: "https://github.com/Nono7829/Model3DtoFBX",
            begin: "Sep 13, 2025",
            end: "Sep 13, 2025"
        },
        {
            name: "Batch-Image-Compressor",
            desc: "A tool to compress all images within a folder.",
            img: "../img/bic.jpg",
            stack: ["Python"],
            link: "https://github.com/Nono7829/Batch-Image-Compressor",
            begin: "Sep 17, 2025",
            end: "Sep 17, 2025"
        },
        {
            name: "HTMLCleaner",
            desc: "A tool that cleans and optimizes HTML and CSS code for projects.",
            img: "../img/htmlcleaner.jpg",
            stack: ["Python"],
            link: "https://github.com/Nono7829/HTMLCleaner",
            begin: "Sep 21, 2025",
            end: "Sep 21, 2025"
        },
        {
            name: "BlendHelper",
            desc: "A helper tool designed for the Blender application.",
            img: "../img/blendhelper.jpg",
            stack: ["Python"],
            link: "https://github.com/Nono7829/BlendHelper",
            begin: "Sep 25, 2025",
            end: "Sep 25, 2025"
        },
        {
            name: "ProjStruct",
            desc: "A tool that displays the folder and file structure of a project.",
            img: "../img/projstruct.jpg",
            stack: ["Python"],
            link: "https://github.com/Nono7829/ProjStruct",
            begin: "Oct 26, 2025",
            end: "Oct 26, 2025"
        },
        {
            name: "PHP-INTERPRETER",
            desc: "A PHP interpreter written entirely in Python.",
            img: "../img/php-interpreter.png",
            stack: ["HTML", "CSS", "JavaScript", "PHP"],
            link: "https://github.com/Nono7829/PHP-INTERPRETER",
            begin: "Feb 1, 2026",
            end: "Feb 7, 2026"
        },
        {
            name: "FPJS",
            desc: "A FPS in full JavaScript, in 3D.",
            img: "../img/fpjs.png",
            stack: ["HTML", "CSS", "JavaScript"],
            link: "https://github.com/Nono7829/FPJS",
            begin: "Aug 19, 2025",
            end: "Oct 14, 2025"
        },
        {
            name: "CASSE BRIQUE Python",
            desc: "This game was realized for a project in NSI class, it's a replica of the famous Casse Brique game.",
            img: "../img/casse_brique.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/CASSE-BRIQUE-Python",
            begin: "Dec 2, 2025",
            end: "Feb 3, 2026"
        },
        {
            name: "Subway Surfer Py",
            desc: "A replica of Subway Surfer, created in Python using the Pygame library.",
            img: "../img/subway_surfer_py.png",
            stack: ["Python"],
            link: "https://github.com/Nono7829/Subway-Surfer-Py",
            begin: "Oct 29, 2025",
            end: "Nov 7, 2025"
        }
    ];

    projectsData.sort((a, b) => new Date(a.begin) - new Date(b.begin));


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

            // Injection HTML
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
                    <p class="project-meta">${project.begin} — ${project.end}</p>
                    <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                </div>
            `;

            gridContainer.appendChild(card);
        });
    }
});
