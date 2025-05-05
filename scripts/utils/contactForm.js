import { trapFocus } from "./trapFocus.js";

export const exportForm = () => {
	const form = document.querySelector("#contact_modal form");
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const prenom = document.getElementById("prenom").value;
		const nom = document.getElementById("nom").value;
		const email = document.getElementById("email").value;
		const message = document.getElementById("message").value;

		console.log("Prénom:", prenom);
		console.log("Nom:", nom);
		console.log("Email:", email);
		console.log("Message:", message);
	});

	const closeButton = document.querySelector(".close_button");
	closeButton.addEventListener("click", closeModal);
	closeButton.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			closeModal();
		}
	});
};


export const displayModal = () => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	modal.style.position = "fixed";
	modal.style.top = "0";
	modal.style.left = "0";
	modal.style.paddingTop = "100px";
	modal.style.width = "100%";
	modal.style.height = "100%";
	modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	modal.style.zIndex = "1000";

	trapFocus(modal);
};

export const closeModal = () => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
};


