import { ref } from "vue";
import axios from "axios";

export function items() {
  const itemsLoading = ref(false);
  const itemsError = ref("");

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
    itemsLoading,
    itemsError,
  };
}
