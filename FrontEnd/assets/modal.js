const modal = document.querySelector("#menu-projets");
const modal_content1 = document.querySelector(".modal-content--1");
const modal_content2 = document.querySelector(".modal-content--2");

const openModal = (e) => {
  e.preventDefault();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("mousedown", closeModal);
  modal
    .querySelector("#close-modal-1")
    .addEventListener("mousedown", closeModal);
  modal
    .querySelector("#close-modal-2")
    .addEventListener("mousedown", closeModal);
  modal
    .querySelector(".modal-stop1")
    .addEventListener("mousedown", stopPropagation);
  modal
    .querySelector(".modal-stop2")
    .addEventListener("mousedown", stopPropagation);
};

const closeModal = (e) => {
  e.preventDefault();
  console.log("close");
  modal_content1.style.display = "flex";
  modal_content2.style.display = "none";
  modal.style.display = "none";
  output.innerHTML = ""; //Effacer le message d'erreur
  output.style.display = "none"; //Cacher le message d'erreur
  const elements = document.querySelectorAll(
    "#filediv > :not(input[type='file'])"
  );
  elements.forEach((element) => {
    element.style.display = "block";
  });
  document.querySelector("#image_preview").style.display = "none"; // Effacer l'image prévisualisée
  document.querySelector("#files").value = null; // Effacer le fichier sélectionné
  document.querySelector("#title").value = ""; // Effacer le titre
  document.querySelector("#selectCategory").value = ""; // Effacer la catégorie sélectionnée
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("mousedown", closeModal);
};

const stopPropagation = (e) => {
  e.stopPropagation();
};

const bonton = document.querySelector(".modifier");
if (bonton) {
  bonton.addEventListener("click", openModal);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// suppression des figcaption dans la modal
function styleimg() {
  const figcaptions = document.querySelectorAll(".modal figcaption");
  figcaptions.forEach((figcaption) => {
    figcaption.remove();
  });
  // ajout icon poubelle sur chaque image dans la modal
  const figure = document.querySelectorAll(".modal figure");
  figure.forEach((figure) => {
    const poubelle = document.createElement("img");
    poubelle.dataset.id = figure.getAttribute("data-id");
    poubelle.src = "assets/icons/trash-can-solid.png";
    poubelle.classList.add("poubelle");
    figure.appendChild(poubelle);
  });
}
styleimg();

import { GenererProjet, recupererProjet } from "./projet.js";

const poubelle = document.querySelectorAll(".poubelle");

document.querySelector("#photo-modal").addEventListener("click", async (e) => {
  if (e.target.classList.contains("poubelle")) {
    console.log("click");
    e.preventDefault();
    const id = e.target.dataset.id;
    const token = window.sessionStorage.getItem("token");
    try {
      const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (reponse.ok) {
        const suppression = reponse.ok;
        window.sessionStorage.setItem(
          "suppression",
          JSON.stringify(suppression)
        );
        window.sessionStorage.removeItem("projet");
        const projet = await recupererProjet();
        document.querySelector(".galerie").innerHTML = "";
        document.querySelector("#photo-modal").innerHTML = "";
        GenererProjet(projet, ".galerie");
        GenererProjet(projet, "#photo-modal");
        styleimg();
      }
    } catch (error) {
      console.error(error);
    }
  }
});

const ajoutphoto = document.querySelector("#ajout-photo");

ajoutphoto.addEventListener("click", () => {
  modal_content1.style.display = "none";
  modal_content2.style.display = "flex";
});
// 2eme modale

const rollback = document.querySelector("#rollback");
rollback.addEventListener("click", () => {
  modal_content1.style.display = "flex";
  modal_content2.style.display = "none";
  output.innerHTML = ""; //Effacer le message d'erreur
  output.style.display = "none"; //Cacher le message d'erreur
  const elements = document.querySelectorAll(
    "#filediv > :not(input[type='file'])"
  );
  elements.forEach((element) => {
    element.style.display = "block";
  });
  document.querySelector("#image_preview").style.display = "none"; // Effacer l'image prévisualisée
  document.querySelector("#files").value = null; // Effacer le fichier sélectionné
  document.querySelector("#title").value = ""; // Effacer le titre
  document.querySelector("#selectCategory").value = ""; // Effacer la catégorie sélectionnée
});

const selectCatégorie = document.querySelector("#selectCategory");
const categories = window.sessionStorage.getItem("categories");

for (let i = 0; i < JSON.parse(categories).length; i++) {
  const option = document.createElement("option");
  option.value = JSON.parse(categories)[i].id;
  option.innerHTML = `${JSON.parse(categories)[i].name}`;

  selectCatégorie.appendChild(option);
}

const photoModal = document.querySelector("#photo-modal");

document.getElementById("files").onchange = function (event) {
  const elements = document.querySelectorAll("#filediv > :nth-child(1n)");
  elements.forEach((element) => {
    element.style.display = "none";
  });

  const image = document.getElementById("image_preview");
  image.src = window.URL.createObjectURL(event.target.files[0]);
  image.style.display = "block";
};

const filesInput = document.getElementById("files");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("selectCategory");

const submitButton = document.getElementById("submit");

function checkValidityAndAddClass() {
  if (
    filesInput.validity.valid &&
    titleInput.validity.valid &&
    categoryInput.validity.valid
  ) {
    submitButton.classList.add("submit-modal");
    output.innerHTML = ""; //Effacer le message d'erreur
    output.style.display = "none"; //Cacher le message d'erreur
  } else {
    submitButton.classList.remove("submit-modal");
  }
}

filesInput.addEventListener("input", checkValidityAndAddClass);
titleInput.addEventListener("input", checkValidityAndAddClass);
categoryInput.addEventListener("input", checkValidityAndAddClass);

const form = document.forms.namedItem("fileinfo");
const output = document.querySelector("#output-API");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData();
  const token = window.sessionStorage.getItem("token");

  formData.append("image", filesInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categoryInput.value);

  if (!filesInput.files[0]) {
    output.style.display = "block";
    output.innerHTML = "Veuillez sélectionner un fichier.";
    return;
  }

  if (!titleInput.value) {
    output.style.display = "block";
    output.innerHTML = "veuillez ajouter un titre.";
    return;
  }

  if (!categoryInput.value) {
    output.style.display = "block";
    output.innerHTML = "veuillez ajouter une categorie.";
    return;
  }

  // Affichage des informations du formulaire dans console
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const reponse = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  reponse.onload = () => {
    output.innerHTML =
      reponse.status === 201
        ? "Fichier téléversé !"
        : `Erreur ${reponse.status} lors de la tentative de téléversement du fichier.<br />`;
  };

  if (reponse.status === 201) {
    console.log("Fichier téléversé ! dans l'api");

    // vide les inputs/select et efface le message d'erreur
    output.innerHTML = ""; //Effacer le message d'erreur
    output.style.display = "none"; //Cacher le message d'erreur
    const elements = document.querySelectorAll(
      "#filediv > :not(input[type='file'])"
    );
    elements.forEach((element) => {
      element.style.display = "block";
    });
    document.querySelector("#image_preview").style.display = "none"; // Effacer l'image prévisualisée
    document.querySelector("#files").value = null; // Effacer le fichier sélectionné
    document.querySelector("#title").value = ""; // Effacer le titre
    document.querySelector("#selectCategory").value = ""; // Effacer la catégorie sélectionnée

    // Récupération des projet depuis l'API
    window.sessionStorage.removeItem("projet");
    const projet = await recupererProjet();
    document.querySelector(".galerie").innerHTML = "";
    document.querySelector("#photo-modal").innerHTML = "";
    GenererProjet(projet, ".galerie");
    GenererProjet(projet, "#photo-modal");
    styleimg();
  }
});
