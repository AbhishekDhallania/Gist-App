
export const Footer = () => {
    return (
        <footer className="mt-1 w-full border-t border-gray-200 py-4">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500 text-center px-2">
                <p>© 2025 GitHub, Inc.</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Terms</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Privacy</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Security</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Status</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Docs</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Contact</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">Manage Cookies</p>
                <p className="hover:underline hover:text-blue-500 cursor-pointer">
                    Do not share my personal information
                </p>
            </div>
        </footer>
    )
}
