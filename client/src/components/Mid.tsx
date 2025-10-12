import { useState } from 'react'
import { Button } from './ui/button.tsx'
import { Input } from './ui/input.tsx'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../utils/axios-instance.ts';
import { useGistStore } from '@/store/GistStore';

export const Mid = () => {
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState("")
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const addGist = useGistStore((state) => state.addGist)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !language || !code) {
            toast.error("All Fields are required")
            return;
        }

        const toastId = toast.loading("Creating Gist...")
        try {
            setLoading(true);
            const response = await axios.post(
                "/gist/create",
                { title, language, code },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            const createdGist = response.data;

            console.log(createdGist)
            addGist(createdGist);
            toast.success("Gist Created Successfully!", { id: toastId })
            console.log("Gist created:", response.data);
            navigate("/gists");

        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to create gist Or try login before gist creation", {
                id: toastId,
            });
            console.error("Error creating gist:", error);
            alert(error.response?.data?.error || "Failed to create gist")
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full flex justify-center px-4">
            <div className="container mx-auto px-4">
                {/* Header Text */}
                <div className="text-center p-6 sm:p-10 text-2xl sm:text-4xl font-thin">
                    Instantly share code, notes, and snippets.
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full flex flex-col gap-4">
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full"
                                placeholder="Gist Title..."
                            />

                            <Input
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full"
                                placeholder="Language (e.g. JavaScript, Python)"
                            />

                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full resize-none min-h-[200px] border border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Code..."
                            />

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                                >
                                    {loading ? "Creating..." : "Create Gist"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
