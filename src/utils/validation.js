export function isRequired(value) {
    return value === null || value === undefined || value === '';
  }
  

export function validateEmail(email) {
    if (isRequired(email)) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid";
    } else {
      return "";
    }
  }
  
  export function validatePhoneNumber(phoneNumber) {
    if (isRequired(email)) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      return "Phone Number must be 10 digits";
    } else {
      return "";
    }
  }