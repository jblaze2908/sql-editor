import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import type { ToastMessageType } from "./ToastMessage.types";
import type { Id } from "react-toastify";

export default function ToastMessage() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={4000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />
  );
}

export const showToastMessage = (
  type: ToastMessageType,
  message: string,
  previousIdToUpdate?: Id
) => {
  if (previousIdToUpdate) {
    if (type === "loading") {
      throw new Error("invalid toast message type for update toast");
    }
    return toast.update(previousIdToUpdate, {
      render: message,
      type,
      isLoading: false,
    });
  }
  switch (type) {
    case "info":
    case "error":
    case "success":
    case "loading":
      return toast[type](message);
    default:
      throw new Error("invalid toast message type");
  }
};
