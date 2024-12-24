const RightPanelSkeleton = () => {
  return (
    <div className="flex justify-between items-center w-52">
      <div className="flex gap-2">
        <div className="skeleton w-8 h-8 rounded-full shrink-0 items-center"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-2 w-12 rounded-full"></div>
          <div className="skeleton h-2 w-16 rounded-full"></div>
        </div>
      </div>
      <div className="skeleton h-6 w-14 rounded-full"></div>
    </div>
  );
};
export default RightPanelSkeleton;
