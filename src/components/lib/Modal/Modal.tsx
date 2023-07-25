import ReactModal from "react-modal";

import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.types";

export default function Modal({
  isOpen,
  hideModal,
  className,
  overlayClassName,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <ReactModal
      isOpen={isOpen}
      parentSelector={() => document.getElementById("modals") as HTMLElement}
      className={className || styles.modal}
      overlayClassName={overlayClassName || styles.overlay}
      onRequestClose={hideModal}
    >
      {children}
    </ReactModal>
  );
}
