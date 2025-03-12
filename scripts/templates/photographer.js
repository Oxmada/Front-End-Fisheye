function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", `Voir le profil de ${name}`);
        link.classList.add("photographer-link");


        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de profil");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);

        const p1 = document.createElement('p');
        p1.textContent = `${city}, ${country}`;
        p1.classList.add('location');

        const p2 = document.createElement('p');
        p2.textContent = tagline;

        const p3 = document.createElement('p');
        p3.textContent = `${price}€/jour`;
        p3.classList.add('price');

        article.appendChild(link);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3)

        return (article);
    }
    return { name, id, picture, city, country, tagline, price, getUserCardDOM }
}