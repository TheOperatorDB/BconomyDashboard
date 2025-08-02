import { ref } from "vue";
import axios from "axios";

export function items() {
  const itemsLoading = ref(false);
  const itemsError = ref("");

  const fetchItemsSimple = async () => {
    const items = ref([]);

    itemsLoading.value = true;
    itemsError.value = "";

    try {
      const response = await axios.get(`/api/items/select`);
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
      const response = await axios.get(`/api/items`);
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
