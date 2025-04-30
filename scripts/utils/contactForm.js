export function exportForm () {
    const form = document.querySelector("#contact_modal form");
    form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs du formulaire
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Afficher les valeurs dans la console
    console.log("Prénom:", prenom);
    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Message:", message);
    });
} 

export function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%"; 
    modal.style.height = "100%"; 
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; 
    modal.style.zIndex = "1000"; 
}


export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}