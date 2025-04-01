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

    console.log("Médias filtrés :", media);

    return {
      photographer,
      media,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Sélectionne le body & main
const body = document.querySelector("body");
const main = document.querySelector("main");

// Ajout de d'une div pour le prix et le conteur de like
const priceCounterLikeDiv = document.createElement("div");
priceCounterLikeDiv.classList.add("price_counter_like_div");
body.appendChild(priceCounterLikeDiv);


// Ajout d'une div mediaFiltre
const mediaFiltre = document.createElement("div");
mediaFiltre.classList.add("media-filtre");
main.appendChild(mediaFiltre);

// Ajout du label
const label = document.createElement("label");
label.setAttribute("for", "mySelect");
label.textContent = "Trier par ";
label.classList.add("labelSelect")

// Ajout du select
const select = document.createElement("select");
select.setAttribute("id", "mySelect");

// Création des options dans un tableau
const options = [
    {text: "Popularité", value: "popularity"},
    {text: "Date", value: "date"},
    {text: "Titre", value: "title"}
];

// Ajout des options au select
options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option.text;
    optionElement.value = option.value;
    select.appendChild(optionElement);
});

// Ajout du label et du select au conteneur mediaFiltre
mediaFiltre.appendChild(label);
mediaFiltre.appendChild(select);


// Ajout d'une div media
const media = document.createElement("div");
media.classList.add("media");
main.appendChild(media);

// Ajout de la div lightboxModal
const lightboxModal = document.createElement("div");
lightboxModal.classList.add("lightbox-modal");
body.appendChild(lightboxModal);

// Ajout de la div modalContainer
const modalContainer = document.createElement("div");
modalContainer.classList.add("modalContainer");
lightboxModal.appendChild(modalContainer);


// Ajout de la div navigationLeft
const navigationLeft = document.createElement("div");
navigationLeft.classList.add("navigation-left");
modalContainer.appendChild(navigationLeft);


// // Ajout de la div modal-media
// const modalMedia = document.createElement("div");
// modalMedia.classList.add("modal-media");
// modalContainer.appendChild(modalMedia);


// Création de l'élément multimédia
const lightboxMedia = document.createElement("div");
lightboxMedia.id = "lightboxMedia";
modalContainer.appendChild(lightboxMedia);

// Ajout de la div navigationRight
const navigationRight = document.createElement("div");
navigationRight.classList.add("navigation-right");
modalContainer.appendChild(navigationRight);

// Création des icônes de chevron
const chevronLeft = document.createElement("i");
chevronLeft.classList.add("fa-solid", "fa-chevron-left");
chevronLeft.id = "chevronLeft";
navigationLeft.appendChild(chevronLeft);

const chevronRight = document.createElement("i");
chevronRight.classList.add("fa-solid", "fa-chevron-right");
chevronRight.id = "chevronRight"
navigationRight.appendChild(chevronRight);

// Création de l'icône croix 
const cross = document.createElement("i");
cross.classList.add("fa-solid", "fa-xmark");
cross.id ="cross"
navigationRight.appendChild(cross);

// Création de la légende lightboxCaption
const lightboxCaption = document.createElement("div");
lightboxCaption.id = "lightboxCaption";
lightboxCaption.classList.add("caption");
lightboxMedia.appendChild(lightboxCaption);



// Récupère la promesse retournée par la fonction getPhotographerData
getPhotographerData(photographerId).then((PhotographerData) => {
  if (PhotographerData && PhotographerData.photographer) {
    const photographerCard = photographerTemplate(
      PhotographerData.photographer
    ).getUserCardDOM();

    const parentElement = document.querySelector(".photograph-header");

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

    // Insère img dans photographer-header
    const img = photographerCard.querySelector(".photographer-img");
    parentElement.appendChild(img);

    // Insère à nouveau button dans photographer-header de manière à le déplacer dans l'ordre du DOM
    const button = document.querySelector(".contact_button");
    parentElement.appendChild(button);

    // Sélectionne et insère price dans la div priceCounterLikeDiv
    const price = photographerCard.querySelector(".price");
    priceCounterLikeDiv.appendChild(price);

    parentElement.appendChild(photographerCard);

    // Afiche les médias associés au photographe
    if (PhotographerData.media) {
      PhotographerData.media.forEach((mediaItem, index) => {
        const mediaCard = mediaTemplate(mediaItem).getMediaCardDOM(index);
        const mediaContainer = document.querySelector(".media");
        mediaContainer.appendChild(mediaCard);

        // Initialise l'index sur 0
        let currentIndex = 0;


        // Récupère les images et kes vidéos
        const mediaElements = document.querySelectorAll(".media-img, .media-video");

        // Ajout d'un écouteur d'événements à chaque images
        mediaElements.forEach(media => {
          media.addEventListener("click", openLightbox);
        });

        // Ajout d'un écouter d'évènements
        cross.addEventListener("click", closeLightbox);

        // Ajout d'écouteurs d'événements pour les chevrons
        chevronLeft.addEventListener("click", navigateLightbox);
        chevronRight.addEventListener("click", navigateLightbox);

        function updateLightboxMedia(mediaElement) {
          lightboxMedia.innerHTML = ""; // Supprime l'ancien média

          let newContent;
          if (mediaElement.tagName === "IMG") {
            newContent = `<img src="${mediaElement.src}" alt="${mediaElement.alt}" class="lightbox-img">`;
          } else if (mediaElement.tagName === "VIDEO") {
            const videoAlt = mediaElement.getAttribute('data-alt'); // Récupère l'attribut data-al
            newContent = `<video src="${mediaElement.src}" controls class="lightbox-video" data-alt="${videoAlt}"></video>`;
          }
          lightboxMedia.innerHTML = newContent;
          lightboxMedia.appendChild(lightboxCaption);

         // Mettre à jour la légende avec la valeur appropriée
          if (mediaElement.tagName === "IMG") {
            lightboxCaption.innerText = mediaElement.alt;
          } else if (mediaElement.tagName === "VIDEO") {
            lightboxCaption.innerText = mediaElement.getAttribute('data-alt');
          }

        }

        function openLightbox(event) {
          const clickedMedia = event.target;
          currentIndex = parseInt(clickedMedia.getAttribute("data-index"));

          updateLightboxMedia(clickedMedia);
          lightboxModal.style.display = "flex";
        }

        function navigateLightbox(event) {
          const isLeft = event.target.id === "chevronLeft";
          currentIndex = isLeft ? currentIndex - 1 : currentIndex + 1;

          // Vérifie les limites
          if (currentIndex < 0) currentIndex = mediaElements.length - 1;
          if (currentIndex >= mediaElements.length) currentIndex = 0;

          updateLightboxMedia(mediaElements[currentIndex]);
        }

        function closeLightbox() {
          lightboxModal.style.display = "none";
        }
      });
    }

  }
});



