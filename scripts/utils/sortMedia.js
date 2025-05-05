import {manageMedia} from "../pages/photographer.js";

export const createMediaFiltre = (allMedia) => {
  const mediaFiltre = document.querySelector(".media-filtre");

  const label = document.createElement("label");
  label.setAttribute("for", "mySelect");
  label.textContent = "Trier par ";
  label.classList.add("labelSelect");

  const select = document.createElement("select");
  select.setAttribute("id", "mySelect");

  const options = [
    { text: "Popularité", value: "popularity" },
    { text: "Date", value: "date" },
    { text: "Titre", value: "title" }
  ];

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option.text;
    optionElement.value = option.value;
    select.appendChild(optionElement);
  });

  mediaFiltre.appendChild(label);
  mediaFiltre.appendChild(select);

  select.addEventListener("change", () => {
    const selectedValue = select.value;
    sortAndDisplayMedia(allMedia, selectedValue);
  });
};

export const sortAndDisplayMedia = (allMedia, criteria) => {
  let sortedData;

  switch (criteria) {
    case "popularity":
      sortedData = [...allMedia].sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      sortedData = [...allMedia].sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "title":
      sortedData = [...allMedia].sort((a, b) => {
        if (typeof a.title === "string" && typeof b.title === "string") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      break;
    default:
      sortedData = allMedia;
  }

  displayMedia(sortedData);
};

export const displayMedia = (data) => {
  document.querySelector(".media").innerHTML = "";

  console.log(data);

  data.forEach((mediaItem, index) => {
    manageMedia(mediaItem, index);
  });
};
