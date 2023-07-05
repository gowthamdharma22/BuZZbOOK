import axios from "axios";
import React from "react";
import Like from "../components/Like";
import Save from "../components/Save";
import Loading from "../components/Loading";

function Saved() {
  const [savedPost, setSavedPost] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const userId = window.localStorage.getItem("userID");

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/savedPosts/${userId}`
        );
        setSavedPost(response.data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId, trigger, refresh]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {savedPost.map((props) => (
            <div className="scs" key={props.id}>
              <div className="h-group" key={props.id}>
                <h2 className="tit">{props.title}</h2>
                <img src={props.img} width="500px" className="img" />
                <h3 className="h-desc">{props.description}</h3>
                <h3 className="remaining-desc"></h3>
                <div className="btn-grp">
                  <Like id={props._id} />
                  <Save
                    postId={props._id}
                    trigger={trigger}
                    setTrigger={setTrigger}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

export default Saved;
