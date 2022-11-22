import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Create = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const userRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const listingsRef = collection(db, "categories");

      const querySnap = await getDocs(listingsRef);

      let categories = null;

      querySnap.forEach((doc) => {
        return (categories = doc.data());
      });

      setCategories(categories);
      setLoading(false);
    };

    fetchCategories();

    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userRef.current = {userRef: user.uid}
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = async (data) => {
    setLoading(true);

    const storageImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

     const imageUrls = await Promise.all(
         [...data.images].map((image) => storageImage(image))
       ).catch(() => {
        setLoading(false);
        toast.error("images not uploaded");
           return;
     });

     const formDataCopy = {
       ...data,
       ...userRef,
       imageUrls,
       timestamp: serverTimestamp(),
     };

     delete formDataCopy.images;

     const docRef = await addDoc(collection(db, "listings"), formDataCopy);
     setLoading(false);
      toast.success("Content saved");
      navigate(`/category/${formDataCopy.category}/${docRef.id}`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="container px-2 mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Content
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Add title here"
                  {...register("title", { required: true, maxLength: 80 })}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  {...register("category", { required: true, maxLength: 80 })}
                >
                  <option value="">Select category</option>
                  {categories.category.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="article"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="article"
                  rows="8"
                  className="block w-full p-3 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write an article..."
                  {...register("article", { required: true })}
                ></textarea>
                {errors.article && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="images"
                >
                  Upload Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  accept=".jpg,.png,.jpeg"
                  max="6"
                  id="images"
                  type="file"
                  {...register("images", { required: true, maxLength: 80 })}
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  PNG, JPG or JPEG.
                </p>
                {errors.images && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white w-full mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Post Content
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Create;
