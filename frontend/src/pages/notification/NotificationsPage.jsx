import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications/");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex-1 border-r border-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="m-1">
            <IoSettingsOutline className="w-4" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a onClick={deleteNotifications}>Delete all notifications</a>
            </li>
          </ul>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!isLoading && notifications?.length === 0 && (
        <div className="text-center p-4 font-bold">No notifications 🤔</div>
      )}
      {!isLoading &&
        notifications?.map((notification) => (
          <div
            className="flex gap-3 border-b border-gray-700 p-4"
            key={notification._id}
          >
            {notification.type === "follow" && (
              <FaUser className="w-7 h-7 text-primary" />
            )}
            {notification.type === "like" && (
              <FaHeart className="w-7 h-7 text-red-500" />
            )}
            <div className="flex flex-col gap-1">
              <Link
                className="avatar w-8 rounded-full overflow-hidden"
                to={`/profile/${notification.from.username}`}
              >
                <img
                  src={
                    notification.from.profileImg || "/avatar-placeholder.png"
                  }
                />
              </Link>
              <div>
                <Link
                  className="font-bold"
                  to={`/profile/${notification.from.username}`}
                >
                  @{notification.from.username}
                </Link>{" "}
                {notification.type === "follow"
                  ? "followed you"
                  : "liked your post"}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotificationsPage;
