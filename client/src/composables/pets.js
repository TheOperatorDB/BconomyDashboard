import { ref } from "vue";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "";

const getRequestConfig = () => {
  const apiKey = localStorage.getItem("bconomy_api_key");
  return apiKey ? { headers: { "X-API-Key": apiKey } } : {};
};

export function pets() {
  const petsLoading = ref(false);
  const petsError = ref("");

  const searchPet = async (petId) => {
    if (!petId) {
      petsError.value = "";
      return;
    }

    const parsedPetId = parseInt(petId);
    if (isNaN(parsedPetId)) {
      return;
    }

    return await fetchPetData(parsedPetId);
  };

  const fetchPetData = async (petId) => {
    petsLoading.value = true;
    petsError.value = "";
    var currentPet = null;

    try {
      const response = await axios.get(
        `${apiUrl}/api/pets/${petId}`,
        getRequestConfig()
      );
      currentPet = response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        petsError.value = "Pet not found";
      } else {
        petsError.value = "";
      }
      currentPet = null;
    } finally {
      petsLoading.value = false;
    }

    return currentPet;
  };

  return {
    petsLoading,
    petsError,
    searchPet,
  };
}
