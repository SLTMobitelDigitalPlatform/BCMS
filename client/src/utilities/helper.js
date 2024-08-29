export const validateOTP = (otp) => {
  const regex = /^\d{6}$/;
  return regex.test(otp);
};

export const validateName = (name) => {
  const regex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
  return regex.test(name);
};

export const validateServiceNumber = (serviceNumber) => {
  const regex = /^\d{6}$/;
  return regex.test(serviceNumber);
};
export const validateEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(email);
};

export const validateMobileNumber = (mobileNumber) => {
  const regex = /^(\+94|0)?7\d{8}$/;
  return regex.test(mobileNumber);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
