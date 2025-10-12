// GistStore.tsx
import { create } from "zustand";
import axios from "../utils/axios-instance.ts";

type Gist = {
  _id: string;
  title: string;
  language: string;
  code: string;
  createdAt: string;
  owner:string
};

type GistStore = {
  gists: Gist[];
  loading: boolean;
  error: string | null;
  fetchGist: (id: string) => Promise<void>;
  fetchOwnerGists : () =>Promise<void>;
  addGist: (gist: Gist) => void;
  deleteGist:(id : String) => Promise<void>;
};

export const useGistStore = create<GistStore>((set) => ({
  gists: [],
  loading: false,
  error: null,
  
  fetchOwnerGists : async() =>{
    try {
      set({loading : true});
      const res = await axios.get(`/gist/mygists`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      set({gists : res.data , loading : false, error : null});
    } catch (err:any) {
      set({ error: err.response?.data?.error || err.message, loading: false });
    }
  },

  fetchGist: async (id: string) => {
    try {
      set({ loading: true });
      const res = await axios.get(`/gist/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: true,
      });
      set({ gists: res.data, loading: false, error: null });
    } catch (err: any) {
      set({ error: err.response?.data?.error || err.message, loading: false });
    }
  },

  addGist: (gist) => set((state) => ({ gists: [...state.gists, gist] })),

  deleteGist: async (id) => {
    try {
      //@ts-ignore
      await axios.delete(`/gist/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: true,
      });
      set((state) => ({ gists: state.gists.filter((g) => g._id !== id) }));
    } catch (err: any) {
      console.error("Delete failed:", err);
    }
  },
}));
