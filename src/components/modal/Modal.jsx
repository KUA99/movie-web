import { Close } from "@material-ui/icons";
import React, { useEffect, useState, useRef } from "react";

import "./modal.scss";

const Modal = (props) => {
  const { active, id, children } = props;
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    setModalActive(active);
  }, [active]);

  return (
    <div id={id} className={`modal ${modalActive ? "active" : ""}`}>
      {children}
    </div>
  );
};

export const ModalContent = (props) => {
  const { children } = props;
  const modalContentRef = useRef(null);
  const closeModal = () => {
    modalContentRef.current.parentNode.classList.remove("active");
  };

  return (
    <div ref={modalContentRef} className="modal-content">
      {children}
      <div className="modal-content-close" onClick={closeModal}>
        <Close className="modal-content-icon" />
      </div>
    </div>
  );
};
export default Modal;
