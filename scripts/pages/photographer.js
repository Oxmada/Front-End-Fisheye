function getPhotographersId() {

    // Récupère la partie query de l'url (tout ce qui se trouve après le ?)
    const params = new URLSearchParams(window.location.search);

    // Récupère la valeur du paramètre "id" et la retourne.
    return params.get ("id");
}

const photographerId = getPhotographersId();

// Vérifie si l'ID est bien récupéré
console.log("photographer ID:", photographerId); 

async function getPhotographerData(photographerId) {
    try {
        // Récupère les informations du photographe et ses médias associés
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Status: ${response.status}`);
        }
        const data = await response.json();

        // Trouve le photographe par ID
        const photographer = data.photographers.find(photographer => photographer.id == photographerId);

        // Filtre les médias associés au photographe
        const media = data.media.filter(item => item.photographerId == photographerId);

        return {
            photographer,
            media
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Récupère la promesse retournée par la fonction getPhotographerData
getPhotographerData(photographerId).then(PhotographerData => {

    //Affiche les données du photographe et ses médias
    console.log("photographer Data:", PhotographerData);
});