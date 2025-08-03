const GUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateApiKey = (req, res, next) => {
  const apiKey = req.header("X-API-Key");

  // If no API key provided, use default config key
  if (!apiKey) {
    req.useDefaultKey = true;
    console.log("Using default API key");
    return next();
  }

  // If API key is provided, validate GUID format
  if (apiKey && GUID_REGEX.test(apiKey)) {
    req.useDefaultKey = false;
    req.userApiKey = apiKey;

    const maskedKey = `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
    console.log(`Using user provided API key: ${maskedKey}`);
    return next();
  }

  // If key is provided but invalid format
  if (apiKey) {
    console.log("Invalid API key format provided");
    return res.status(401).json({
      error:
        "Invalid API key format. Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    });
  }

  return res.status(401).json({ error: "Invalid API key" });
};
