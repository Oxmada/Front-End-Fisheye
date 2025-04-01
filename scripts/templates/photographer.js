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
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let mediaElement;

  if (image) {
    mediaElement = `assets/albums/${photographerId}/${image}`;
  } else if (video) {
    mediaElement = `assets/albums/${photographerId}/${video}`;
  } else {
    console.error("Aucun média (image ou vidéo) trouvé pour", title);
    return;
  }

  function getMediaCardDOM(index) {
    const article = document.createElement("article");
    article.classList.add("media-article");

    // Créer l'élément multimédia image ou vidéo

    if (image) {
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", mediaElement);
    imageElement.setAttribute("alt", `${title}`)
    imageElement.setAttribute("data-index", index);
    imageElement.classList.add("media-img");
    article.appendChild(imageElement);
    } else if (video){
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", mediaElement);
      videoElement.setAttribute("data-alt", `${title}`);
      videoElement.setAttribute("controls", "true");
      videoElement.setAttribute("data-index", index);
      videoElement.classList.add("media-video");
      article.appendChild(videoElement);
    }

    const h2 = document.createElement("h2");
    h2.textContent = title;
    h2.classList.add("media-title");

    const p1 = document.createElement("p");
    p1.textContent = likes;
    p1.classList.add("media-likes");

    const p2 = document.createElement("p");
    p2.textContent = date;
    p2.classList.add("media-date");

    const p3 = document.createElement("p");
    p3.textContent = price;
    p3.classList.add("media-price");

    
    const fullHeart = document.createElement("i");
    fullHeart.classList.add("fa-solid", "fa-heart");

    p1.appendChild(fullHeart);

    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);

    return article;
  }

  return {id, photographerId, mediaElement, title, likes, date, price, getMediaCardDOM};
}

