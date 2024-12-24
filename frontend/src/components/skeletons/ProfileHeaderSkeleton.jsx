const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4 justify-start w-full mt-4">
      <div className="skeleton w-12 h-4 rounded-full"></div>
      <div className="skeleton w-16 h-4 rounded-full"></div>
      <div className="skeleton relative w-full h-40">
        <div className="absolute skeleton w-20 h-20 rounded-full border -bottom-10 left-3"></div>
      </div>
      <div className="skeleton h-6 w-20 rounded-full ml-auto mt-2"></div>
      <div className="skeleton h-4 w-14 rounded-full mt-4"></div>
      <div className="skeleton h-4 w-20 rounded-full"></div>
      <div className="skeleton h-4 w-2/3 rounded-full"></div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
