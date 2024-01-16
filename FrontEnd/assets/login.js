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
    window.localStorage.setItem("token", data.token);
    window.location.href = "../index.html";
  } else if (codeErreur === 404) {
    alert("email incorect ou inexistant");
  } else if (codeErreur === 401) {
    alert("mot de passe incorect");
  }
});
