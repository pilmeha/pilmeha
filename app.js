const SECTION_NAMES = {
    news: "новости",
    music: "музыка",
    games: "игры",
    movie: "фильмы",
    petproj: "пет проекты",
    books: "книги",
    food: "еда",
    about: "о себе",
};

let allPosts = [];

fetch("posts.json")
    .then(res=> res.json())
    .then(data => {
        allPosts = data;
        render();
    });

function render() {
    const section = location.hash.replace("#", "") || "news";
    const sectionTitle = SECTION_NAMES[section] || section;

    document.title = `pilmeha // ${sectionTitle}`;

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${section}`);
    });

    const filtered = allPosts.filter(post => post.section === section);
    const container = document.getElementById("content");

    if (filtered.length === 0) {
        container.innerHTML = `<p><small>// ${sectionTitle}</small></p><p>Пока здесь пусто</p>`;
        return;
    }

    const postsHTML = filtered.map(post => {
        const paragraphs = Array.isArray(post.text)
            ? post.text.map(p => `<p>${p}</p>`).join("") : `<p>${post.text}</p>`;

        const imageHTML = post.image ? `<img src=${post.image}" alt="">` : "";
        const audioHTML = post.audio ? `<audio controls src="${post.audio}"></audoi>` : "";
        const linkHTML = post.link ? `<p><a href=${post.link}" target="_blank">[открыть ссылку ->]</a></p>` : "";

        return `
            <article>
                <small>${post.date} // ${post.tag}</small>
                <h2>${post.title}</h2>
                ${paragraphs}
                ${imageHTML}
                ${audioHTML}
                ${linkHTML}
            </article>
        `;
    }).join("");

    container.innerHTML = `<p><small>// ${sectionTitle}</small></p>${postsHTML}`;
}

window.addEventListener("hashchange", render);