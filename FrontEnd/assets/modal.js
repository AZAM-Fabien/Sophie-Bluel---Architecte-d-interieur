const modal = document.querySelector("#menu-projets");

const openModal = (e) => {
  e.preventDefault();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector("#close-modal").addEventListener("click", closeModal);
  modal.querySelector(".modal-stop").addEventListener("click", stopPropagation);
};

const closeModal = (e) => {
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
};

const stopPropagation = (e) => {
  e.stopPropagation();
};

const bonton = document.querySelector(".modifier");
console.log(bonton);
bonton.addEventListener("click", openModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});


// ajout icon poubelle
// suppression des figcaption dans la modal
const figcaptions = document.querySelectorAll(".modal figcaption");
figcaptions.forEach((figcaption) => {
  figcaption.remove();
});
// ajout icon poubelle sur chaque image dans la modal
const figure = document.querySelectorAll(".modal figure");
figure.forEach((figure) => {
  const carré = document.createElement("div");
  carré.classList.add("carré");
  const poubelle = document.createElement("img");
  poubelle.src = "assets/icons/trash-can-solid.png";
  poubelle.classList.add("poubelle");
  carré.appendChild(poubelle);
  figure.appendChild(carré);
});