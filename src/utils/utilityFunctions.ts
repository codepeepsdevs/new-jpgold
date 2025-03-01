export const getReturnPath = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("returnPath") || "/user/dashboard";
  }
  return "/user/dashboard";
};
