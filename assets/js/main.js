const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const backButton = document.getElementById('backButton');
const pokemonDetails = document.getElementById('pokemonDetails');
var pokemonListJson = [];

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}" onclick="showPokemonDetails('${pokemon.name}')">
   <span class="number">#${pokemon.number}</span>
   <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
        ${pokemon.types
        .map(type => `<li class="type ${type}">${type}</li>`)
        .join('')}
        </ol>

        <img src="${pokemon.photo}"
         alt="${pokemon.name}">
    </div>
  </li>
   `;
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonListJson = pokemonListJson.concat(pokemons);
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
  });
}

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

backButton.addEventListener('click', () => {
  pokemonList.style.display = "grid";
  loadMoreButton.style.display = "block";
  pokemonDetails.style.display = "none";
  backButton.style.display = "none";
});

function showPokemonDetails(pokemonName) {
  let pokemonClicked = pokemonListJson.find(pokemon => pokemon.name === pokemonName);
  pokemonList.style.display = "none";
  loadMoreButton.style.display = "none";

  const newHtml = convertPokemonToDiv(pokemonClicked);
  pokemonDetails.innerHTML = newHtml;
  pokemonDetails.style.display = "block";
  backButton.style.display = "block";
}

function convertPokemonToDiv(pokemon) {
  return `
  <div id="pokemonSelected" class="pokemon ${pokemon.type}">
   <span class="name">${pokemon.name}</span>
   <span class="number">#${pokemon.number}</span>
   <br>
   <div class="detail">
    <ol class="types">
      ${pokemon.types
      .map(type => `<li class="type ${type}">${type}</li>`)
      .join('')}
    </ol>
   </div>

    <img src="${pokemon.photo}" alt="${pokemon.name}">
    <div class="tabs">
        <span class="label">Height: </span>${pokemon.height}
        <br>
        <span class="label">Weight: </span>${pokemon.weight}
    </div>
   
  </div>
   `;
}

backButton.style.display = "none";
loadPokemonItems(offset, limit);
