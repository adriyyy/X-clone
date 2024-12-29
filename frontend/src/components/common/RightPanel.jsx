import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton.jsx";
import useFollow from "../../hooks/useFollow.jsx";

const RightPanel = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { follow, isPending } = useFollow();

  if (suggestedUsers?.length === 0) return <div className="md:w-64 w-0"></div>;

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
            suggestedUsers?.map((user) => (
              <div
                className="flex justify-between items-center gap-4"
                key={user._id}
              >
                <Link
                  to={`/profile/${user.username}`}
                  className="flex gap-2 items-center"
                >
                  {" "}
                  <div className="avatar w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={user.profileImg || "/avatar-placeholder.png"}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold tracking-tight runcate">
                      {user.fullName}
                    </p>
                    <p className="text-sm text-slate-500">@{user.username}</p>
                  </div>
                </Link>
                <div>
                  <button
                    className="btn bg-white rounded-full text-black hover:bg-gray-200 transition duration-300 btn-sm"
                    onClick={() => {
                      follow(user._id);
                      console.log(user._id);
                    }}
                  >
                    {isPending ? (
                      <div className="loading loading-spinner loading-sm"></div>
                    ) : (
                      "Follow"
                    )}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
