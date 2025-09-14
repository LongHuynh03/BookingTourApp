// Environment configuration
export const ENV_CONFIG = {
// API URLs for different environments
  API_URLS: {
    development: 'http://192.168.100.247:3000/api',
  },
};

export const getApiUrl = (): string => {
    return ENV_CONFIG.API_URLS.development;
};