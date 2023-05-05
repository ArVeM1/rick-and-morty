import React from "react";
import { useGetLocationByIdQuery } from "../../store/api/locations";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Skeleton } from "@mui/material";

interface LocationListProps {
  ids: number[] | number;
}

const LocationList: React.FC<LocationListProps> = ({ ids }) => {
  const { data, isLoading, error } = useGetLocationByIdQuery(ids);

  if (isLoading) {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {[...Array(3)].map((_, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton variant="text" width={150} height={130} />}
              secondary={<Skeleton variant="text" width={100} height={20} />}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  if (error) {
    return <Typography variant="h4">Error when loading locations</Typography>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {data.map((obj) => (
          <ListItem key={obj.id}>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={obj.name} secondary={obj.type} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LocationList;
