import React, { useEffect, useRef, useState } from "react";
import cameraConfig from "../Config/cameraConfig";
import { detectPlayerGesture } from "./gesture-detection";

const PlayerVideo = () => {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia(cameraConfig)
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        var playPromise = video.play();
        //TODO: ASK
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
            });
        }
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
        onLoad={detectPlayerGesture}
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
