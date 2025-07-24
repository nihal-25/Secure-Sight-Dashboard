'use client';

import { useEffect, useState } from 'react';

type Camera = {
  id: string;
  name: string;
  location: string;
};

type Incident = {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
};

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch('/api/incidents')
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  return (
    <main className="p-6 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Video Feed + Camera Previews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg relative">
            <p className="text-sm text-gray-300 absolute top-2 left-2">
              📅 11/7/2025 – 03:12:37
            </p>
            <video
              className="w-full h-96 object-cover rounded"
              controls
              poster="/video-placeholder.jpg"
            >
              <source src="/sample-footage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex gap-2 mt-2">
              <img src="/cam1.jpg" alt="Camera 01" className="w-20 h-16 rounded object-cover" />
              <img src="/cam2.jpg" alt="Camera 02" className="w-20 h-16 rounded object-cover" />
              <img src="/cam3.jpg" alt="Camera 03" className="w-20 h-16 rounded object-cover" />
            </div>
          </div>
        </div>

        {/* Right Panel: Incident List */}
        <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4">🔴 {incidents.length} Unresolved Incidents</h2>
          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-gray-800 rounded-lg p-3 flex gap-3 items-start shadow"
              >
                <img
                  src={incident.thumbnailUrl}
                  alt={incident.type}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-400">{incident.type}</h3>
                  <p className="text-sm text-gray-300">
                    📍 {incident.camera.name} – {incident.camera.location}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(incident.tsStart).toLocaleString()} -{' '}
                    {new Date(incident.tsEnd).toLocaleString()}
                  </p>
                </div>
                <button className="text-sm text-green-400 hover:underline">Resolve →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
