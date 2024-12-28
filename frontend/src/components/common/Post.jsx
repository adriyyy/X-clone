import { Link } from "react-router-dom";
import { FaRegComment, FaRegHeart, FaTrash, FaBookmark } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useState } from "react";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");

  const postOwner = post.user;
  const formatedDate = "1h";
  const isLiked = false;
  const isMyPost = true;
  const isCommenting = false;

  const handleDeletePost = () => {};

  const handlePostComment = (e) => {
    e.preventDefault();
    console.log(comment);
  };

  const handleLikePost = () => {};

  return (
    <div className="flex items-start gap-2 border-b border-gray-700 p-4">
      <Link
        className="avatar w-8 rounded-full overflow-hidden"
        to={`/profile/${postOwner.username}`}
      >
        <img src={post.user.profileImg || "/avatar-placeholder.png"} />
      </Link>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <Link className="font-bold" to={`/profile/${postOwner.username}`}>
            {post.user.fullName}
          </Link>
          <span className="text-slate-500 text-sm">
            <Link to={`/profile/${postOwner.username}`}>
              @{post.user.username}
            </Link>
            <span> · {formatedDate}</span>
          </span>
          {isMyPost && (
            <span className="flex-1 flex justify-end">
              <FaTrash
                className="cursor-pointer hover:text-red-500"
                onClick={handleDeletePost}
              />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post.text}</span>
          {post.img && (
            <img
              src={post.img}
              className="h-80 object-contain border border-gray-700 rounded-lg"
            />
          )}
          <div className="flex justify-between">
            <div
              className="flex gap-1 items-center group cursor-pointer"
              onClick={() =>
                document.getElementById(`comments_modal${post._id}`).showModal()
              }
            >
              <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
              <span className="text-sm text-slate-500 group-hover:text-sky-400">
                {post.comments.length}
              </span>
            </div>

            {/* Modal DaisyUI */}
            <dialog
              id={`comments_modal${post._id}`}
              className="modal border-none outline-none"
            >
              <div className="modal-box border border-gray-700 rounded">
                <h3 className="text-lg font-bold mb-4">COMMENTS</h3>
                <div className="flex flex-col gap-3">
                  {post.comments.map((comment) => (
                    <div
                      className="flex gap-2 w-full items-start"
                      key={comment._id}
                    >
                      <img
                        className="avatar w-8 h-8 shrink-0 rounded-full"
                        src={
                          comment.user.profileImg || "/avatar-placeholder.png"
                        }
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {comment.user.fullName}
                          </span>
                          <span className="text-sm text-slate-700">
                            @{comment.user.username}
                          </span>
                        </div>
                        <div className="text-sm">{comment.text}</div>
                      </div>
                    </div>
                  ))}
                  <form
                    className="flex gap-2 items-center mt-5"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea resize-none w-full focus:outline-none"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full text-white px-6">
                      {isCommenting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <div className="flex gap-1 items-center group cursor-pointer">
              <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
              <span className="text-sm text-slate-500 group-hover:text-green-500">
                0
              </span>
            </div>
            <div
              className="flex gap-1 items-center group cursor-pointer"
              onClick={handleLikePost}
            >
              <FaRegHeart
                className={`w-4 h-4 ${
                  isLiked ? "text-pink-500" : "text-slate-500"
                } group-hover:text-pink-500`}
              />
              <span
                className={`text-sm ${
                  isLiked ? "text-pink-500" : "text-slate-500"
                } group-hover:text-pink-500`}
              >
                {post.likes.length}
              </span>
            </div>
            <FaBookmark className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;