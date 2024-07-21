import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-blue-600 p-2 flex justify-between items-center">
        <div className="text-white text-xl">☰</div>
        <div>
          <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm mr-2">
            Login
          </button>
          <button className="text-white text-sm">Signup</button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-80">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Login</h2>
          <div className="bg-white p-6 rounded shadow-md border-2 border-blue-600">
            <form className="space-y-3">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full bg-blue-600 text-white p-2 rounded"
                type="submit"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm mt-4 font-semibold">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </p>
            <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded flex items-center justify-center text-sm">
              Login with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
