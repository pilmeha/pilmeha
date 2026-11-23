const SECTION_NAMES = {
    news: "новости",
    music: "музыка",
    games: "игры",
    cinema: "фильмы",
    petproj: "пет проекты",
    books: "книги",
    food: "еда",
    about: "о себе",
};

const SECTION_DESCRIPTON = {
    news: "Новости",
    music: "Моя музыка",
    games: "Игры в которые играю, отзывы на них",
    cinema: "Отзывы на фильмы, аниме, сериалы",
    petproj: "О моих проектах",
    books: "Читательский дневник",
    food: "Рецепты, отзывы на еду",
    about: "О себе",
};

const cache = {};

async function render() {
    const section = location.hash.replace("#", "") || "news";
    const sectionTitle = SECTION_NAMES[section] || section;
    const sectionDescription = SECTION_DESCRIPTON[section] || section;
    const container = document.getElementById("content");

    document.title = `pilmeha // ${sectionTitle}`;

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${section}`);
    });

    if (!cache[section]) {
        try {
            const res = await fetch(`data/${section}.json`);
            cache[section] = res.ok ? await res.json() : [];
        } catch {
            cache[section] = [];
        }
    }

    const posts = cache[section]

    if (posts.length === 0) {
        container.innerHTML = `<p><small>// ${sectionDescription}</small></p><p>Пока здесь пусто</p>`;
        return;
    }

    const postsHTML = posts.map(post => {
        const paragraphs = Array.isArray(post.text)
            ? post.text.map(p => `<p>${p}</p>`).join("") : `<p>${post.text}</p>`;

        const imageAlt = post.imageAlt ? post.imageAlt : "";
        const imageHTML = post.image ? `<img src=${post.image}" loading="lazy" alt="${imageAlt}">` : "";
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

    container.innerHTML = `<p><small>// ${sectionDescription}</small></p>${postsHTML}`;
}

window.addEventListener("hashchange", render);
render();