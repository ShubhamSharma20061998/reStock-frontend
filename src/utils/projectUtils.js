export const handleLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userID");
};
