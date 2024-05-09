import React from "react";
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
const dangernotify = (msg) =>
  toast(msg, {
    position: "top-center",
    hideProgressBar: true,
    closeOnClick: false,
    className: "bg-danger text-white",
  });

export { successnotify, warningnotify, dangernotify };
