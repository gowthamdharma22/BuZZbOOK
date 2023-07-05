import React from "react";
import "./like.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const Like = ({ id, trigger, setTrigger }) => {
  const [like, setLike] = React.useState(0);

  const [active, setActive] = React.useState(false);
  const userID = window.localStorage.getItem("userID");
  const [cookies, _] = useCookies(["access_token"]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/like/${id}`);
        setLike(res.data.like);
        if (res.data.liked.includes(userID)) {
          setActive(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, userID]);

  const handleClick = async () => {
    if (!cookies.access_token) {
      setTrigger(!trigger);
      return; //need to toastify
    } else if (!active) {
      try {
        setActive(true);
        const updatedLike = like + 1;
        setLike(updatedLike);
        const res = await axios.post(
          `http://localhost:5000/posts/like/${id}`,
          {
            like: updatedLike,
            userID: userID,
          },
          { headers: { authorization: cookies.access_token } }
        );

        setLike(res.data.like);
      } catch (error) {
        console.log(error);
      }
    } else if (active) {
      try {
        setActive(false);
        const updatedLike = like - 1;
        setLike(updatedLike);
        const res = await axios.put(
          `http://localhost:5000/posts/like/${id}`,
          {
            like: updatedLike,
            userID: userID,
          },
          { headers: { authorization: cookies.access_token } }
        );

        setLike(res.data.like);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <button
        className={`button ${active ? "active" : "dislike"}`}
        onClick={handleClick}
      >
        <div className="icon">
          <svg
            className={`prime ${active ? "active" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>
        </div>
        <div className="counter">{like}</div>
      </button>
    </div>
  );
};

export default Like;
