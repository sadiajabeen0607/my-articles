import React, { useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const AddArticles = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast("Article Added Successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error in uploading article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div className="md:mt-4">
      {!user ? (
        <div className="border w-full p-3 rounded-md relative bg-gray-100 mt-4 md:mt-16">
          <Link
            to="/signin"
            className=" block text-xl font-semibold text-blue-700 my-3 underline"
          >
            Login to Create Article
          </Link>
          <p>
            Don't have an Account?
            <Link
              to="/register"
              className="text-base font-medium text-blue-600 px-2 underline"
            >
              SignUp
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-2xl text-slate-800 font-semibold mb-6">
            Create Article
          </p>
          <div className="border w-full  p-3 rounded-md relative bg-gray-100">
            {/* Title */}
            <div className="mb-3">
              <label
                htmlFor=""
                className="block text-gray-800 text-lg font-medium"
              >
                Title
              </label>
              <div className="w-full py-2 bg-white border border-gray-300 flex items-center gap-2 rounded-md px-2">
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange(e)}
                  placeholder="Give me a Title"
                  className="w-full h-full bg-transparent text-lg outline-none border-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label
                htmlFor=""
                className="block text-gray-800 text-lg font-medium"
              >
                Description
              </label>
              <div className="w-full bg-white border border-gray-300 flex items-center gap-2 rounded-md">
                <textarea
                  name="description"
                  rows="4"
                  className="block w-full h-full bg-transparent text-lg outline-none border-none placeholder:text-gray-400 p-2.5"
                  placeholder="Write your thoughts here..."
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </div>

            {/* Image */}
            <div className="">
              <label
                htmlFor=""
                className="block text-gray-800 text-lg font-medium"
              >
                Image
              </label>
              <div className="w-full bg-white border border-gray-300 flex items-center gap-2 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            {/* Progress bar */}
            {progress === 0 ? null : (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 ">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image ${progress}%`}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-blue-700 mt-3 rounded-md p-2 text-white text-base"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddArticles;
