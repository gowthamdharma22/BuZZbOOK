import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

function UserCreate() {
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();
  const [post, setPost] = React.useState({
    title: "",
    description: "",
    img: "",
    like: 0,
    owner: userID,
  });
  const [cookies, _] = useCookies(["access_token"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleChange2 = async (e) => {
    const file = e.target.files[0];
    try {
      const base64Data = await convertToBase64(file);
      setPost({ ...post, img: base64Data });
    } catch (error) {
      console.error(error);
    }
  };

  const load = (isLoading) => {
    if (isLoading) {
      return toast.loading("Creating...", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cookies.access_token) {
      toast.error("Please log in or sign up.", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
      return; //need to add toaster
    }
    const loadingToastId = load(true);
    try {
      await axios.post("http://localhost:5000/posts", post, {
        headers: { authorization: cookies.access_token },
      });
      setPost({
        title: "",
        description: "",
        img: "",
        like: 0,
        owner: userID,
      });
      navigate("/");
    } catch (error) {
      toast.error("Whoa! Oversized Pic!", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
      console.error(error);
    } finally {
      toast.dismiss(loadingToastId);
      if (setPost.title) {
        toast.success("Created", {
          duration: 1000,
          style: {
            color: "#101010",
            backgroundColor: "#f3ebeb",
            padding: "18px",
            fontSize: "15px",
          },
        });
      }
    }
  };

  return (
    <div className="ctn">
      <div className="loading">
        <Toaster />
      </div>
      <form className="cform" onSubmit={handleSubmit}>
        <label htmlFor="title" className="c-lab">
          Title :{" "}
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          className="c-inp"
          value={post.title}
          required="true"
        />
        <label htmlFor="description" className="c-lab">
          Description :{" "}
        </label>
        <textarea
          name="description"
          cols="30"
          rows="8"
          onChange={handleChange}
          className="c-des"
          value={post.description}
          required="true"
        ></textarea>
        <label htmlFor="img" className="c-lab">
          Photo :{" "}
        </label>
        <input
          type="file"
          accept=".jpg, .png, .jpeg"
          name="img"
          onChange={handleChange2}
          className="c-pto"
          required="true"
        />
        <button type="submit" className="c-btn">
          Create
        </button>
      </form>
    </div>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default UserCreate;
