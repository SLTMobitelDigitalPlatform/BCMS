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
