import React from 'react';
import { Link } from 'react-router-dom';

function MovieCards({ movie }) {
  if (!movie) return null; 

  return (
    <div className="w-64 h-auto rounded-2xl  shadow-lg flex flex-col hover:scale-105">
      <Link to={`/movie/${movie.imdbID}`}>
      <img
        className="w-full h-80 " 
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="flex-1 px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.Title}</div>
        <div className='flex justify-between font-serif'>
        <h3 className="text-gray-700">{movie.Year}</h3>
        <h3 className="text-gray-700">{movie.Type}</h3>
        </div>
      
        {/* <h3 className="text-gray-700">{movie.imdbID}</h3> */}
      </div>
      {/* <div className="px-6 pt-4 pb-2">
        <Link to={`/movie/${movie.imdbID}`}>
        <button className="flex max-w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Get Details
        </button>
        </Link>
       
      </div> */}
      </Link>
     
    </div>
  );
}

export default MovieCards;
