document.addEventListener('DOMContentLoaded', () => {

    // Dictionnaire des icônes pour la stack technique
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

    // ID de votre Google Sheets (récupéré depuis l'URL de création)
    const SHEET_ID = '1pT-YXqru2Em0ImGP2ogNvXi_FyEC_UUpDqy99sJy9DY';
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

    async function loadProjects() {
        try {
            // Récupération des données depuis Google Sheets
            const response = await fetch(SHEET_URL);
            const text = await response.text();
            
            // Nettoyage de la réponse de Google pour obtenir un JSON valide
            const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];
            const data = JSON.parse(jsonString);

// Fonction mise à jour pour utiliser l'API thumbnail de Google Drive
            function getDirectImageUrl(url) {
                if (url.includes("drive.google.com/file/d/")) {
                    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) {
                        // sz=w1000 permet de demander une image d'une largeur de 1000 pixels pour garder une bonne qualité
                        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
                    }
                }
                return url; 
            }

            // Transformation des lignes du tableau en objets exploitables
            let projectsData = data.table.rows.map(row => {
                let rawImgUrl = row.c[2]?.v || "";
                
                return {
                    name: row.c[0]?.v || "",
                    desc: row.c[1]?.v || "",
                    img: getDirectImageUrl(rawImgUrl), // Conversion appliquée ici
                    // On transforme la chaîne de texte (ex: "Batch, Python") en tableau Array
                    stack: row.c[3]?.v ? row.c[3].v.split(',').map(s => s.trim()) : [],
                    link: row.c[4]?.v || "",
                    begin: row.c[5]?.v || "",
                    end: row.c[6]?.v || ""
                };
            });

            // Tri par date (du plus ancien au plus récent)
            projectsData.sort((a, b) => new Date(a.begin) - new Date(b.begin));

            // Génération de l'affichage HTML
            const gridContainer = document.getElementById('projects-grid');
            if (gridContainer) {
                // On s'assure que le container est vide avant de le remplir (utile si on rappelle la fonction)
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

                    // Injection HTML de la carte projet
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

    // Appel de la fonction pour charger et afficher les projets
    loadProjects();
});