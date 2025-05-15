export const updateTotalLikes = () => {
	const likeElements = document.querySelectorAll(".media-likes span");
	let totalLikes = 0;
	
	likeElements.forEach(likeElement => {
		totalLikes += parseInt(likeElement.textContent);
	});
	
	const counterLikeDiv = document.querySelector(".counter_like_div");
	
	if (counterLikeDiv) {
		counterLikeDiv.innerHTML = "";
	
		const totalLikesText = document.createElement("span");
		totalLikesText.id = "total_like";
		totalLikesText.textContent = `${totalLikes} likes`;
	
		const fullHeart = document.createElement("i");
		fullHeart.classList.add("fa-solid", "fa-heart");
		fullHeart.id = "backFullHeart";
	
		counterLikeDiv.appendChild(totalLikesText);
		counterLikeDiv.appendChild(fullHeart);
	} else {
		console.error("counterLikeDiv introuvable !");
	}
	
	return totalLikes;
};
	
export const handleLike = (mediaCard) => {
	const fullHeart = mediaCard.querySelector(".fa-heart");
	const likesText = mediaCard.querySelector(".media-likes span");
	let isClicked = false;
	
	const incrementLikes = () => {
		if (!isClicked) {
			let currentLikes = parseInt(likesText.textContent);
			likesText.textContent = ++currentLikes;
			updateTotalLikes();
			isClicked = true;
		}
	};
	
	fullHeart.addEventListener("click", incrementLikes);
	fullHeart.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			incrementLikes();
		}
	});
};
	