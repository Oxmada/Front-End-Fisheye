export const mediaTemplate = (data) => {
	const { id, photographerId, title, image, video, likes: initialLikes, date, price } = data;

	let mediaElement = image
		? `assets/albums/${photographerId}/${image}`
		: video
			? `assets/albums/${photographerId}/${video}`
			: null;
	if (!mediaElement) {
		console.error("Aucun média (image ou vidéo) trouvé pour", title);
		return;
	}

	const getMediaCardDOM = (index) => {
		const article = document.createElement("article");
		article.classList.add("media-article");

		if (image) {
			const imageElement = document.createElement("img");
			imageElement.setAttribute("src", mediaElement);
			imageElement.setAttribute("alt", `${title}`);
			imageElement.setAttribute("aria-label", `Image intitulée : ${title}`);
			imageElement.setAttribute("data-index", index);
			imageElement.classList.add("media-img");
			imageElement.setAttribute("tabindex", 0);
			article.appendChild(imageElement);
		} else if (video) {
			const videoElement = document.createElement("video");
			videoElement.setAttribute("src", mediaElement);
			videoElement.setAttribute("data-alt", `${title}`);
			videoElement.setAttribute("aria-label", `Vidéo intitulée : ${title}`);
			videoElement.setAttribute("controls", "true");
			videoElement.setAttribute("data-index", index);
			videoElement.classList.add("media-video");
			videoElement.setAttribute("tabindex", 0);
			article.appendChild(videoElement);
		}

		const h2 = document.createElement("h2");
		h2.textContent = title;
		h2.classList.add("media-title");

		let currentLikes = initialLikes;
		const likesText = document.createElement("span");
		likesText.textContent = `${currentLikes}`;

		const p1 = document.createElement("p");
		p1.classList.add("media-likes");
		p1.appendChild(likesText);

		const p2 = document.createElement("p");
		p2.textContent = date;
		p2.classList.add("media-date");

		const p3 = document.createElement("p");
		p3.textContent = price;
		p3.classList.add("media-price");

		const fullHeart = document.createElement("i");
		fullHeart.classList.add("fa-solid", "fa-heart");
		fullHeart.setAttribute("tabindex", 0);
		fullHeart.setAttribute("aria-label", " like");
		fullHeart.setAttribute("role", "button");
		p1.appendChild(fullHeart);

		article.appendChild(h2);
		article.appendChild(p1);
		article.appendChild(p2);
		article.appendChild(p3);

		return article;
	};

	return { id, photographerId, mediaElement, title, likes: initialLikes, date, price, getMediaCardDOM };
};




