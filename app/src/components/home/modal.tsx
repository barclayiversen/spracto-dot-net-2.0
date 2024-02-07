import React, { ReactNode, FC } from "react";
import logo from "/public/logo-white.png"; // Update the path as per your project structure
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define the types for the props
interface ModalProps {
  close: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({ close, children, className = "" }) => {
  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-start pt-4 ${className}`}
    >
      <img src={logo.src} alt="Logo" className="h-12 w-auto mb-20" />
      {children}
      <button
        onClick={close}
        className="absolute top-3 right-3 text-white text-2xl p-4"
      >
        <FontAwesomeIcon icon={faTimes} /> {/* X icon */}
      </button>
    </div>
  );
};

export default Modal;
