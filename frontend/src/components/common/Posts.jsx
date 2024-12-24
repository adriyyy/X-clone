import { POSTS } from "../../utils/db/dummy.js";
import PostSkeleton from "../skeletons/PostSkeleton.jsx";
import Post from "./Post.jsx";

const Posts = () => {
  const isLoading = false;

  return (
    <>
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {!isLoading && POSTS?.length === 0 && (
        <p className="text-center my-4 text-slate-500 font-semibold">
          No posts in this tab. Switch👻
        </p>
      )}
      {!isLoading && POSTS && (
        <div>
          {POSTS.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
