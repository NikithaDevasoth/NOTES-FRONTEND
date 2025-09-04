import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md 
      shadow-md shadow-purple-300/40 border-b border-purple-200/50">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 
            bg-clip-text text-transparent drop-shadow-sm tracking-tight">
            Quick Notes
          </h1>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 
              text-white shadow-md shadow-purple-400/60 
              hover:scale-105 hover:shadow-lg hover:shadow-pink-400/60 
              transition-all duration-300 flex items-center gap-2 rounded-full px-4"
            >
              <PlusIcon className="size-5" />
              <span className="font-medium">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
