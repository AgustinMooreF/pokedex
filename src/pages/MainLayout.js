import { fetchPokemons } from "../services/pokeApi.service";
import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonFilter } from "../components/PokemonFilter";
export const MainLayout = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemon, setSearchPokmeons] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    async function fetchAllPokemons() {
      let resp = await fetchPokemons();
      setPokemonList(resp);
      setPokemons(resp);
    }
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    if (searchPokemon != null) {
      let searchResult = pokemonList.filter(
        (pokemon) => pokemon.pokemonData.name === searchPokemon
      );
      setPokemons(searchResult);
    } else {
      setPokemons(pokemonList);
    }
  }, [, searchPokemon]);

  return (
    <Box sx={{ flexGrow: 1, width: "80%", mx: "auto" }}>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <PokemonFilter setSearchPokmeons={setSearchPokmeons} />
      </Box>
      <Grid
        pl={1}
        pr={1}
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {pokemons.map((pokemon, index) => (
          <PokemonCard pokemon={pokemon} index={index} key={index} />
        ))}
      </Grid>
    </Box>
  );
};
