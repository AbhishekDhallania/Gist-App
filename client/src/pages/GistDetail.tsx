import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../utils/axios-instance.ts"

export const GistDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [gist, setGist] = useState<any>(null)
  async function fetchGist() {
    try {
      const res = await axios.get(`/gist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setGist(res.data.gist)
    } catch (error) {
      console.error("Error fetching gist:", error)
    }
  }

  useEffect(() => {
    fetchGist()
  }, [])

  if (!gist) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Title: {gist.title}</h1> <h2>Date: {new Date(gist.createdAt).toDateString()}</h2>
      </div>
      <p className="font-semibold text-gray-500">Language: {gist.language}</p>
      <pre className="mt-4 p-4 border rounded bg-gray-100 overflow-x-auto">
        {gist.code}
      </pre>
    </div>
  )
}
