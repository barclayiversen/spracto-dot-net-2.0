import React from "react";

const clientId =
  "691690250596-37r32dvl2p5tn2s37g4olm5h6skkd6pv.apps.googleusercontent.com";
const redirectUri = "http://localhost:3000/admin"; // e.g., http://localhost:3000/admin

function AdminLogin() {
  const handleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20email%20profile&access_type=online&prompt=consent`;
    window.location.href = url;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default AdminLogin;
