"use client";
import React, { useRef, useEffect } from "react";

type Props = {
  seekTo: number;
};

const IncidentPlayer = ({ seekTo }: Props) => {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const cam1Ref = useRef<HTMLVideoElement>(null);
  const cam2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mainVideoRef.current && seekTo !== null) {
      mainVideoRef.current.currentTime = seekTo;
      mainVideoRef.current.play();

      // Optionally sync other camera views
      if (cam1Ref.current) {
        cam1Ref.current.currentTime = seekTo;
        cam1Ref.current.play();
      }
      if (cam2Ref.current) {
        cam2Ref.current.currentTime = seekTo;
        cam2Ref.current.play();
      }
    }
  }, [seekTo]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Main Video */}
      <video ref={mainVideoRef} width="100%" controls>
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Thumbnails */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
          gap: "8px",
        }}
      >
        {/* Cam 1 Thumbnail */}
        <video
          ref={cam1Ref}
          width="150"
          muted
          style={{ border: "2px solid #ccc", borderRadius: "6px" }}
        >
          <source src="/cam1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Cam 2 Thumbnail */}
        <video
          ref={cam2Ref}
          width="150"
          muted
          style={{ border: "2px solid #ccc", borderRadius: "6px" }}
        >
          <source src="/cam2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default IncidentPlayer;
