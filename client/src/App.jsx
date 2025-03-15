import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DashBoard from "./DashBoard/DashBoard";


function App() {
  const { loginWithPopup, getAccessTokenSilently,logout, user, isAuthenticated,isLoading } = useAuth0();


  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center">Loading...</div>;
  }



  const handleLogin = async () => {
    try {
      await loginWithPopup();  // Open Auth0 login popup
      await getAccessTokenSilently(); // Retrieve access token (optional)
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-gray-900 text-white">
      {!isAuthenticated ? (
        <div className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Welcome to NoteNest 📝</h2>
          <button
            onClick={handleLogin}
            className="mt-5 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition"
          >
            Login with Auth0
          </button>
        </div>
      ) : (
        <>
          {/* Navbar */}
          <nav className="w-full flex flex-wrap items-center justify-between p-4 bg-gray-800 text-white shadow-md">
            <h3 className="text-lg md:text-xl font-semibold truncate">Welcome, {user?.given_name}</h3>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </nav>

          {/* Dashboard */}
          <DashBoard />
        </>
      )}
    </div>
  );
}

export default App;
