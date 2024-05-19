import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="w-screen fixed z-50 py-4 px-2 bg-slate-100">
      <div className="flex w-full h-full items-center justify-around md:gap-4 ">
        <img src="logo192.png" alt="logo" className="w-8 h-8" />
        <Link className="text-base font-semibold" to="/">
          Home
        </Link>

        <div className="flex items-center justify-center">
          {user && (
            <>
              <span className="text-base font-semibold text-blue-700 pe-4">
                Hello {user.displayName || user.email}
              </span>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none"
                onClick={() => signOut(auth)}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
