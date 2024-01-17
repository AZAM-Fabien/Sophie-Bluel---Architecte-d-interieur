const modal = document.querySelector("#menu-projets");

const openModal = (e) => {
  e.preventDefault();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("mousedown", closeModal);
  modal.querySelector("#close-modal").addEventListener("mousedown", closeModal);
  modal
    .querySelector(".modal-stop")
    .addEventListener("mousedown", stopPropagation);
};

const closeModal = (e) => {
  e.preventDefault();
  modal.style.display = "none";
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
  carré.dataset.id = figure.getAttribute("data-id");
  const poubelle = document.createElement("img");
  poubelle.src = "assets/icons/trash-can-solid.png";
  poubelle.classList.add("poubelle");
  carré.appendChild(poubelle);
  figure.appendChild(carré);
});

const carré = document.querySelectorAll(".carré");
carré.forEach((carré) => {
  carré.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = carré.dataset.id;
    const token = window.localStorage.getItem("token");
    console.log(token);
    console.log(id);
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "omit",
    });
    if (reponse.ok) {
      console.log("suppression");
    }
    console.log(reponse);
    console.log(`Authorization: Bearer ${token}`);
  });
});
