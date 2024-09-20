import Swal from "sweetalert2";

export const successAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const updateAlert = (
  title,
  text,
  confirmButtonText,
  successMessage,
  errorMessage,
  updateFunction
) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateFunction();
          Swal.fire("Updated!", successMessage, "success");
          resolve("success");
        } catch (error) {
          console.error(errorMessage, error);
          Swal.fire("Error!", errorMessage, "error");
          reject("error");
        }
      } else {
        reject("cancel");
      }
    });
  });
};

export const errorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
};

export const deleteAlert = (
  title,
  text,
  confirmButtonText,
  successMessage,
  errorMessage,
  deleteFunction
) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteFunction();
        Swal.fire("Deleted!", successMessage, "success");
      } catch (error) {
        console.error(errorMessage, error);
        Swal.fire("Error!", errorMessage, "error");
      }
    }
  });
};
