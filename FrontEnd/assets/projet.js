// récupération des différents projet
//Récupération des projet stockées dans le localStorage
let projet = window.localStorage.getItem("projet");

if (projet === null) {
  // Récupération des projet depuis l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  projet = await reponse.json();
  // Transformation des projet en JSON
  const projetjson = JSON.stringify(projet);
  // Stockage des informations dans le localStorage
  window.localStorage.setItem("projet", projetjson);
} else {
  projet = JSON.parse(projet);
}

function generer_projet(projet) {
  for (let i = 0; i < projet.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les projet
    const section_galery = document.querySelector(".gallery");
    // Création d’une balise dédiée a chaque projet
    const container = document.createElement("figure");
    container.dataset.id = projet[i].id;
    // création de la balise img
    const img = document.createElement("img");
    img.src = projet[i].imageUrl;
    img.alt = projet[i].title;
    // Ajout du titre de chaque projet
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = projet[i].title;
    // Ajout de la balise img dans la balise figure
    container.appendChild(img);
    // Ajout de la balise figcaption dans la balise figure
    container.appendChild(figcaption);
    // Ajout de la balise figure dans la section
    section_galery.appendChild(container);
  }
}
generer_projet(projet);

// Création de la balise filtre
const filtre = document.createElement("div");
filtre.classList.add("filtre");

// Création du filtre tous
const button = document.createElement("button");
button.textContent = "Tous";
button.dataset.id = 0;
filtre.appendChild(button);

// génération des filtres
let categories = window.localStorage.getItem("categories");
if (categories === null) {
  //   Récupération des categories depuis l'API
  const reponses = await fetch("http://localhost:5678/api/categories");
  const categories = await reponses.json();
  // Transformation des categories en JSON
  const categoriesjson = JSON.stringify(categories);
  //   Stockage des informations dans le localStorage
  window.localStorage.setItem("categories", categoriesjson);
} else {
  categories = JSON.parse(categories);
}

function generer_categories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.textContent = categories[i].name;
    button.dataset.id = categories[i].id;
    filtre.appendChild(button);
  }
}
generer_categories(categories);

// Ajout des filtres dans le portfolio
const portfolio = document.querySelector("#portfolio");
const section_galery = document.querySelector(".gallery");
portfolio.insertBefore(filtre, section_galery);

// trie des projet par filtre
filtre.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const ancien_active = document.querySelector(".active");
    if (ancien_active) ancien_active.classList.remove("active");
    event.target.classList.add("active");

    const id = event.target.dataset.id;
    console.log(id);
    switch (id) {
      case "0":
        section_galery.innerHTML = "";
        generer_projet(projet);
        break;
      case "1":
        section_galery.innerHTML = "";
        const projet1 = projet.filter((projet) => projet.categoryId === 1);
        generer_projet(projet1);
        break;
      case "2":
        section_galery.innerHTML = "";
        const projet2 = projet.filter((projet) => projet.categoryId === 2);
        generer_projet(projet2);
        break;
      case "3":
        section_galery.innerHTML = "";
        const projet3 = projet.filter((projet) => projet.categoryId === 3);
        console.log(projet3);
        generer_projet(projet3);
        break;
    }
  }
});

// bouton login
const login = document.querySelector("#login");

login.addEventListener("click", () => {
  console.log("login");
  window.location.href = "login/login.html";
});
