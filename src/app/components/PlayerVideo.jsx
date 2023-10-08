import React, { useEffect, useRef, useState } from "react";
import cameraConfig from "../Config/cameraConfig";

const PlayerVideo = () => {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia(cameraConfig)
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
    <div>
      <video
        id="player-video"
        className="min-h-298 w-full object-cover block -scale-x-100"
        poster="assets/human.png" //TODO: CHANGE
        autoPlay
        playsInline
        ref={videoRef}
      />
    </div>
  );
};

export default PlayerVideo;
