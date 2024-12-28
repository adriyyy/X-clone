import CreatePost from "./CreatePost.jsx";
import Posts from "../../components/common/Posts.jsx";

import { useState } from "react";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <div className="flex border-b border-gray-700 w-full">
        <div
          className="flex flex-1 justify-center transition duration-300 hover:bg-secondary cursor-pointer p-3 relative"
          onClick={() => setFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && (
            <div className="bottom-0 absolute rounded w-10 h-1 bg-primary"></div>
          )}
        </div>
        <div
          className="flex flex-1 justify-center transition duration-300 hover:bg-secondary cursor-pointer p-3 relative"
          onClick={() => setFeedType("following")}
        >
          Following
          {feedType === "following" && (
            <div className="absolute bottom-0 rounded w-10 h-1 bg-primary"></div>
          )}
        </div>
      </div>
      <CreatePost />
      <Posts feedType={feedType} />
    </div>
  );
};
export default HomePage;
