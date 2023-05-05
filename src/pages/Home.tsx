import React from "react";
import { useGetAllCharactersQuery } from "../store/api/characters";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setPage } from "../store/slices/filter";
import { Character } from "../components";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const query = useGetAllCharactersQuery();

  const { data, error, isFetching, refetch } = query;

  React.useEffect(() => {
    refetch();
  }, [filter, refetch]);

  if (isFetching) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h4">Error when fetching characters :(</Typography>
    );
  }

  if (!data) {
    return <Typography variant="h4">No have any characters :(</Typography>;
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      <Pagination
        classes={{ root: "pagination" }}
        count={data.info.pages}
        defaultPage={filter.page}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"
        size="medium"
      />
      <div className="characters-grid">
        {data.results.map((obj) => (
          <Character
            key={obj.id}
            id={obj.id}
            image={obj.image}
            name={obj.name}
            status={obj.status}
          />
        ))}
      </div>
    </>
  );
};
