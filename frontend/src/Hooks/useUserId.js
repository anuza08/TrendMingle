import { useSelector } from "react-redux";

export const useUserId = () => {
  const userId = useSelector((state) => state.user.currentUser?.id);

  if (!userId) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?.id || null;
  }

  return userId;
};
