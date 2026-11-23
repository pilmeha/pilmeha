const menu = `
  <h1>~/my_corner</h1>
  <nav>
    <a href="index.html">[новости]</a>
    <a href="music.html">[музыка]</a>
    <a href="games.html">[игры]</a>
    <a href="movie.html">[кино]</a>
    <a href="petproj.html">[пет проекты]</a>
    <a href="books.html">[книги]</a>
    <a href="food.html">[еда]</a>
    <a href="about.html">[о себе]</a>
  </nav>
`;

document.getElementById("sidebar").innerHTML = menu;
document.getElementById("footer").innerHTML = `<small>pilmeha // 2026</small>`;

// Автоматически подсвечиваем активную ссылку по адресу текущей страницы
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("#sidebar nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
