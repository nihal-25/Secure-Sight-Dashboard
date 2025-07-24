"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Incident {
  id: number;
  startTime: number;
  endTime: number;
  description: string;
  type: string;
}

export default function ViewerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    // Simulate incident fetch
    setIncidents([
      { id: 1, startTime: 5, endTime: 10, description: "Object detected", type: "Alert" },
      { id: 2, startTime: 20, endTime: 25, description: "Motion detected", type: "Motion" },
      { id: 3, startTime: 40, endTime: 50, description: "Intrusion alert", type: "Critical" },
    ]);
  }, []);

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-semibold">Incident Viewer</h1>

      <div className="mb-6">
        <video
          ref={videoRef}
          onLoadedMetadata={handleLoadedMetadata}
          controls
          className="w-full rounded-lg shadow-md"
        >
          <source src="/sample-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Timeline */}
      {duration > 0 && (
        <div className="relative w-full h-6 mb-10 bg-gray-200 rounded">
          {incidents.map((incident) => {
            const left = `${(incident.startTime / duration) * 100}%`;
            const width = `${((incident.endTime - incident.startTime) / duration) * 100}%`;
            return (
              <div
                key={incident.id}
                className="absolute top-0 h-full bg-red-500 cursor-pointer"
                style={{ left, width }}
                onClick={() => handleSeek(incident.startTime)}
                title={incident.description}
              />
            );
          })}
        </div>
      )}

      {/* Incident Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {incidents.map((incident) => (
          <Card
            key={incident.id}
            onClick={() => handleSeek(incident.startTime)}
            className="transition cursor-pointer hover:shadow-lg"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Incident {incident.id}</h2>
                <Badge variant="destructive">{incident.type}</Badge>
              </div>
              <p className="text-sm text-gray-600">{incident.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Time: {incident.startTime}s - {incident.endTime}s
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
