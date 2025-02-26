import { toast, Slide } from "react-toastify";

const toastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

function showSuccessToast(message) {
  toast.success(message, toastOptions);
}

function showErrorToast(message) {
  toast.error(message, toastOptions);
}

export { showSuccessToast, showErrorToast };
