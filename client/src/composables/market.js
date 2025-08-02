import { ref } from "vue";
import axios from "axios";

export function market() {
  const marketLoading = ref(false);
  const marketError = ref("");

  const searchMarket = async (itemId = 0) => {
    return await fetchItemMarketDataById(itemId);
  };

  const fetchItemMarketDataById = async (itemId) => {
    marketLoading.value = true;
    marketError.value = "";
    var marketValues = null;

    try {
      const response = await axios.get(`/api/market/${itemId}`);
      marketValues = response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        marketError.value = "Market not found";
      } else {
        marketError.value = "";
      }
      marketValues = null;
    } finally {
      marketLoading.value = false;
    }

    return marketValues;
  };

  return {
    marketLoading,
    marketError,
    fetchItemMarketDataById,
  };
}
