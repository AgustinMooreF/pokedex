import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { List, ListItem, Grid, ListItemText } from "@mui/material";
import { fetchEvolutions } from "../services/pokeApi.service";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "#d5ebf6",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const PokemonModal = ({
  setOpen,
  open,
  pokemonData,
  pokemonEvolutionsUrl,
}) => {
  const [evolutions, setEvolutions] = useState([]);
  const pokemonImages = pokemonData.sprites || [];
  const pokemonImageArr = [
    pokemonImages.front_default,
    pokemonImages.back_default,
  ];
  useEffect(() => {
    //Fetch the pokemon evolutions for the modal info.
    async function fetchPokemonEvolutions() {
      let resp = await fetchEvolutions(pokemonEvolutionsUrl.url);
      setEvolutions(resp);
    }
    fetchPokemonEvolutions();
  }, []);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ImageList
              sx={{ width: 400, height: 200 }}
              cols={2}
              rowHeight={164}
            >
              {pokemonImageArr?.map((item, index) => (
                <ImageListItem key={index}>
                  <img src={item} alt={pokemonData.name} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>

            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              mx={"auto"}
              align="center"
            >
              {"Nombre: " + pokemonData.name}
            </Typography>
            <Grid container columns={{ xs: 2, sm: 2, md: 12 }}>
              <Grid item xs={6} mt={2}>
                <Typography
                  id="transition-modal-description"
                  component="h3"
                  variant="h6"
                >
                  Característica:
                </Typography>

                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#d5ebf6",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary="Altura:"
                      secondary={pokemonData.height + " mts"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Peso:"
                      secondary={pokemonData.weight + " kg"}
                    />
                  </ListItem>
                </List>
                <Typography
                  id="transition-modal-description"
                  component="h3"
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  Cadena de evoluciones:
                </Typography>

                {evolutions.map((evolution, index) => (
                  <Typography component="li" sx={{ mt: 2 }} key={index}>
                    {evolution}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6} mt={2}>
                <Typography
                  id="transition-modal-description"
                  component="h3"
                  variant="h6"
                >
                  Habilidades:
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#d5ebf6",
                    maxHeight: 200,
                    overflow: "auto",
                    mt: 2,
                  }}
                >
                  {pokemonData.moves.map((move, index) => (
                    // <ListItem key={index}>
                      <Typography component="li" sx={{ mt: 2 }} key={index}>
                        {move.move.name}
                      </Typography>
                    // </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
