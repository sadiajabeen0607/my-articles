import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Comments = ({ id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedInUser] = useAuthState(auth);
  const commentRef = doc(db, "Articles", id);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  // Delete Comment Function
  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        toast("Deleted Successfully");
      })
      .catch((error) => {
        toast("Error in Deletion");
      });
  };

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedInUser.uid,
          userName: currentlyLoggedInUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };
  return (
    <div className=" w-full mt-6 md:px-8">
      <p className="text-2xl font-bold text-slate-950 px-1 mb-1">Comments</p>
      <div className="border p-3 rounded-lg">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId}>
              <div className="mt-2 p-2 flex flex-col md:flex-row">
                <div className="grow">
                  <span
                    className={`border text-base font-semibold rounded-full px-2 py-0 ${
                      user === currentlyLoggedInUser.uid
                        ? "bg-lime-600"
                        : "bg-blue-800"
                    }`}
                  >
                    {userName}
                  </span>
                  <span className="px-2">{comment}</span>
                </div>
                <div className="ps-4">
                  {user === currentlyLoggedInUser && (
                    <i
                      className="fa fa-times cursor-pointer"
                      onClick={() =>
                        handleDeleteComment({
                          commentId,
                          user,
                          comment,
                          userName,
                          createdAt,
                        })
                      }
                    ></i>
                  )}
                </div>
              </div>
            </div>
          ))}

        {currentlyLoggedInUser && (
          <div className="w-full border-gray-300 px-3">
            <input
              type="text"
              value={comment}
              className="mt-4 mb-5 w-full h-full bg-transparent text-lg outline-none border-b placeholder:text-gray-400"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              onKeyUp={(e) => handleChangeComment(e)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
