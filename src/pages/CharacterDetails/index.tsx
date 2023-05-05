import React from "react";
import styles from "./CharacterDetails.module.scss";
import { Navigate, useParams } from "react-router-dom";
import { useGetCharacterByIdQuery } from "../../store/api/characters";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import LocationList from "../../components/LocationList";

export const CharacterDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetCharacterByIdQuery(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  if (!data) {
    return <Typography variant="h4">Empty data :(</Typography>;
  }

  const locationId = data.location.url.split("/").pop();

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={data.image} alt={data.name} />
      </div>
      <div className={styles.details}>
        <Typography variant="h3">{data.name}</Typography>
        <ul className={styles.detailsList}>
          <li>
            <Typography variant="body2" color="text.secondary">
              Status: <b>{data.status}</b>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              Species: <b>{data.species}</b>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              Gender: <b>{data.gender}</b>
            </Typography>
          </li>
        </ul>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cum
          deleniti doloribus explicabo fuga hic illum iure, maiores odio
          possimus praesentium quos sed ullam vel vero vitae voluptatum! Neque,
          voluptatibus.
        </p>

        <Typography variant="h4" classes={{ root: styles.blockTitle }}>
          Episodes
        </Typography>

        <LocationList ids={Number(locationId)} />
      </div>
    </div>
  );
};
