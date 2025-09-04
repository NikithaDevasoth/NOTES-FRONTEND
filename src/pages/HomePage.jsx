import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import AnimatedFooterText from "../components/AnimatedFooterText.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="ml-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Loading notes...
            </p>
          </div>
        )}

        {/* No Notes Found */}
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

        {/* Notes Grid */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {notes.map((note, idx) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} index={idx} />
            ))}
          </div>
        )}
      </div>

      {/* 🚀 Animated Footer */}
      <footer className="w-full py-6 border-t border-purple-200/50 bg-white/40 backdrop-blur-md">
        <AnimatedFooterText />
      </footer>
    </div>
  );
};

export default HomePage;
