import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-blue-600 p-2 flex justify-between items-center">
        <div className="text-white text-xl">☰</div>
        <div>
          <button className="text-white text-sm mr-2">Login</button>
          <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm">
            Signup
          </button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-80">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Signup</h2>
          <div className="bg-white p-6 rounded shadow-md border-2 border-blue-600">
            <form className="space-y-3">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                placeholder="First Name"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                placeholder="Last Name"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="w-full bg-blue-600 text-white p-2 rounded"
                type="submit"
              >
                Signup
              </button>
            </form>
            <p className="text-center text-sm mt-4 font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
            <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded flex items-center justify-center text-sm">
              Signup with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
