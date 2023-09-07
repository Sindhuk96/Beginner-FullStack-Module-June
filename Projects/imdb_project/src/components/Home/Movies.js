import React, { useEffect, useState } from "react";
import { GetTrendingMovies } from "../../service/GetTrendingMovies";
import Pagination from "./Pagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    //  GetTrendingMovies(counter).then((result) => {
    //   setMovies(result);
    //  })
    async function fetchMyMovies() {
      const result = await GetTrendingMovies(counter);
      console.log(result);
      setMovies(result);
    }
    fetchMyMovies();
  }, [counter]);

  const onNext = () => {
    setCounter(counter + 1);
  };

  const onPrev = () => {
    if (counter == 1) {
      setCounter(1);
    } else {
      setCounter(counter - 1);
    }
  };

  const addMovieToWatchList = (id) => {
    // const newWatchList = [...watchList, id];
    // setWatchList(newWatchList);
    setWatchList((prevState) => [...prevState, id]);
    //console.log("adding ", newWatchList);
  };

  const removeMovieFromWatchList = (id) => {
    // [1,2,3], (2) -> [1,3]
    //   const filteredWatchList = watchList.filter((movieId) => {
    //     return movieId !== id
    // });
    // setWatchList(filteredWatchList);
    setWatchList((prevState) => {
      const filteredWatchList = prevState.filter((movieId) => {
        return movieId !== id;
      });
      return filteredWatchList;
    });
    //console.log("removing ", filteredWatchList);
  };

  const showButton = (id) => {
    setHovered(id);
  };

  const hideButton = () => {
    setHovered("");
  };

  return (
    <div>
      <div className="text-2xl mb-8 font-bold text-center">Trending Movies</div>
      <div className="flex flex-wrap">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-4 md:h[40vh] md:w[180px] hover:scale-110 duration-300 relative flex items-end"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
              }}
              onMouseOver={() => {
                showButton(movie.id);
              }}
              onMouseOut={hideButton}
            >
              <div
                className="absolute top-2 right-2 bg-gray-900 rounded-2xl p-2 text-2xl"
                style={{ display: hovered === movie.id ? "block" : "none" }}
              >
                {watchList.includes(movie.id) === true ? (
                  <button onClick={() => removeMovieFromWatchList(movie.id)}>
                    ❌
                  </button>
                ) : (
                  <button onClick={() => addMovieToWatchList(movie.id)}>
                    😍
                  </button>
                )}
              </div>
              <div className="text-white text-center font-bold w-full bg-gray-900 bg-opacity-60">
                {movie.title}
              </div>
            </div>
          );
        })}
      </div>
      <Pagination onNext={onNext} onPrev={onPrev} counter={counter} />
    </div>
  );
};

export default Movies;
