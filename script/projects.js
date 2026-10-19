document.addEventListener('DOMContentLoaded', () => {

    const techIcons = {
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
        "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
        "BluePrint": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg",
        "Batch": "https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@master/icons/file_type_bat.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    };

    const SHEET_ID = '1pT-YXqru2Em0ImGP2ogNvXi_FyEC_UUpDqy99sJy9DY';
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

    async function loadProjects() {
        try {
            const response = await fetch(SHEET_URL);
            const text = await response.text();

            const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];
            const data = JSON.parse(jsonString);

            function getDirectImageUrl(url) {
                if (url.includes("drive.google.com/file/d/")) {
                    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) {
                        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
                    }
                }
                return url;
            }

            let projectsData = data.table.rows.map(row => {
                let rawImgUrl = row.c[2]?.v || "";

                return {
                    name: row.c[0]?.v || "",
                    desc: row.c[1]?.v || "",
                    img: getDirectImageUrl(rawImgUrl),
                    stack: row.c[3]?.v ? row.c[3].v.split(',').map(s => s.trim()) : [],
                    link: row.c[4]?.v || "",
                    begin: row.c[5]?.v || "",
                    end: row.c[6]?.v || ""
                };
            });

            projectsData.sort((a, b) => new Date(a.begin) - new Date(b.begin));

            const gridContainer = document.getElementById('projects-grid');
            if (gridContainer) {
                gridContainer.innerHTML = '';

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
                            <p class="project-meta">${project.begin} — ${project.end}</p>
                            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                        </div>
                    `;

                    gridContainer.appendChild(card);
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données du tableur :", error);
            const gridContainer = document.getElementById('projects-grid');
            if (gridContainer) {
                gridContainer.innerHTML = `<p style="color: red;">Erreur de chargement des projets. Vérifiez que votre Google Sheets est bien partagé en "Tous les utilisateurs disposant du lien".</p>`;
            }
        }
    }

    loadProjects();
});