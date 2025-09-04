import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            to={"/"}
            className="btn btn-sm mb-6 bg-gradient-to-r from-purple-500 to-pink-500 
            text-white shadow-md shadow-purple-400/50 hover:scale-105 transition-all"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          {/* Card */}
          <div
            className="card bg-white/80 backdrop-blur-md 
            shadow-lg shadow-purple-300/40 border border-purple-200/40 rounded-2xl"
          >
            <div className="card-body">
              <h2 className="card-title text-3xl font-extrabold 
                bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 
                bg-clip-text text-transparent drop-shadow-sm mb-6"
              >
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a catchy note title..."
                    className="input input-bordered focus:ring-2 focus:ring-purple-400 shadow-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-40 focus:ring-2 focus:ring-pink-400 shadow-sm"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Buttons */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn px-6 bg-gradient-to-r from-purple-500 to-pink-500 
                    text-white font-semibold shadow-md shadow-purple-400/60 
                    hover:scale-105 hover:shadow-lg transition-all rounded-full"
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
