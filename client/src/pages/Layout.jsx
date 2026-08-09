// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { X, Menu } from "lucide-react";
// import SideBar from "../components/SideBar";

// const Layout = () => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="flex flex-col items-start justify-start w-full h-start">
//       <nav>
//         <img
//           src={assets.logo}
//           alt="Logo"
//           className="w-32 sm:w-44"
//           onClick={() => navigate("/")}
//         />
//         {sidebarOpen ? (
//           <X
//             className="w-6 h-6 sm:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         ) : (
//           <Menu
//             className="w-6 h-6 text-gray-600 sm:hidden"
//             onClick={() => setSidebarOpen(true)}
//           />
//         )}
//       </nav>
//       <div className='flex1 w-full flex h-[calc(100vh-64px)]'>
//         <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <div className="flex-1">
//             <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";
import SideBar from "../components/SideBar";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">

      {/* ================= Navbar ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}

        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="w-36 cursor-pointer"
        />

        {/* Mobile Menu */}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

      </nav>

      {/* ================= Dashboard Layout ================= */}

      <div className="flex pt-16">

        {/* Sidebar */}

        <SideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}

        <main
          className="
            flex-1
            ml-0
            sm:ml-60
            min-h-[calc(100vh-64px)]
            bg-[#F4F7FB]
            p-5
            sm:p-8
            overflow-y-auto
            transition-all
            duration-300
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;
