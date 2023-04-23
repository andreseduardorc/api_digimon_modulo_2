const digimonCard = document.getElementById("digimonCard");
const templateCard = document.getElementById("template-card");
let allDigimon = [];

fetch("https://digimon-api.vercel.app/api/digimon")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Error al obtener datos de la API");
  })
  .then((data) => {
    allDigimon = data;

    showDigimonCards(allDigimon);
  })
  .catch((error) => {
    console.log(error.message);
  });

// funcion busqueda

document
  .getElementById("searchBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const digimonName = document.getElementById("datosDigimon").value.toLowerCase();

    const foundDigimon = allDigimon.find((digimon) =>
      digimon.name.toLowerCase() === digimonName
    );

    if (foundDigimon) {
      showDigimonCards([foundDigimon]);
    } else {
      alert(`No se encontró ningún digimon llamado "${digimonName}"`);
    }
  });

//  funcion volver
document.getElementById("backBtn").addEventListener("click", function () {
  document
    .getElementById("datosDigimon")
    .setAttribute("placeholder", "Busca a tu Digimon");
  showDigimonCards(allDigimon);
});

// card

function showDigimonCards(digimonArray) {
  digimonCard.innerHTML = "";

  digimonArray.forEach((digimon) => {
    const card = templateCard.content.cloneNode(true);

    const cardImg = card.querySelector(".card-img-top");
    cardImg.setAttribute("src", digimon.img);

    const cardTitle = card.querySelector(".card-title");
    cardTitle.textContent = digimon.name;

    const cardText = card.querySelector(".card-text");
    cardText.innerHTML = `<strong>Nivel:</strong> ${digimon.level}`;

    digimonCard.appendChild(card);
  });
}
