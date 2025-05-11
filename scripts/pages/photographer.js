import {photographerTemplate} from  "../templates/photographer.js";
import {mediaTemplate} from  "../templates/media.js";
import {exportForm, displayModal, closeModal} from "../utils/contactForm.js";
import {createMediaFiltre} from "../utils/sortMedia.js";
import {handleLike, updateTotalLikes} from "../utils/like.js";
import {trapFocus} from "../utils/trapFocus.js";


const getPhotographersId = () => new URLSearchParams(window.location.search).get("id");

const photographerId = getPhotographersId();




export const getPhotographerData = async (photographerId) => {
	try {
		const response = await fetch("data/photographers.json");
		if (!response.ok) throw new Error(`Erreur HTTP ! Status: ${response.status}`);
		const data = await response.json();

		const id = Number(photographerId); // convertis en nombre

		const photographer = data.photographers.find(p => p.id === id);
		const media = data.media.filter(m => m.photographerId === id);

		console.log("Médias filtrés :", media);

		return { photographer, media };
	} catch (error) {
		console.error("Erreur lors de la récupération des données :", error);
	}
};


// Sélectionne le body & main
const body = document.querySelector("body");
const main = document.querySelector("main");

// Ajout de d'une div pour le prix et le conteur de like
const priceCounterLikeDiv = document.createElement("div");
priceCounterLikeDiv.classList.add("price_counter_like_div");
body.appendChild(priceCounterLikeDiv);

const counterLikeDiv = document.createElement("div");
counterLikeDiv.classList.add("counter_like_div");
priceCounterLikeDiv.appendChild(counterLikeDiv);

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
chevronLeft.setAttribute("tabindex", 0);
chevronLeft.setAttribute("aria-label", "Revenir au média précédent");
chevronLeft.setAttribute("role", "button");
navigationLeft.appendChild(chevronLeft);

const chevronRight = document.createElement("i");
chevronRight.classList.add("fa-solid", "fa-chevron-right");
chevronRight.id = "chevronRight";
chevronRight.setAttribute("tabindex", 0);
chevronRight.setAttribute("aria-label", "Aller au média suivant");
chevronRight.setAttribute("role", "button");
navigationRight.appendChild(chevronRight);

// Création de l'icône croix 
const cross = document.createElement("i");
cross.classList.add("fa-solid", "fa-xmark");
cross.id ="cross";
cross.setAttribute("tabindex", 0);
cross.setAttribute("aria-label", "Femer la lightbox");
cross.setAttribute("role", "button");
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
			createMediaFiltre(PhotographerData.media);
			PhotographerData.media.forEach((mediaItem, index) => {
				manageMedia(mediaItem, index);

			});
		}
	}
});

export const manageMedia = (mediaItem, index) => {
	const mediaCard = mediaTemplate(mediaItem).getMediaCardDOM(index);
	const mediaContainer = document.querySelector(".media");
	mediaContainer.appendChild(mediaCard);

	handleLike(mediaCard, index);
	updateTotalLikes();

	let currentIndex = 0;
	const mediaElements = document.querySelectorAll(".media-img, .media-video");

	const updateLightboxMedia = (mediaElement) => {
		lightboxMedia.innerHTML = "";

		let newContent;
		if (mediaElement.tagName === "IMG") {
			const altText = mediaElement.alt;
			newContent = `<img src="${mediaElement.src}" alt="${altText}" class="lightbox-img" tabindex="0" aria-label="Image intitulée : ${altText}">`;
			lightboxCaption.innerText = altText;
		} else if (mediaElement.tagName === "VIDEO") {
			const videoAlt = mediaElement.getAttribute("data-alt");
			newContent = `<video src="${mediaElement.src}" controls class="lightbox-video" tabindex="0" aria-label="Vidéo intitulée : ${videoAlt}"></video>`;
			lightboxCaption.innerText = videoAlt;
		}

		lightboxMedia.innerHTML = newContent;
		lightboxMedia.appendChild(lightboxCaption);
	};

	const openLightbox = (event) => {
		const clickedMedia = event.target;
		currentIndex = parseInt(clickedMedia.getAttribute("data-index"));
		updateLightboxMedia(clickedMedia);
		lightboxModal.style.display = "flex";
		trapFocus(lightboxModal);
	};

	const navigateLightbox = (event) => {
		const isLeft = event.target.id === "chevronLeft";
		currentIndex = isLeft ? currentIndex - 1 : currentIndex + 1;
		if (currentIndex < 0) currentIndex = mediaElements.length - 1;
		if (currentIndex >= mediaElements.length) currentIndex = 0;
		updateLightboxMedia(mediaElements[currentIndex]);
	};

	const closeLightbox = () => {
		lightboxModal.style.display = "none";
		document.removeEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") navigateLightbox({ target: { id: "chevronLeft" } });
			if (e.key === "ArrowRight") navigateLightbox({ target: { id: "chevronRight" } });
			if (e.key === "Escape") closeLightbox();
		});
	};

	mediaElements.forEach(media => {
		media.addEventListener("click", openLightbox);
		media.addEventListener("keydown", (e) => {
			if (e.key === "Enter") openLightbox(e);
		});
	});

	chevronLeft.addEventListener("click", navigateLightbox);
	chevronRight.addEventListener("click", navigateLightbox);
	cross.addEventListener("click", closeLightbox);

	chevronLeft.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			navigateLightbox({ target: { id: "chevronLeft" } });
		}
	});

	chevronRight.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			navigateLightbox({ target: { id: "chevronRight" } });
		}
	});

	cross.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			closeLightbox();
		}
	});
};

// Appel de la fonction exportForm
exportForm();

// Ajout d'un écouteur d'évènement pour remplacer onclick
const openModalButton = document.querySelector(".contact_button");
openModalButton.addEventListener("click", displayModal);

// Ajout d'un écouteur d'évènement pour remplacer onclick
const closeButton = document.querySelector(".close_button");
closeButton.addEventListener("click", closeModal);

