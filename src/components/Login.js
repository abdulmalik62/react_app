import { Navigate } from "react-router-dom";

const Login = ({ auth, handleLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {auth === null && (
        <div className="text-gray-600 text-xl">Loading...</div>
      )}
      {auth === false && (
        <div className="text-center bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome!</h1>
          <p className="text-gray-600 mb-6">Please log in to continue.</p>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </div>
      )}
      {auth && <Navigate to="/callback" />}
    </div>
  );
};

export default Login;
