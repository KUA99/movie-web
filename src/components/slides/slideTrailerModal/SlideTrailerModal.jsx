import React, { useRef } from "react";

import "./slidetrailermodal.scss";
import Modal, { ModalContent } from "../../modal/Modal";

const SlideTrailerModal = (props) => {
  const { movieItem } = props;

  const iframeRef = useRef(null);

  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };

  return (
    <Modal active={false} id={`modal-${movieItem.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default SlideTrailerModal;
