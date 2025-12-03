export const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};
