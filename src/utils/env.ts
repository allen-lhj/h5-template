interface GlobEnvConfig {
  // Service interface url
  VITE_GLOB_API_URL: string;
  // SW HOST
  VITE_GLOB_SW_HOST: string;
}

/**
 * Get the configuration file variable name
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const { VITE_GLOB_API_URL, VITE_GLOB_SW_HOST } = ENV;

  return {
    VITE_GLOB_API_URL,
    VITE_GLOB_SW_HOST
  };
}
