import React from 'react'
import Lottie from 'lottie-react';
import loading from "./load.json"

function Loading() {
  return (
    <div className="loading-animation">
          <Lottie animationData={loading} />
          {/* <img className="load-logo" src="img/B (White bg).png" alt="" width="400px" /> */}
    </div>
  )
}

export default Loading