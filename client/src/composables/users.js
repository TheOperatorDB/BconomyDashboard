import { ref } from "vue";
import axios from "axios";

export function users() {
  const usersLoading = ref(false);
  const usersError = ref("");

  const searchUser = async (userId) => {
    if (!userId) {
      usersError.value = "";
      return;
    }

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return;
    }

    return await fetchUserData(parsedUserId);
  };

  const fetchUserData = async (userId) => {
    usersLoading.value = true;
    usersError.value = "";
    var currentUser = null;

    try {
      const response = await axios.get(`/api/users/${userId}`);
      currentUser = response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        usersError.value = "User not found";
      } else {
        usersError.value = "";
      }
      currentUser = null;
    } finally {
      usersLoading.value = false;
    }

    return currentUser;
  };

  return {
    usersLoading,
    usersError,
    searchUser,
  };
}
