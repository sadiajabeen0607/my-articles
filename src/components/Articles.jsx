import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);

  return (
    <div className="my-3">
      {articles.length === 0 ? (
        <p>No Articles found</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div
              className="flex flex-col md:flex-row bg-gray-100 gap-3 border border-gray-200 rounded-lg shadow md:max-w-2xl mb-4"
              key={id}>
              <Link to={`/article/${id}`}>
                <img
                  className="object-cover w-full rounded-t-lg h-44 md:h-52 md:w-52 md:rounded-none md:rounded-l-lg"
                  src={imageUrl}
                  alt="title"
                />
              </Link>
              <div className="grow pr-2 mt-2">
                <div className="flex items-center justify-between mb-1 relative px-2">
                  <div className="">
                    {createdBy && (
                      <span className="text-sm bg-blue-700 text-white border border-blue-800 px-3 py-1 rounded-full">
                        by {createdBy}
                      </span>
                    )}
                  </div>
                  <div className="">
                    {user && user.uid === userId && (
                      <DeleteArticle id={id} imageUrl={imageUrl} />
                    )}
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-500 px-2">{title}</p>
                <p className="text-base text-gray-800 px-2">
                  {createdAt.toDate().toDateString()}
                </p>
                <p className="text-lg font-semibold text-slate-950 py-2 px-2 ">
                  {description}
                </p>
                <div className="flex flex-row-reverse mb-2 mr-2">
                  {user && <LikeArticle id={id} likes={likes} />}
                  <div className="pe-2">
                    <p>{likes?.length} likes</p>
                  </div>
                  {
                    comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Articles;
