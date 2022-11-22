import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListItem from "../components/ListItem";
import { capitalizeFirstLetter } from "../utils/helpers";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const categoryParams = capitalizeFirstLetter(params.categoryName);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("category", "==", categoryParams),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  if (loading) return <Spinner />;

  return (
    <div className="container px-2 mx-auto py-20">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
        {listings.map((listing, index) => (
          <ListItem listing={listing.data} id={listing.id} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Category;
