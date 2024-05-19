import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeArticle from "./LikeArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import Comments from "./Comments";

const Article = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div className="w-full h-full flex justify-center mt-24 md:mt-32 px-8 md:px-52 mb-6">
      {article && (
        <div className="w-full">
          <div className="w-full flex flex-col md:flex-row bg-white shadow hover:bg-gray-100 border border-gray-200 rounded-lg">
            <img
              className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-52 md:rounded-none md:rounded-l-lg"
              src={article.imageUrl}
              alt={article.title}
            />
            <div className="flex flex-col grow p-4 ">
              <p className="text-3xl font-bold text-blue-600">
                {article.title}
              </p>
              <p className="text-lg font-semibold mb-3">
                Author: {article.createdBy}
              </p>
              <p className="text-base text-gray-700 font-medium">
                Posted on: {article.createdAt.toDate().toDateString()}
              </p>
              <hr className="my-7" />
              <p className="text-xl pe-2 text-gray-950 font-medium">
                {article.description}
              </p>
              <div className="flex flex-row-reverse items-center">
                {user && <LikeArticle id={id} likes={article.likes} />}
                <div className="pe-2">
                  <p className="text-[20px] text-gray-950">
                    {article.likes.length}
                  </p>
                </div>
              </div>

              {/* Comment */}
            </div>
          </div>
          <Comments id={article.id} />
        </div>
      )}
    </div>
  );
};

export default Article;
