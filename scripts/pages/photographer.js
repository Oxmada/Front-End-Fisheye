function getPhotographersId() {
  // Récupère la partie query de l'url (tout ce qui se trouve après le ?)
  const params = new URLSearchParams(window.location.search);

  // Récupère la valeur du paramètre "id" et la retourne.
  return params.get("id");
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
    const photographer = data.photographers.find(
      (photographer) => photographer.id == photographerId
    );

    // Filtre les médias associés au photographe
    const media = data.media.filter(
      (item) => item.photographerId == photographerId
    );

    return {
      photographer,
      media,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Récupère la promesse retournée par la fonction getPhotographerData
getPhotographerData(photographerId).then((PhotographerData) => {
  if (PhotographerData && PhotographerData.photographer) {
    const photographerCard = photographerTemplate(
      PhotographerData.photographer
    ).getUserCardDOM();

    // Sélectionne la balise <a>
    const link = photographerCard.querySelector(".photographer-link");
    if (link) {
      // Déplace les enfants de <a> vers le parent de <a>
      while (link.firstChild) {
        link.parentNode.insertBefore(link.firstChild, link);
      }

      // Supprime la balise <a> qui est maintenant vide
      link.remove();
    }

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-div");
    photographerCard.appendChild(infoDiv);

    const name = photographerCard.querySelector(".name");
    if (name) {
      infoDiv.appendChild(name);
    }

    const location = photographerCard.querySelector(".location");
    if (location) {
      infoDiv.appendChild(location);
    }

    const tagline = photographerCard.querySelector(".tagline");
    if (tagline) {
      infoDiv.appendChild(tagline);
    }

    const priceCounterLikeDiv = document.createElement("div");
    priceCounterLikeDiv.classList.add("price_counter_like_div");
    const main = document.querySelector("main");
    main.appendChild(priceCounterLikeDiv);
    const price = photographerCard.querySelector(".price");
    priceCounterLikeDiv.appendChild(price);

    // Sélectionne .photograph-header
    const parentElement = document.querySelector(".photograph-header");
    if (parentElement) {
      parentElement.appendChild(photographerCard);
    }
  }
});
