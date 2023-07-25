import { useState } from "react";
import { Button, TextField } from "../lib/FormElements";
import Modal from "../lib/Modal";

import styles from "./SaveQueryModal.module.scss";

import type { SaveQueryModalProps } from "./SaveQueryModal.types";

export default function SaveQueryModal({
  isOpen,
  saveQuery: saveQueryProps,
  hideModal,
}: SaveQueryModalProps) {
  const [title, setTitle] = useState<string>("");
  const saveQuery = () => {
    saveQueryProps(title);
    hideModal();
  };
  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <div className={styles.container}>
        <h4 className={styles.title}>Save Query</h4>
        <p className={styles.description}>
          Please enter a title for your query
        </p>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <Button
            buttonType="primary"
            className={styles.button}
            onClick={hideModal}
          >
            Cancel
          </Button>
          <Button
            buttonType="primary"
            className={styles.button}
            filled
            onClick={saveQuery}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
