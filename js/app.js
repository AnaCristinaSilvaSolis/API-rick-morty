const cards = document.getElementById('card-dinamicas');
const templateCard = document.getElementById('templateCard').content;
const loading = document.getElementById('loading'); //capturar el loading
const fragment = document.createDocumentFragment();

// cargando el DOM
document.addEventListener('DOMContentLoaded', () => {
  datosFetch();
});

const datosFetch = async () => {
  try {
    loadingData(true);

    //solicitud a la API
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();

    //pintamos
    pintarCard(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const pintarCard = (data) => {
  console.log(data);
  data.results.forEach((item) => {
    //console.log(item);
    const clone = templateCard.cloneNode(true);
    clone.querySelector('.card-title').textContent = item.name; //pasamos el nombre
    clone.querySelector('.especie').textContent = item.species; //pasamos la especie
    clone.querySelector('.card-img-top').setAttribute('src', item.image); //pasamos la imagen
    clone.querySelector('.genero').textContent = item.gender;
    clone.querySelector('.creacion').textContent = item.created;

    //se guarda en el fragment y asi evitamos el reflow
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const loadingData = (estado) => {
  if (estado) {
    loading.classList.remove('d-none');
  } else {
    loading.classList.add('d-none');
  }
};
