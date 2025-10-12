import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { useGistStore } from "@/store/GistStore";
import { Trash2, Eye, Loader } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const GistList = () => {

  const { gists, fetchOwnerGists, loading, deleteGist } = useGistStore();
  const navigate = useNavigate()

  useEffect(() => {
    fetchOwnerGists()
  }, [])

  if (loading) {
    return <div className="h-screen flex items-center justify-center ">
      <Loader className="text-3xl size-8 animate-spin" />
    </div>
  }

  const handleDelete = async (id: string) => {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <p className="text-sm">Are you sure you want to delete this gist?</p>
      <div className="flex gap-2">
        <button
          onClick={async () => {
            await deleteGist(id);
            toast.success("Gist deleted successfully");
            toast.dismiss(t.id); // close confirm toast
          }}
          className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)} // cancel
          className="px-3 py-1 bg-gray-300 rounded-md text-sm"
        >
          No
        </button>
      </div>
    </div>
  ), {
    duration: 4000, // auto-close after 4s if no action
  });
};

  return (
    <div className="p-6">
      <Button onClick={() => navigate('/')} className="ml-6">Go to Home</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        { gists.length === 0 ? (
          <p>No Gists Found</p>
        ) : (gists.map((gist) => (
          gist ?
        <Card
        key={gist._id} 
          className="hover:shadow-lg transition-all"
        >
          <CardContent className="p-4 flex flex-col justify-between h-full">
            {/* Top part */}
            <div
              className="cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{gist.title}</h2>
              <p className="text-sm text-gray-500">{gist.language}</p>
              <p className="mt-2 text-gray-700 line-clamp-2">{gist.code}</p>
              <span className="text-xs text-gray-400">
                {new Date(gist.createdAt).toDateString()}
              </span>
            </div>

            {/* Bottom icons */}
            <div className="flex justify-end gap-4 mt-4">
              <Eye
                className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition"
              onClick={() => navigate(`/gists/${gist._id}`)}
              />
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={() => handleDelete(gist._id)}
              />
            </div>
          </CardContent>
        </Card> : 
        <div className="text-3xl flex justify-center">You Dont have any Gist </div>
        )) )
        }
      </div>
    </div>
  )
}
