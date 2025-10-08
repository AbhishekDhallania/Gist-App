import { Footer } from "@/components/Footer"
import { Mid } from "@/components/Mid"
import { Navbar } from "@/components/Navbar"

export const Gist = () => {

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden w-full">
      <Navbar />
      <Mid />
      <Footer />
    </div>
  )
}
