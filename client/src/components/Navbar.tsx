import { Bell, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/AuthStore'

export const Navbar = () => {
    const { user, logout }: any = useAuthStore(state => state)
    const navigate = useNavigate();
    async function handleClick() {
        navigate("/gists");
    }

    return (
        <header className="w-full bg-[rgba(46,66,179,0.23)] p-4">
            <div className="flex justify-between items-center">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                    <p className="font-bold text-xl sm:text-2xl">Instant Gist</p>
                    <p
                        onClick={handleClick}
                        className="cursor-pointer font-semibold text-sm sm:text-base"
                    >
                        All Gist
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Logout */}
                    <Button
                        onClick={logout}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-md"
                    >
                        Logout
                    </Button>

                    {/* Bell & Plus  */}
                    <div className="hidden md:flex items-center gap-3">
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                    </div>

                    {/* Avatar */}
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                        <AvatarImage src="#" />
                        <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}
