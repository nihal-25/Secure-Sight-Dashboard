"use client";

import "../app/globals.css";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import IncidentList from "@/components/IncidentList";
import { FaTachometerAlt } from "react-icons/fa"; // Dashboard
import { SiMicropython } from "react-icons/si";
import { FaVideo } from "react-icons/fa";         // Cameras
import { MdOutlineVideoSettings } from "react-icons/md"; // Scenes
import { MdWarningAmber } from "react-icons/md";  // Incidents
import { FaUsers } from "react-icons/fa"; 
import { VscRecord } from "react-icons/vsc";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Sample incident data — update with your actual data if needed
  const incidentData = [
    { time: 60, type: "Gun Threat" },
    { time: 300, type: "Unauthorized Access" },
    { time: 600, type: "Face Recognised" },
    { time: 900, type: "Unauthorized Access" },
    { time: 1100, type: "Multiple Events" },
  ];

  const incidentColors: Record<string, string> = {
    "Unauthorized Access": "#f87171",
    "Gun Threat": "#fb923c",
    "Face Recognised": "#60a5fa",
    "Multiple Events": "#a78bfa",
  };

  const handleSeekToTime = (timeInSeconds: number) => {
    if (videoRef.current) {
      const video = videoRef.current;
      const safeTime = Math.min(timeInSeconds, video.duration - 1);
      video.currentTime = safeTime;
      video.play();
    }
  };

  // Update currentTime while video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", update);
    return () => video.removeEventListener("timeupdate", update);
  }, []);

  // Handle scrubber drag
  const handleScrubStart = (e: React.MouseEvent<SVGCircleElement>) => {
    setIsScrubbing(true);
    const svg = e.currentTarget.ownerSVGElement!;
    const onMove = (moveEvent: MouseEvent) => {
      const bounds = svg.getBoundingClientRect();
      const percent = (moveEvent.clientX - bounds.left) / bounds.width;
      const newTime = Math.min(1200, Math.max(0, percent * 1200));
      setCurrentTime(newTime);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    };
    const onUp = () => {
      setIsScrubbing(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <h1 className="brand">
            <span><SiMicropython /> MANDLAC
            <span className="highlight-x">X</span>
            </span>
            </h1>
            </div>
        <div className="navbar-center">
          <nav className="nav-links">
            <Link href="/" className="nav-item active">
            <span><FaTachometerAlt /> Dashboard</span>
            </Link>
            <Link href="/cameras" className="nav-item">
            <span><FaVideo /> Cameras</span>
            </Link>
            <Link href="/scenes" className="nav-item">
            <span><MdOutlineVideoSettings /> Scenes</span>
            </Link>
            <Link href="/incidents" className="nav-item">
            <span><MdWarningAmber /> Incidents</span>
            </Link>
            <Link href="/users" className="nav-item">
            <span><FaUsers /> Users</span>
            </Link>
          </nav>
        </div>
       <div className="navbar-right">
       <div className="user-info">
       <span className="username">Nihal Manjunath</span>
       <span className="email">nihal6mn@gmail.com</span>
      </div>
      <span className="dropdown-arrow">▼</span>
      </div>

      </header>

      {/* Main Section */}
      <main className="main">
        <div className="player-section">
          {/* Video */}
          <video ref={videoRef} controls width="100%" className="vid">
            <source src="/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Camera Thumbnails (Bottom Right Inside Video) */}
          <div className="camera-thumbnaild" style={{ bottom: "500px", left: "25px" }}>
  <p><VscRecord style={{ color: "red"}} /> Camera-01</p>
</div>
          <div className="camera-thumbnails">
            <div className="camera-thumbnail" style={{ bottom: "270px", right: "120px" }}>
  <p>Camera-02</p>
  <img src="/cam2.jpg" alt="Camera 2" />
</div>

<div className="camera-thumbnail" style={{ bottom: "270px", right: "10px" }}>
  <p>Camera-03</p>
  <img src="/cam3.jpg" alt="Camera 3" />
</div>
          </div>

          {/* Timeline Ruler */}
          <div className="timeline-container">
            <svg width="100%" height="80">
              {/* Base line */}
              <line x1="0" y1="50" x2="100%" y2="50" stroke="#aaa" strokeWidth="2" />

              {/* Incident Markers */}
              {incidentData.map((incident, index) => {
                const position = (incident.time / 1200) * 100;
                return (
                  <g
                    key={index}
                    onClick={() => handleSeekToTime(incident.time)}
                    cursor="pointer"
                  >
                    <text
                      x={`${position}%`}
                      y="30"
                      fontSize="10"
                      fill="#fff"
                      textAnchor="middle"
                    >
                      {incident.type}
                    </text>
                    <circle
                      cx={`${position}%`}
                      cy="50"
                      r="6"
                      fill={incidentColors[incident.type]}
                    />
                  </g>
                );
              })}

              {/* Scrubber */}
              <circle
                cx={`${(currentTime / 1200) * 100}%`}
                cy="50"
                r="8"
                fill="#FFD700"
                onMouseDown={handleScrubStart}
              />
            </svg>
          </div>
        </div>

        {/* Incident List */}
        <div className="list-section">
          <IncidentList onIncidentClick={handleSeekToTime} />
        </div>
      </main>
    </div>
  );
}
