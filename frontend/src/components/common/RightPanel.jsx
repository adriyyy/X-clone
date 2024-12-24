import { Link } from "react-router-dom";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy.js";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton.jsx";

const RightPanel = () => {
  const isLoading = false;

  return (
    <div className="hidden lg:block mx-2 my-4">
      <div className="bg-secondary sticky rounded-md p-4 top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4 mt-3">
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            USERS_FOR_RIGHT_PANEL.map((user) => (
              <Link
                className="flex justify-between items-center gap-4"
                to={`/profile/${user.username}`}
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar rounded-full w-8">
                    <img src={user.profileImg || "/avatar-placeholder.png"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold tracking-tight truncate">
                      {user.fullName}
                    </p>
                    <p className="text-sm text-slate-500">@{user.username}</p>
                  </div>
                </div>
                <div>
                  <button className="btn bg-white rounded-full text-black hover:bg-gray-200 transition duration-300 btn-sm">
                    Follow
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
