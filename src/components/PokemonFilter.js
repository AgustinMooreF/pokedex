import { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
// import { searchPokemon } from "../services/pokeApi.service";
export const PokemonFilter = ({ setSearchPokmeons }) => {
  const [pokemonName, setPokemonName] = useState(null);

  const handleClick = async () => {
    if (
      pokemonName === undefined ||
      pokemonName === null ||
      pokemonName.length === 0
    ) {
      setSearchPokmeons(null);
    } else {
      setSearchPokmeons(pokemonName);
    }
  };
  return (
    <Grid container>
      <Grid item>
        <Typography gutterBottom variant="h4" component="div" color={"white"}>
          Filtra a tu Pokémon por Nombre:
        </Typography>
      </Grid>
      <FormControl row>
        <Grid item>
          <TextField
            label=""
            id="fullWidth "
            variant="filled"
            color="secondary"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
            sx={{
              input: {
                color: "black",
                background: "white",
              },
              ml: 3,
            }}
          />
          <Button variant="contained" color="secondary" onClick={handleClick} sx={{p:2, ml:1}} >
            Buscar Pokémon
          </Button>
        </Grid>
      </FormControl>
    </Grid>
  );
};
