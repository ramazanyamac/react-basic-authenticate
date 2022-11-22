import { useState, useEffect } from "react";
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

const Content = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(20));

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
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container px-3 mx-auto py-20">
      <h1 className="text-3xl text-white font-bold mb-10">Content</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        {listings.map((listing) => (
          <ListItem listing={listing.data} id={listing.id} key={listing.id} />
        ))}
      </div>
    </div>
  );
};

export default Content;
