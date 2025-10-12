import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../components/ui/input.tsx";
import { Link } from "react-router-dom";
import axios from "../utils/axios-instance.ts";
import toast from "react-hot-toast";
import useAuthStore from "@/store/AuthStore";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate }: any = useAuthStore(state => state)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Creating account...");
    try {
      setLoading(true)
      const result = await axios.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password: password.trim()
      });

      localStorage.setItem("token", result.data.token);
      await authenticate()
      toast.success("Login Successfully!", { id: toastId });

    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Siginin failed!", { id: toastId });
    }finally{
      setLoading(false)
    } 
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-lg border mx-4 p-8 shadow-lg space-y-6"
      >
        <div className="flex items-center justify-center gap-2 rounded-lg">
          <h2 className="text-4xl lg:text-5xl font-bold text-center">Login</h2>
        </div>

        <div>
          <Label htmlFor="email">Email or Username</Label>
          <Input
            id="email"
            type="email"
            placeholder="jhon@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button disabled={loading} type="submit" className="w-full">
          Login
        </Button>
        <p className="text-center">Don't have an account?  <Link className="text-blue-500" to="/signup">Signup</Link> </p>
      </form>
    </div>
  )
}

export default Login

