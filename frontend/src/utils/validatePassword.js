function isPasswordStrong(userPassword) {
  const password = userPassword.trim();
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return password.length ? regex.test(password) : true;
}
export { isPasswordStrong };
