import React, { useState, useEffect } from "react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValues: {
    trackId: string;
    platform: string;
    dlUrl: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTrackModal: React.FC<
  ModalProps & {
    startModalCloseAnimation: () => void;
    handleModalAnimationEnd: () => void;
    modalAnimationState: string;
  }
> = ({
  isModalOpen,
  closeModal,
  handleFormSubmit,
  formValues,
  handleFormChange,
  startModalCloseAnimation,
  handleModalAnimationEnd,
  modalAnimationState,
}) => {
  const [animationState, setAnimationState] = useState("entering");

  const handleCloseStart = () => {
    console.log("set animation state to leaving");
    setAnimationState("leaving"); // Start the fade-out animation
  };

  const handleAnimationEnd = () => {
    console.log("handle animation end");
    console.log("animationState:", animationState);

    if (animationState === "leaving") {
      setAnimationState("exited");
      closeModal(); // Actually close the modal
    }
  };

  // Automatically start the enter animation when the modal is opened
  useEffect(() => {
    if (isModalOpen) {
      setAnimationState("entering");
    }
  }, [isModalOpen]);

  if (!isModalOpen && modalAnimationState !== "leaving") return null;

  return (
    <div
      className={`modal-overlay ${
        modalAnimationState === "leaving"
          ? "animate-fade-out-.5"
          : "animate-fade-in-.5"
      }`}
      onAnimationEnd={handleModalAnimationEnd}
    >
      <div className="modal-content bg-gray-400 p-5 rounded">
        <button onClick={startModalCloseAnimation} className="close-button">
          Close
        </button>
        <form onSubmit={handleFormSubmit} className="add-track-form">
          <input
            type="text"
            name="trackId"
            value={formValues.trackId}
            onChange={handleFormChange}
            placeholder="Track ID"
          />
          <input
            type="text"
            name="platform"
            value={formValues.platform}
            onChange={handleFormChange}
            placeholder="Platform"
          />
          <input
            type="text"
            name="dlUrl"
            value={formValues.dlUrl}
            onChange={handleFormChange}
            placeholder="Download URL"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrackModal;
