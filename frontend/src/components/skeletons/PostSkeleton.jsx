const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-start p-4 w-full">
      <div className="flex items-center gap-4">
        <div className="skeleton w-10 h-10 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-2 w-10 rounded-full"></div>
          <div className="skeleton h-2 w-20 rounded-full"></div>
        </div>
      </div>
      <div className="skeleton w-full h-40"></div>
    </div>
  );
};

export default PostSkeleton;
