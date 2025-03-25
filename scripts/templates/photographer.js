function photographerTemplate(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil de ${name}`);
    link.classList.add("photographer-link");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Profil de ${name}`);
    img.classList.add("photographer-img");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("name");
    h2.setAttribute("aria-label", `Nom du photographe : ${name}`);

    link.appendChild(img);
    link.appendChild(h2);

    const p1 = document.createElement("p");
    p1.textContent = `${city}, ${country}`;
    p1.classList.add("location");

    const p2 = document.createElement("p");
    p2.textContent = tagline;
    p2.classList.add("tagline");

    const p3 = document.createElement("p");
    p3.textContent = `${price}€/jour`;
    p3.classList.add("price");

    article.appendChild(link);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);

    return article;
  }
  return {name, id, picture, city, country, tagline, price, getUserCardDOM};
}


function mediaTemplate(data) {
  const { id, photographerID, title, image, likes, date, price } = data;

  const mediaPicture = `assets/images/${image}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-article");

    const img = document.createElement("img");
    img.setAttribute("src", mediaPicture);
    img.setAttribute("alt", `Image intitulée "${title}" par ${photographerName}`)
    img.classList.add("media-img");

    const h2 = document.createElement("h2");
    h2.textContent = title;
    h2.classList.add("media-title");

    const p1 = document.createElement("p");
    p1.textContent = `Likes: ${likes}`;
    p1.classList.add(media-likes);

    const p2 = document.createElement("p");
    p2.textContent = `Date: ${new Date(date).toLocaleDateString()}`;
    p2.classList.add(media-date);

    const p3 = document.createElement("p");
    p3.textContent = `${price}€`;
    p3.classList.add("media-price");

    article.appendChild(img);
    article.appendChild("h2");
    article.appendChild("p1");
    article.appendChild("p2");
    article.appendChild("p3");

    return article;
  }

  return {id, photographerID, mediaPicture, title, likes, date, price, getMediaCardDOM};
}

