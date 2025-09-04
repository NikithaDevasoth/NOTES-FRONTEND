import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully ✨");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note ❌");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-white shadow-lg shadow-purple-400/60 border border-gray-200 
      rounded-2xl transition-all duration-500 ease-out
      hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/70"
    >
      <div className="card-body space-y-3">
        {/* Title */}
        <h3 className="card-title text-xl font-bold text-gray-800 drop-shadow-sm">
          {note.title}
        </h3>

        {/* Content preview */}
        <p className="line-clamp-3 text-gray-600 text-sm leading-relaxed">
          {note.content}
        </p>

        {/* Footer actions */}
        <div className="card-actions justify-between items-center mt-4">
          <span className="badge badge-outline badge-primary shadow-sm px-3 py-1">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            {/* Edit button */}
            <button className="btn btn-sm bg-gradient-to-r from-green-400 to-green-600 
              text-white shadow-md hover:shadow-purple-400 hover:scale-105 transition-all duration-300 flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              Edit
            </button>

            {/* Delete button */}
            <button
              className="btn btn-sm bg-gradient-to-r from-red-400 to-red-600 
              text-white shadow-md hover:shadow-purple-400 hover:scale-105 transition-all duration-300 flex items-center gap-1"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
