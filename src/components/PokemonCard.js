import { useEffect, useState } from "react";
import {
  Chip,
  Grid,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { PokemonModal } from "./PokemonModal";

export const PokemonCard = ({ pokemon, index }) => {
  const [evolution, setEvolution] = useState(false);
  const { pokemonData, pokemonEvolutions } = pokemon;
  const [open, setOpen] = useState(false);
  // console.log(pokemonEvolutions)
  useEffect(() => {
    isEvolution();
  }, []);

  const isEvolution = () => {
    if (pokemonEvolutions.evolves_from_species) {
      setEvolution(true);
    } else {
      setEvolution(false);
    }
  };

  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <Grid item xs={2} sm={4} md={3} mt={5}>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="400"
            image={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            sx={{ background: "#feff35" }}
          />
          <CardContent sx={{ background: "#ed7f8c" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={"white"}
            >
              {index + 1 + ": " + pokemonData.name}
            </Typography>
            {evolution ? (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color={"white"}
              >
                {"Evolución de: " + pokemonEvolutions.evolves_from_species.name}
              </Typography>
            ) : (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color={"white"}
              >
                Pokémon base
              </Typography>
            )}
            <Box mt={4}>
              {pokemonData.types.map((type, typeIndex) => (
                <Chip
                  label={type.type.name}
                  key={typeIndex}
                  color="primary"
                  sx={{ ml: 1, p: 2 }}
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        {open ? (
          <PokemonModal
            setOpen={setOpen}
            open={open}
            pokemonData={pokemonData}
            pokemonEvolutionsUrl={pokemonEvolutions.evolution_chain}
          />
        ) : null}
      </Card>
    </Grid>
  );
};
