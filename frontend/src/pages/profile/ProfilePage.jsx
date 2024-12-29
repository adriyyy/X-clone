import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date/index.js";

const ProfilePage = () => {
  const [feedType, setFeedType] = useState("posts");
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { username } = useParams();

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const isMyProfile = true;

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 min-h-screen border-r border-gray-700">
      {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
      {!isLoading && !isRefetching && !user && (
        <p className="text-center text-xl mt-4 font-semibold">User not found</p>
      )}
      {!isLoading && !isRefetching && user && (
        <div className="flex flex-col">
          <div className="flex gap-10 items-center p-4">
            <Link to="/">
              <FaArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex flex-col">
              <p className="font-bold text-lg">{user?.fullName}</p>
              <span className="text-sm text-slate-500">4 posts</span>
            </div>
          </div>
          <div className="relative">
            <div className="group/cover">
              <img
                src={coverImg || user?.coverImg || "/cover.png"}
                className="h-52 w-full overflow-hidden object-cover"
              />
              <div
                className="absolute top-2 right-2 rounded-full cursor-pointer bg-gray-800 bg-opacity-75 p-2 opacity-0 group-hover/cover:opacity-100 transition duration-300"
                onClick={() => coverImgRef.current.click()}
              >
                <MdEdit />
              </div>
            </div>
            <div className="avatar absolute -bottom-16 left-4">
              <div className="relative group/avatar w-32 rounded-full">
                <img
                  src={
                    profileImg || user?.profileImg || "/avatar-placeholder.png"
                  }
                />
                <div
                  className="absolute right-3 top-5 rounded-full bg-primary p-1 group-hover/avatar:opacity-100 opacity-0 transition duration-300 cursor-pointer"
                  onClick={() => profileImgRef.current.click()}
                >
                  <MdEdit className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <input
            type="file"
            hidden
            ref={coverImgRef}
            accept="image/*"
            onChange={(e) => handleImgChange(e, "coverImg")}
          />
          <input
            type="file"
            hidden
            ref={profileImgRef}
            accept="image/*"
            onChange={(e) => handleImgChange(e, "profileImg")}
          />

          <div className="flex justify-end mt-5 px-4">
            {isMyProfile && <EditProfileModal />}
            {!isMyProfile && (
              <button className="btn btn-outline rounded-full px-6 btn-sm">
                Follow
              </button>
            )}
            {(coverImg || profileImg) && (
              <button
                className="btn btn-primary btn-outline rounded-full px-6 btn-sm ml-2"
                onClick={() => {}}
              >
                Update
              </button>
            )}
          </div>
          <div className="flex flex-col mt-12 gap-4 px-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl">{user?.fullName}</span>
              <span className="text-slate-500 text-sm">@{user?.username}</span>
              {user?.bio && (
                <span className="text-white text-sm">{user?.bio}</span>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              {user?.link && (
                <div className="flex gap-2 items-center">
                  <FaLink />
                  <a
                    href={user?.link}
                    target="_blank"
                    rel="noreferer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {user?.link}
                  </a>
                </div>
              )}
              <div className="flex gap-2 items-center">
                <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-500">
                  {memberSinceDate}
                </span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <span className="font-bold text-xs">
                  {user?.following?.length}
                </span>
                <span className="text-slate-500 text-xs">Following</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-bold text-xs">
                  {user?.followers?.length}
                </span>
                <span className="text-slate-500 text-xs">Followers</span>
              </div>
            </div>
          </div>
          <div className="flex mt-4 border-b border-gray-700 w-full">
            <div
              className="flex flex-1 justify-center transition duration-300 hover:bg-secondary cursor-pointer p-3 relative"
              onClick={() => setFeedType("posts")}
            >
              Posts
              {feedType === "posts" && (
                <div className="bottom-0 absolute rounded w-10 h-1 bg-primary"></div>
              )}
            </div>
            <div
              className="flex flex-1 justify-center transition duration-300 hover:bg-secondary cursor-pointer p-3 relative"
              onClick={() => setFeedType("likes")}
            >
              Likes
              {feedType === "likes" && (
                <div className="absolute bottom-0 rounded w-10 h-1 bg-primary"></div>
              )}
            </div>
          </div>
          <Posts feedType={feedType} username={username} userId={user._id} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
