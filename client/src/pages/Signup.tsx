import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../components/ui/input.tsx";
import toast from "react-hot-toast"
import { Link } from "react-router-dom";
import axios from "../utils/axios-instance.ts";
import useAuthStore from "@/store/AuthStore";

function Signup() {
  const { authenticate }: any = useAuthStore(state => state)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Creating account...");
    try {
      setLoading(true);
      const result = await axios.post('/auth/register', {
        username: username.trim(),
        email: email.trim(),
        password: password.trim()
      });

      const token = result.data.token
      localStorage.setItem('token', token)
      await authenticate()
      toast.success("Signup Successfully!", { id: toastId });
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed!", { id: toastId });
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-lg border mx-4 p-8 shadow-lg space-y-6"
      >
        <div className="flex items-center justify-center gap-2 rounded-lg">
          <h2 className="text-4xl lg:text-5xl font-bold text-center">Signup</h2>
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="jhondoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
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
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button disabled={loading} type="submit" className="w-full">
          Signup
        </Button>
        <p className="text-center">Already have an account?  <Link className="text-blue-500" to="/login">Login</Link> </p>
      </form>
    </div>
  )
}

export default Signup

