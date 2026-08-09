// import React from 'react'
// import { useUser,useClerk} from '@clerk/react';

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

// const {user} = useUser();
// const {signOut, openUserProfile} = useClerk()

// return (
//         <div className={`w-60 bg-white border-r border-gray-200 flex flex-col
//         justify-between items-center max-sm: absolute top-14 bottom-0 ${sidebarOpen ?
//         'translate-x-0' : 'max-sm :- translate-x-full'} transition-all duration-300
//         ease-in-out` }>
//             <div className='my-7 w-full'>
//                 <img src={user?.imageUrl} alt="User avatar" className='w-13 rounded-ful
//                 mx-auto'/>
//                 <h1 className='mt-1 text-center'>{user?.fullName}</h1>
//             </div>
//         </div>
//     )
// }

// export default Sidebar

import { useUser, useClerk } from "@clerk/react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  PenSquare,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/ai",
  },
  {
    title: "Community",
    icon: Users,
    path: "/ai/community",
  },
  {
    title: "Blog Titles",
    icon: Hash,
    path: "/ai/block-titles",
  },
  {
    title: "Generate Images",
    icon: Image,
    path: "/ai/generate-images",
  },
  {
    title: "Remove Background",
    icon: Eraser,
    path: "/ai/remove-background",
  },
  {
    title: "Remove Object",
    icon: Scissors,
    path: "/ai/remove-object",
  },
  {
    title: "Resume Review",
    icon: FileText,
    path: "/ai/review-resume",
  },
  {
    title: "Write Article",
    icon: PenSquare,
    path: "/ai/write-article",
  },
  {
    title: "Document Q&A",
    icon: PenSquare,
    path: "/ai/doc-qna",
  },
];

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
    fixed
    top-16
    left-0
    bottom-3

    z-40

    w-56

    bg-[#FCFCFD]

    border-r
    border-gray-200

    shadow-sm

    flex
    flex-col

    overflow-hidden

    transition-all
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
`}
      >
        {/* ================= Profile ================= */}

        <div className="shrink-0 border-b border-gray-100 px-5 py-3">
          <div className="flex flex-col items-center">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border border-primary/20"
            />

            <h2 className="mt-2 text-sm font-semibold text-gray-900 truncate max-w-full">
              {user?.fullName}
            </h2>
          </div>
        </div>

        {/* ================= Navigation ================= */}

        <div className="flex-1 min-h-0 px-3 py-3 overflow-y-auto">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
            Workspace
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  end={item.path === "/ai"}
                  onClick={() => setSidebarOpen(false)}
                >
                  {({ isActive }) => (
                    <div
                      className={`
                      relative

                      flex
                      items-center

                      gap-2.5

                      h-10

                      rounded-xl

                      px-3

                      text-[13px]
                      font-medium

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "bg-primary/8 text-primary"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1"
                      }
                    `}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />
                      )}

                      <Icon
                        size={18}
                        className={`transition duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      />

                      <span>{item.title}</span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* ================= Footer ================= */}

        <div className="shrink-0 border-t border-gray-100 px-4 py-4">
          <button
            onClick={() => signOut()}
            className="
        flex
        h-10
        w-full
        items-center
        justify-center
        gap-2

        rounded-xl

        border
        border-red-200

        bg-red-50

        text-[13px]
        font-medium

        text-red-500

        transition-all
        duration-300

        hover:bg-red-100
        hover:border-red-300
        hover:shadow-sm

        active:scale-95
"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
