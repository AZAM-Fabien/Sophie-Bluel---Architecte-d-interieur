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

function GenererProjet(projet) {
  for (let i = 0; i < projet.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les projet
    const SectionGalery = document.querySelector(".gallery");
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
    SectionGalery.appendChild(container);
  }
}
GenererProjet(projet);

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
  categories = await reponses.json();
  console.log("dans if avant transformation string");
  console.log(categories);
  // Transformation des categories en JSON
  const categoriesjson = JSON.stringify(categories);
  //   Stockage des informations dans le localStorage
  window.localStorage.setItem("categories", categoriesjson);
} else {
  categories = JSON.parse(categories);
}

function GenererCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.textContent = categories[i].name;
    button.dataset.id = categories[i].id;
    filtre.appendChild(button);
  }
}

GenererCategories(categories);

// Ajout des filtres dans le portfolio
const portfolio = document.querySelector("#portfolio");
const SectionGalery = document.querySelector(".gallery");
portfolio.insertBefore(filtre, SectionGalery);

// trie des projet par filtre
filtre.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const AncienActive = document.querySelector(".active");
    if (AncienActive) AncienActive.classList.remove("active");
    event.target.classList.add("active");

    const id = event.target.dataset.id;
    console.log(id);
    switch (id) {
      case "0":
        SectionGalery.innerHTML = "";
        GenererProjet(projet);
        break;
      case "1":
        SectionGalery.innerHTML = "";
        const projet1 = projet.filter((projet) => projet.categoryId === 1);
        GenererProjet(projet1);
        break;
      case "2":
        SectionGalery.innerHTML = "";
        const projet2 = projet.filter((projet) => projet.categoryId === 2);
        GenererProjet(projet2);
        break;
      case "3":
        SectionGalery.innerHTML = "";
        const projet3 = projet.filter((projet) => projet.categoryId === 3);
        console.log(projet3);
        GenererProjet(projet3);
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

// vérification du login
const token = window.localStorage.getItem("token");
const first36Characters = token.substring(0, 36);
console.log(first36Characters);
if (first36Characters === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9") {
  filtre.innerHTML = "";
  const portfolio = document.querySelector("#portfolio");
  const modifier = document.createElement("div");
  modifier.classList.add("modifier");
  const modifier__text = document.createElement("p");
  const modifier__icon = document.createElement("img");
  modifier__icon.src = "assets/icons/modifier.png";
  modifier__text.innerText = "Modifier";
  modifier.appendChild(modifier__icon);
  modifier.appendChild(modifier__text);
  portfolio.insertBefore(modifier, filtre);
}
