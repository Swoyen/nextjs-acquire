import classes from "./GenresTags.module.css";

const GenresTags = ({ genres }) => {
  return (
    <div className={classes.genrestags}>
      <div className={"label"}>Genres</div>
      <div className={classes.genretagcontainer}>
        {genres?.map((genre) => (
          <div className={classes.genretag} key={genre.id}>
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresTags;
