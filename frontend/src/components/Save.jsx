import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./save.css";

function Save({ postId, trigger, setTrigger, refresh, setRefresh }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [saved, setSaved] = React.useState([]);
  const userId = window.localStorage.getItem("userID");
  const [cookies, _] = useCookies(["access_token"]);

  React.useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/savedPosts/ids/${userId}`
        );
        setSaved(response.data.savedPost);
      } catch (error) {
        console.error(error);
      }
    };
    if (cookies.access_token) fetchSavedPosts();
  }, []);

  React.useEffect(() => {
    setIsChecked(saved.includes(postId));
  }, [saved, postId]);

  const handleCheckboxChange = async () => {
    if (!cookies.access_token) {
      setTrigger(!trigger);
      return; //need to toastify
    }
    if (!isChecked) {
      try {
        setIsChecked(true);
        const res = await axios.put(
          "http://localhost:5000/posts",
          {
            postId: postId,
            userId: userId,
          },
          { headers: { authorization: cookies.access_token } }
        );
      } catch (error) {
        console.log(error);
      }
    } else if (isChecked) {
      try {
        setIsChecked(false);
        const res = await axios.put(
          "http://localhost:5000/posts/remove",
          {
            postId: postId,
            userId: userId,
          },
          { headers: { authorization: cookies.access_token } }
          );
          setTrigger(!refresh);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="main">
      <input
        type="checkbox"
        id="box"
        checked={!isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        className={!isChecked ? "grp" : "grps"}
        onClick={handleCheckboxChange}
      >
        <label className="box" htmlFor="box">
          <FontAwesomeIcon
            icon={solidBookmark}
            id="savelo"
            className={!isChecked ? "save" : "saved"}
          />
        </label>
        <span className={!isChecked ? "s-sp" : "s-sps"}>
          {isChecked ? "Saved" : "Save"}
        </span>
      </div>
    </div>
  );
}

export default Save;
