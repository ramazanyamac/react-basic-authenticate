import { Link } from "react-router-dom";
import movieCategoryImage from "../assets/images/movie.jpeg";
import gameCategoryImage from "../assets/images/game.jpeg";
import musicCategoryImage from "../assets/images/music.jpeg";
import bookCategoryImage from "../assets/images/book.jpeg";

const Explore = () => {
  return (
    <div className="container px-3 mx-auto py-20">
      <h1 className="text-3xl text-white font-bold mb-10">Categories</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <Link to="/category/movie">
            <img className="rounded-t-lg" src={movieCategoryImage} alt="" />
          </Link>
          <div className="p-5">
            <Link to="/category/movie">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Movie
              </h5>
            </Link>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <Link to="/category/game">
            <img className="rounded-t-lg" src={gameCategoryImage} alt="" />
          </Link>
          <div className="p-5">
            <Link to="/category/game">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Game
              </h5>
            </Link>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <Link to="/category/music">
            <img className="rounded-t-lg" src={musicCategoryImage} alt="" />
          </Link>
          <div className="p-5">
            <Link to="/category/music">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Music
              </h5>
            </Link>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <Link to="/category/book">
            <img className="rounded-t-lg" src={bookCategoryImage} alt="" />
          </Link>
          <div className="p-5">
            <Link to="/category/book">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Book
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
