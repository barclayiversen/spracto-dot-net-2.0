import logo from "../assets/logo.png";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Modal({ close, children, className }) {
  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-start pt-4 ${className}`}
    >
      <img src={logo} alt="Logo" className="h-12 w-auto mb-20" />{" "}
      {/* Adjust logo size as needed */}
      {children}
      <button
        onClick={close}
        className="absolute top-3 right-3 text-white text-2xl"
      >
        <FontAwesomeIcon icon={faTimes} /> {/* X icon */}
      </button>
    </div>
  );
}

export default Modal;
