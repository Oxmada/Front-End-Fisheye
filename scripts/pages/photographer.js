function getPhotographersId() {

    // Récupère la partie query de l'url (tout ce qui se trouve après le ?)
    const params = new URLSearchParams(window.location.search);

    // Récupère la valeur du paramètre "id" et la retourne.
    return params.get ("id");
}

const photographerId = getPhotographersId();

// Vérifie si l'ID est bien récupéré
console.log("photographer ID:", photographerId); 