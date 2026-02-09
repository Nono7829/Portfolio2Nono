document.addEventListener('DOMContentLoaded', () => {
    const contactData = [
        {
            name: "GitHub",
            userName: "Nono7829",
            icon: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg",
            link: "https://github.com/Nono7829",
            action: "Follow me"
        },
        {
            name: "Email",
            userName: "chevalier.nolhan@gmail.com",
            icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
            link: "mailto:chevalier.nolhan@gmail.com",
            action: "Send Email"
        },
        {
            name: "Discord",
            userName: "n0n00061", 
            icon: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e278299a53f5bf88615e90_Symbol.svg",
            link: "https://discord.com", 
            action: "Add Friend"
        }
    ];

    const gridContainer = document.getElementById('contact-grid');

    if (gridContainer) {
        contactData.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('contact-card');

            card.innerHTML = `
                <div class="contact-icon">
                    <img src="${item.icon}" alt="${item.name}">
                </div>
                <div class="contact-info">
                    <h3>${item.name}</h3>
                    <span>${item.userName}</span>
                </div>
                <a href="${item.link}" target="_blank" class="contact-btn">${item.action}</a>
            `;

            gridContainer.appendChild(card);
        });
    }
});