import { useNavigate } from "react-router-dom";
import { Github } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold ml-2 text-gray-800">Auth-sys</h1>
        </div>

        <div className="flex items-center justify-center mb-6">
          <a
            href="https://github.com/constGaurav/auth-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            <span>@constGaurav</span>
          </a>
        </div>

        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Home;
