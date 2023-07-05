import axios from "axios";
import React from "react";
import Like from "../components/Like";
import Save from "../components/Save";
import Loading from "../components/Loading";
import { toast, Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

function Home() {
  const [post, setPost] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);
  const [cookies, _] = useCookies(["access_token"]);

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/posts");
        setPost(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  React.useEffect(() => {
    if (trigger) {
      toast.error("Time to login or sign up, buddy.", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <div>
      <div>
        <Toaster reverseOrder={false} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {cookies.access_token && (
            <div>
              <Toaster reverseOrder={false} />
            </div>
          )}
          {post.map((props) => (
            <div className="scs" key={props._id}>
              <div className="h-group">
                <h2 className="tit">{props.title}</h2>
                <img src={props.img} width="500px" className="img" />
                <h3 className="h-desc">{props.description}</h3>
                <h3 className="remaining-desc"></h3>
                <div className="btn-grp">
                  <Like
                    id={props._id}
                    trigger={trigger}
                    setTrigger={setTrigger}
                  />
                  <Save
                    postId={props._id}
                    trigger={trigger}
                    setTrigger={setTrigger}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
