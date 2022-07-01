const { VITE_API_PATH } = import.meta.env;

export const ENV = {
  API_PATH: VITE_API_PATH as string,
} as const;
