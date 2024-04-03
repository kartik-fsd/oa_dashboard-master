import { toast } from "react-toastify";

const successnotify = (msg) =>
toast(msg, {
  position: "top-center",
  hideProgressBar: true,
  closeOnClick: false,
  className: "bg-success text-white",
});

const warningnotify = (msg) =>
toast(msg, {
  position: "top-center",
  hideProgressBar: true,
  closeOnClick: false,
  className: "bg-warning text-white",
});

export {successnotify,warningnotify}