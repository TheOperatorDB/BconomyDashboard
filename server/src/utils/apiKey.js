export function getApiKeyForRequest(req) {
  return req?.userApiKey || config.apiKey;
}
