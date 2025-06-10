import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=c11c542`);
        if (response.data) {
          setMovie(response.data);
        } else {
          setError('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5 flex flex-col justify-center bg-slate-300 items-center">
        <div>
        <h1 className="text-2xl font-bold">{movie.Title}</h1>
        <img src={movie.Poster} alt={movie.Title} className="my-4" />
        </div>
      
      <div className='p-1'>
      <table class="min-w-full bg-white border border-gray-200 ">
  <thead>
    <tr>
      <th class="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute</th>
      <th class="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Year</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Year}</td>
    </tr>
    <tr class="bg-white">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Genre</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Genre}</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Director</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Director}</td>
    </tr>
    <tr class="bg-white">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Actors</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Actors}</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Plot</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Plot}</td>
    </tr>
    <tr class="bg-white">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Awards</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Awards}</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Language</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{movie.Language}</td>
    </tr>
  </tbody>
</table>


      </div>
      <div>
        <Link to='/Protected'><button className='flex max-w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Back</button></Link>
      </div>
    </div>
  );
}

export default MovieDetails;
