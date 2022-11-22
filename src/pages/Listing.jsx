import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListings = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListings();
  }, [navigate, params.listingId]);

  if (loading) return <Spinner />;

  return (
    <div className="container px-2 mx-auto py-10 lg:py-20">
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header className="mb-4 lg:mb-6 not-format">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {listing.title}
          </h1>
        </header>
        <figure className="mb-5">
          <img src={listing.imageUrls[0]} alt={listing.title} />
        </figure>
        <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
          {listing.article}
        </p>
      </article>
    </div>
  );
};

export default Listing;
