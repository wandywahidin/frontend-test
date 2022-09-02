import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMovies,
  loadPage,
  getPage,
  getAllMovies,
} from "../features/movies/movieSlice";

const HomePage = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch();
  const paging = useSelector(getPage);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchMovies(paging));
  }, [paging, dispatch]);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      dispatch(loadPage());
    }
  };
  const moviesList = useSelector(getAllMovies);
  const results = moviesList.reduce((finalArray, current) => {
    let obj = finalArray.find((item) => item.imdbID === current.imdbID);
    if (obj) {
      return finalArray;
    }
    return finalArray.concat([current]);
  }, []);

  const handleToDetail = (id) => {
    navigate(`/detail/${id}`)
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Search Movie"
          className="w-[50%] text-center border border-black mt-4 p-2"
          onChange={(e) => setQuery(e.target.value) }
        />
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6 text-center mx-6">
          {results.filter((search) => search.Title.toLowerCase().includes(query)).map((item) => (
            <div key={item.imdbID} className='flex flex-col justify-between items-center mt-4' onClick={() => handleToDetail(item.imdbID)}>
              <img src={item.Poster} alt={item.Title} className='w-full h-full'/>
              <h1 className="text-xs md:text-xl font-bold">{item.Title}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
