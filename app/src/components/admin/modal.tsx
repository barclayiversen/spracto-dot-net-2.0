import React from "react";

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

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  handleFormSubmit,
  formValues,
  handleFormChange,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-gray-400 p-5 rounded">
        <button onClick={closeModal} className="close-button">
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

export default Modal;
