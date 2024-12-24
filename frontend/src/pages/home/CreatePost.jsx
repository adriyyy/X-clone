import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef(null);

  const data = {
    profileImg: "/avatars/boy1.png",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-4 p-4 items-start border-b border-gray-700">
      <div className="avatar w-8 rounded-full">
        <img src={data.profileImg || "/avatar-placeholder.png"} />
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea border-none resize-none p-0 focus:outline-none top-0 text-lg"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <div className="relative mx-auto w-72">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white w-5 h-5 cursor-pointer"
              onClick={() => setImg(null)}
            />
            <img
              src={img}
              className="h-72 object-contain w-full rounded mx-auto"
            />
          </div>
        )}
        <div className="flex justify-between border-t border-gray-700 py-2">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-6 h-6 cursor-pointer" />
          </div>
          <input type="file" hidden ref={imgRef} onChange={handleImgChange} />
          <button className="btn btn-sm btn-primary rounded-full text-white px-4">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
