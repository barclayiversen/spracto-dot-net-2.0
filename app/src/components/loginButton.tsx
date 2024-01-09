// components/loginButton.tsx

// import React from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// const LoginButton = () => {
//   const { data: session } = useSession();

//   const buttonStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "black",
//     color: "white",
//     border: "2px solid white", // Google's blue color
//     borderRadius: "25px",
//     padding: "10px 20px",
//     cursor: "pointer",
//     fontSize: "16px",
//     fontWeight: "bold",
//     outline: "none",
//     boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
//     transition: "background-color 0.3s, color 0.3s",
//   };

//   const iconStyle = {
//     marginRight: "10px",
//     fontSize: "20px",
//   };

//   if (session) {
//     return (
//       <button onClick={() => signOut()} style={buttonStyle}>
//         Logout
//       </button>
//     );
//   } else {
//     return (
//       <div>
//         <button onClick={() => signIn("google")} style={buttonStyle}>
//           <FontAwesomeIcon icon={faGoogle} style={iconStyle} />
//           Login with Google
//         </button>
//       </div>
//     );
//   }
// };

// export default LoginButton;
