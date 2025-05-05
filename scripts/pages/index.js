import {photographerTemplate} from  "../templates/photographer.js";

const getPhotographers = async () => {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.photographers || !Array.isArray(data.photographers)) {
      throw new Error("Les données récupérées ne contiennent pas un tableau de photographes.");
    }

    return { photographers: data.photographers };
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes:", error);
    return { photographers: [] };
  }
};

const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

const init = async () => {
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();

