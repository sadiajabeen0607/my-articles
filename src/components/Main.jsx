import React from "react";
import AddArticles from "./AddArticles";
import Articles from "./Articles";

function Main() {
  return (
    <div className="w-full h-full flex items-center justify-center my-10">
      <div className="w-[90%] md:w-[75%] border border-gray-600 rounded-lg p-6">
        <div className="flex flex-col-reverse md:flex-row gap-5">
          <div className="md:flex-[65%]">
            <p className="text-slate-700 font-bold text-3xl py-3">Articles</p>
            <Articles />
          </div>

          <div className="md:flex-[35%]">
            <AddArticles />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;