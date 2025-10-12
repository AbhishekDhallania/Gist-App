import toast from 'react-hot-toast'
import axios from '../utils/axios-instance.ts'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
  logout: () => {
    set({ user: null, isLoading: false, isLoggedIn: false, error: null })
    localStorage.clear()
    toast.success('logout success')
  },
  authenticate: async () => {
    try {
      set({ isLoading: true })
      const res = await axios.get('auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      set({ user: res.data.user, isLoggedIn: true, error: null, isLoading: false })
    } catch (error: any) {
    
      set({ error: error.message, isLoading: false })
      localStorage.clear()
    }
  },
}))

export default useAuthStore