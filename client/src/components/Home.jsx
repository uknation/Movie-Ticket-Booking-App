import React, { useEffect, useState } from 'react';
import Header from './Header';
import MovieCards from './MovieCards';
import { FaSearch } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Home() {
  const [search, setSearch] = useState(() => localStorage.getItem('search') || 'harry');
  const [movies, setMovies] = useState(() => JSON.parse(localStorage.getItem('movies')) || []);
  const [filteredMovies, setFilteredMovies] = useState(() => JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => Number(localStorage.getItem('currentPage')) || 0);
  const moviesPerPage = 5;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=c11c542`);
        if (response.data && response.data.Search) {
          setMovies(response.data.Search);
          setFilteredMovies(response.data.Search);
          localStorage.setItem('movies', JSON.stringify(response.data.Search)); 
          localStorage.setItem('filteredMovies', JSON.stringify(response.data.Search)); 
        } else {
          setError("No movies found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    // Fetch movies when the search term changes
    if (search) {
      fetchMovies();
      localStorage.setItem('search', search); // Save the search term to localStorage
    } else {
      setMovies([]);
      setFilteredMovies([]);
      localStorage.removeItem('movies');
      localStorage.removeItem('filteredMovies');
    }
  }, [search]);

  useEffect(() => {
    // Save currentPage to localStorage whenever it changes
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayedMovies = filteredMovies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  return (
    <div className='flex flex-col gap-5'>
      <Header />
      <div className='flex justify-center'>
        <input 
          className="block max-w-full w-96 rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " 
          type="text" 
          placeholder='Search...'
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button 
          onClick={() => setCurrentPage(0)}
          disabled={loading}
          className="flex max-w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FaSearch />
        </button>
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : displayedMovies.length > 0 ? (
          displayedMovies.map((movie, index) => (
            <MovieCards key={index} movie={movie} />
          ))
        ) : (
          <div>No movies found. Please search again.</div>
        )}
      </div>
      {filteredMovies.length > 0 && search && (
        <ReactPaginate
          previousLabel={<GrLinkPrevious />}
          nextLabel={<GrLinkNext />}
          breakLabel={'...'}
          breakClassName={'mx-2 text-gray-500'}
          pageClassName={'mx-1'}
          pageLinkClassName={'block px-4 py-2 border border-gray-300 rounded-md hover:bg-indigo-600 hover:text-white transition'}
          previousClassName={'mx-1'}
          previousLinkClassName={'block px-4 py-2 border border-gray-300 rounded-md hover:bg-indigo-600 hover:text-white transition'}
          nextClassName={'mx-1'}
          nextLinkClassName={'block px-4 py-2 border border-gray-300 rounded-md hover:bg-indigo-600 hover:text-white transition'}
          containerClassName={'flex justify-center items-center my-4'}
          activeClassName={'bg-indigo-600 text-white'}
          pageCount={Math.ceil(filteredMovies.length / moviesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
}

export default Home;
