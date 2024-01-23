// récupération des différents projetrecupererProjet
//Récupération des projet stockées dans le sessionStorage

export async function recupererProjet() {
  let projet;
  try {
    // Récupération des projet depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    projet = await reponse.json();
    console.log(projet);
    // Transformation des projet en JSON
    const projetjson = JSON.stringify(projet);
    // Stockage des informations dans le sessionStorage
    window.sessionStorage.setItem("projet", projetjson);
  } catch {
    projet = JSON.parse(window.sessionStorage.getItem("projet"));
  }

  return projet;
}

const projet = await recupererProjet();
console.log(projet);

export function GenererProjet(projet, location) {
  for (let i = 0; i < projet.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les projet
    const SectionGalery = document.querySelector(location);
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
GenererProjet(projet, ".galerie");

// Affichage des projet dans la modal
GenererProjet(projet, "#photo-modal");

// Création de la balise filtre
const filtre = document.createElement("div");
filtre.classList.add("filtre");

// Création du filtre tous
const button = document.createElement("button");
button.textContent = "Tous";
button.dataset.id = 0;
filtre.appendChild(button);

// génération des filtres
// Récuparation des categories depuis l'api ou stockées dans le sessionStorage
export async function recupererCategories() {
  let categories;
  try {
    //   Récupération des categories depuis l'API
    const reponses = await fetch("http://localhost:5678/api/categories");
    categories = await reponses.json();
    // Transformation des categories en JSON
    const categoriesjson = JSON.stringify(categories);
    //   Stockage des informations dans le sessionStorage
    window.sessionStorage.setItem("categories", categoriesjson);
  } catch {
    categories = JSON.parse(window.sessionStorage.getItem("categories"));
  }
  return categories;
}

const categories = await recupererCategories();

// Affichage des filtres
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
const SectionGalery = document.querySelector(".galerie");
portfolio.insertBefore(filtre, SectionGalery);

// trie des projet par filtre
filtre.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const AncienActive = document.querySelector(".active");
    if (AncienActive) AncienActive.classList.remove("active");
    event.target.classList.add("active");

    const id = event.target.dataset.id;
    switch (id) {
      case "0":
        SectionGalery.innerHTML = "";
        GenererProjet(projet, ".galerie");
        break;
      case "1":
        SectionGalery.innerHTML = "";
        const projet1 = projet.filter((projet) => projet.categoryId === 1);
        GenererProjet(projet1, ".galerie");
        break;
      case "2":
        SectionGalery.innerHTML = "";
        const projet2 = projet.filter((projet) => projet.categoryId === 2);
        GenererProjet(projet2, ".galerie");
        break;
      case "3":
        SectionGalery.innerHTML = "";
        const projet3 = projet.filter((projet) => projet.categoryId === 3);
        GenererProjet(projet3, ".galerie");
        break;
    }
  }
});

//bouton projet
const boutonProjet = document.querySelector("nav ul li:nth-child(1)");
boutonProjet.addEventListener("click", () => {
  window.location.href = "#portfolio";
});

//bouton contact
const boutonContact = document.querySelector("nav ul li:nth-child(2)");
boutonContact.addEventListener("click", () => {
  window.location.href = "#contact";
});

// bouton login
const login = document.querySelector("#login");

login.addEventListener("click", () => {
  window.location.href = "login/login.html";
});

// vérification du login
const token = window.sessionStorage.getItem("token");
if (token) {
  const first36Characters = token.substring(0, 36);
  if (first36Characters === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9") {
    // ajout modifier suppression filtre
    filtre.innerHTML = "";

    const portfolio = document.querySelector("#portfolio");
    const modifier = document.createElement("div");
    modifier.classList.add("modifier");
    modifier.href = "#menu-projet";
    const modifier__text = document.createElement("p");
    const modifier__icon = document.createElement("img");
    modifier__icon.src = "assets/icons/modifier.png";
    modifier__text.innerText = "Modifier";
    modifier.appendChild(modifier__icon);
    modifier.appendChild(modifier__text);
    portfolio.insertBefore(modifier, filtre);

    // afficher bandeau noir pour dire que l'utilisateur est connecté
    const bandeau = document.createElement("div");
    bandeau.classList.add("bandeau");
    const modeEdition__text = document.createElement("p");
    modeEdition__text.innerText = "Mode Edition";
    const modeEdition__icon = document.createElement("img");
    modeEdition__icon.src = "assets/icons/modifier--blanc.png";
    bandeau.appendChild(modeEdition__icon);
    bandeau.appendChild(modeEdition__text);

    const header = document.querySelector("header");
    const body = document.querySelector("body");
    body.insertBefore(bandeau, header);
  }
}
