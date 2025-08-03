import { ref } from "vue";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "";

const getRequestConfig = () => {
  const apiKey = localStorage.getItem("bconomy_api_key");
  return apiKey ? { headers: { "X-API-Key": apiKey } } : {};
};

export function items() {
  const itemsLoading = ref(false);
  const itemsError = ref("");

  const fetchItemsSimple = async () => {
    const items = ref([]);

    itemsLoading.value = true;
    itemsError.value = "";

    try {
      const response = await axios.get(
        `${apiUrl}/api/items/select`,
        getRequestConfig()
      );
      items.value = response.data.data;
    } catch (error) {
      itemsError.value =
        error.response?.data?.error || "Failed to fetch items data";
    } finally {
      itemsLoading.value = false;
    }

    return items.value;
  };

  const fetchItems = async () => {
    const items = ref([]);

    itemsLoading.value = true;
    itemsError.value = "";

    try {
      const response = await axios.get(
        `${apiUrl}/api/items`,
        getRequestConfig()
      );
      items.value = response.data.data;
    } catch (error) {
      itemsError.value =
        error.response?.data?.error || "Failed to fetch items data";
    } finally {
      itemsLoading.value = false;
    }

    return items.value;
  };

  return {
    fetchItems,
    fetchItemsSimple,
    itemsLoading,
    itemsError,
  };
}
