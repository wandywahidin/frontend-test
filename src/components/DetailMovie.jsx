import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailMovie, fetchDetailMovie } from '../features/movies/movieSlice'

const DetailMovie = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDetailMovie(id))
    },[dispatch, id])
    
    const detail = useSelector(getDetailMovie)
    console.log(detail);
  return (
    <div>
        <div className='flex md:flex-row flex-col justify-center gap-12 mt-8'>
            <img src={detail.Poster} alt={detail.Title} className='md:w-[30%] p-4'/>
            <div className='p-4'>
                <h1 className='text-4xl md:text-6xl font-bold'>{detail.Title}</h1>
                <p className='md:text-4xl text-2xl font-semibold mx-1'>Rating Imdb {detail.imdbRating} &#9733;</p>
                <p className='md:text-2xl mx-1 mt-4'>Released : {detail.Released}</p>
                <p className='md:text-2xl mx-1 '>Country : {detail.Country}</p>
                <p className='md:text-2xl mx-1 '>Genre : {detail.Genre}</p>
                <p className='md:text-2xl mx-1 '>Language : {detail.Language}</p>
                <p className='md:text-2xl mx-1 '>Award : {detail.Awards}</p>
                <p className='md:text-2xl mx-1 '>Description : </p>
                <p className='md:text-2xl mx-1 max-w-3xl '>{detail.Plot} </p>
                <br />
                <p className='md:text-2xl mx-1 max-w-3xl '>Director : {detail.Director} </p>
                <p className='md:text-2xl mx-1 max-w-3xl '>Writer : {detail.Writer} </p>
                <p className='md:text-2xl mx-1 max-w-3xl '>Actors : {detail.Actors} </p>
                <p className='md:text-2xl mx-1 max-w-3xl '>Revenue : {detail.BoxOffice} </p>
                <p className='md:text-2xl mx-1 max-w-3xl '>Other Rating : </p>
                {detail?.Ratings?.map((rating, index) => (
                    <p className='mx-1 md:text-xl' key={index}>{rating.Source} <span>{rating.Value}</span></p>
                ))}
                <button className='border border-black p-2 mt-2 mx-1 font-bold hover:bg-gray-700 hover:text-white'>
                    <Link to='/'>Back to Home</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default DetailMovie