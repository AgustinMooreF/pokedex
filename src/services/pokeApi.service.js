import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/";
export const fetchPokemons = async () => {
  try {
    const response = [];
    for (let i = 0; i < 25; i++) {
      let pokemonId = i + 1;
      const pokemonInfo = await axios.get(
        API_URL + "pokemon/" + pokemonId.toString()
      );
      const pokemonEvolutions = await axios.get(
        API_URL + "pokemon-species/" + pokemonInfo.data.name
      );
      response[i] = {
        pokemonData: pokemonInfo.data,
        pokemonEvolutions: pokemonEvolutions.data,
      };
    }
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchEvolutions = async (evolutionsUrl) => {
  try {
    const response = [];
    const evolutionsResp = await axios.get(evolutionsUrl);
    let iter = evolutionsResp.data.chain;
    // Since the object is nested and inverted we can iter recursively through it to get the evolutions
    while(iter) {
        response.push(iter.species.name)
        iter = iter.evolves_to[0];    
    }
    return response;
  } catch (error) {
    return error;
  }
};
// export const searchPokemon = async (pokemonName) => {
//   try {
//     const response = await axios.get( API_URL + "pokemon/" + pokemonName.toString());
//     console.log(response)
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };


