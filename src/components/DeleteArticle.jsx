import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

const DeleteArticle = ({ id, imageUrl }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        deleteObject(storageRef);
      } catch (error) {
        toast("Error in deleting Article", { type: "error" });
      }
    }
  };

  return (
    <div>
      <i className="fa fa-times cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default DeleteArticle;
