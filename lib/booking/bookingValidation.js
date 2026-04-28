export function validateCustomer(customer) {
  const errors = {};

  if (!customer.name.trim()) {
    errors.name = "Név kell.";
  }

  if (!customer.email.trim()) {
    errors.email = "Email kell.";
  } else if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
    errors.email = "Ez nem email cím.";
  }

  if (!customer.phone.trim()) {
    errors.phone = "Telefonszám kell.";
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.values(errors).some(Boolean);
}
