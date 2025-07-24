// src/components/Navbar.tsx

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 text-white bg-black shadow-md">
      <h1 className="text-xl font-bold tracking-wide">SecureSight Dashboard</h1>
      {/* Optional section for future nav items */}
      {/* <div className="space-x-4">
        <a href="#" className="hover:underline">Settings</a>
        <a href="#" className="hover:underline">Logout</a>
      </div> */}
    </div>
  );
}
