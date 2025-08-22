"use client";
import { useEffect, useState } from "react";
import { MdWarningAmber } from "react-icons/md"; 
import { RiCheckDoubleFill } from "react-icons/ri";
import { GiPistolGun } from "react-icons/gi";
import { BiDoorOpen } from "react-icons/bi";
import { BiSolidFaceMask } from "react-icons/bi";
import { BiSolidCctv } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa6";


type Incident = {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: {
    name: string;
  };
};

type Props = {
  onIncidentClick: (time: number) => void;
};

const baseTime = new Date("2025-07-21T00:00:00Z");

export default function IncidentList({ onIncidentClick }: Props) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [resolvedCount, setResolvedCount] = useState<number>(0);


  const fetchIncidents = async () => {
    const res = await fetch("/api/incidents?resolved=false");
    const data = await res.json();
    setIncidents(data);
  };

  useEffect(() => {
    fetchIncidents();
    fetchResolvedCount();
  }, []);
  
  const fetchResolvedCount = async () => {
  try {
    const res = await fetch("/api/incidents/resolved-count");
    const data = await res.json();
    setResolvedCount(data.resolvedCount);
  } catch (err) {
    console.error("Error fetching resolved count:", err);
  }
};

  const handleResolve = async (id: string) => {
  setIncidents((prev) => prev.filter((inc) => inc.id !== id));
  setResolvedCount((prev) => prev + 1); 
  await fetch(`/api/incidents/${id}/resolve`, {
    method: "PATCH",
  });
};

  const formatTimeFromBase = (timestamp: string) => {
    const diffSeconds = Math.floor(
      (new Date(timestamp).getTime() - baseTime.getTime()) / 1000
    );
    const mins = Math.floor(diffSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (diffSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);


  const getIncidentIcon = (type: string) => {
  switch (type) {
    case "Unauthorised Access":
      return <BiDoorOpen style={{ marginRight: "6px" , color: "orange"}} />;
    case "Gun Threat":
      return <GiPistolGun style={{ marginRight: "6px" , color: "red" }} />;
    case "Face Recognised":
      return <BiSolidFaceMask style={{ marginRight: "6px", color: "yellow" }} />;
    default:
      return <MdWarningAmber style={{ marginRight: "6px" }} />;
  }
};


  return (
    <div className="incident-list-container">
        <div className="incident-header">
  <h2 className="incident-heading">
    <MdWarningAmber style={{color: "red"}} /> {incidents.length} Unresolved Incident{incidents.length !== 1 ? "s" : ""}
  </h2>
  <span className="resolved-count">
   <RiCheckDoubleFill /> {resolvedCount} Incident{resolvedCount !== 1 ? "s" : ""} Resolved
  </span>
</div>

      <ul className="incident-list">
        {incidents.map((incident) => {
          const secondsFromStart =
            (new Date(incident.tsStart).getTime() - baseTime.getTime()) / 1000;

          return (
           <li
  key={incident.id}
  className={`incident-card ${selectedIncidentId === incident.id ? "selected" : ""}`}
  onClick={() => {
    const secondsFromStart = (new Date(incident.tsStart).getTime() - baseTime.getTime()) / 1000;
    onIncidentClick(secondsFromStart);
    setSelectedIncidentId(incident.id); 
  }}
>

  <img
    src={incident.thumbnailUrl}
    alt="Thumbnail"
    className="incident-thumb"
  />

  <div className="incident-main">
    <div className="incident-info">
      <p className="incident-type">
        {getIncidentIcon(incident.type)}Type:{incident.type}
      </p>
      <p className="incident-camera">
        <BiSolidCctv /> Shop Floor Camera 1
      </p>
      <p className="incident-time">
        <FaRegClock /> {formatTimeFromBase(incident.tsStart)} -{" "}
        {formatTimeFromBase(incident.tsEnd)}
      </p>
    </div>

    <button
      className="resolve-btn"
      onClick={(e) => {
        e.stopPropagation();
        handleResolve(incident.id);
      }}
    >
      Resolve  {' >'}
    </button>
  </div>
</li>

          );
        })}
      </ul>
    </div>
  );
}
