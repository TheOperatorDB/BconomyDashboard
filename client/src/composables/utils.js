export function utils() {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";

    return new Date(dateString).toLocaleDateString();
  };

  function timestampToDaysAgo(timestamp) {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    d.setHours(0, 0, 0, 0);

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return Math.abs(Math.floor((now - d) / (1000 * 60 * 60 * 24)));
  }

  return {
    formatDate,
    timestampToDaysAgo,
  };
}
