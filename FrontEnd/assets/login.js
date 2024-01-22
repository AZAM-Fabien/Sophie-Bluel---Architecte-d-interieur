const formulaireAvis = document.querySelector(".connexion");

formulaireAvis.addEventListener("submit", async function (event) {
  event.preventDefault();
  // Création de l’objet du nouvel avis.
  const avis = {
    email: event.target.querySelector("[name=E-mail]").value,
    password: event.target.querySelector("[name=password]").value,
  };
  // Création de la charge utile au format JSON
  const chargeUtile = JSON.stringify(avis);
  // Appel de la fonction fetch avec toutes les informations nécessaires
  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: chargeUtile,
    credentials: "omit",
  });

  // Vérification de la réponse de l'API
  const codeErreur = reponse.status;
  if (reponse.ok) {
    const data = await reponse.json();
    console.log(data);
    window.sessionStorage.setItem("token", data.token);
    window.location.href = "../index.html";
  } else {
    const erreur = document.createElement("p");
    erreur.innerText = "Utilisateur introuvable: Email ou mot de passe incorrect";
    const envoie = document.querySelector("input[type=submit]");
    console.log(envoie);
    formulaireAvis.insertBefore(erreur, envoie);
  }

});
