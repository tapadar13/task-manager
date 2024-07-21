import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl">Task Manager</div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
