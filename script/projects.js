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
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&t=${new Date().getTime()}`;

    async function loadProjects() {
        try {
            const response = await fetch(SHEET_URL);
            const text = await response.text();

            const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];
            const data = JSON.parse(jsonString);

            let projectsData = data.table.rows.map(row => {
                return {
                    name: row.c[0]?.v || "",
                    desc: row.c[1]?.v || "",
                    rawMediaUrl: row.c[2]?.v || "", 
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

                    const projectImageContainer = card.querySelector('.project-image');
                    let rawUrl = project.rawMediaUrl ? project.rawMediaUrl.trim() : "";

                    if (rawUrl) {
                        const createImg = (url, alt) => {
                            const img = document.createElement('img');
                            img.className = 'media-element';
                            img.src = url;
                            img.alt = alt;
                            img.style.cssText = "width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block;";
                            return img;
                        };

                        const createVideo = (url) => {
                            const video = document.createElement('video');
                            video.className = 'media-element';
                            video.src = url;
                            video.autoplay = true;
                            video.loop = true;
                            video.muted = true;
                            video.playsInline = true;
                            video.style.cssText = "width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block;";
                            
                            video.addEventListener('canplay', () => {
                                video.play().catch(e => console.warn("Lecture auto bloquée :", e));
                            });
                            return video;
                        };

                        // CAS 1 : C'est un lien Google Drive (partagé)
                        if (rawUrl.includes("drive.google.com")) {
                            const match = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                            if (match && match[1]) {
                                // Lien direct optimisé pour les images Google Drive
                                const directDriveUrl = `https://lh3.googleusercontent.com/d/${match[1]}`;
                                projectImageContainer.prepend(createImg(directDriveUrl, project.name));
                            }
                        } 
                        // CAS 2 : C'est une vidéo locale (.mp4 ou .webm)
                        else if (rawUrl.toLowerCase().endsWith('.mp4') || rawUrl.toLowerCase().endsWith('.webm')) {
                            projectImageContainer.prepend(createVideo(`../vid/${rawUrl}`));
                        } 
                        // CAS 3 : C'est une image locale (ex: mon-image.png) ou un autre lien direct
                        else {
                            // Si c'est juste le nom du fichier, on préfixe par ../vid/, sinon on prend l'URL telle quelle
                            const finalImgPath = rawUrl.startsWith('http') ? rawUrl : `../vid/${rawUrl}`;
                            projectImageContainer.prepend(createImg(finalImgPath, project.name));
                        }
                    }

                    gridContainer.appendChild(card);
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            const gridContainer = document.getElementById('projects-grid');
            if (gridContainer) {
                gridContainer.innerHTML = `<p style="color: red;">Erreur de chargement des projets.</p>`;
            }
        }
    }

    loadProjects();
});