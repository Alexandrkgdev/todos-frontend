// @ts-ignore
export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const BASE_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL;
export const BASE_TODOS_URL = process.env.NEXT_PUBLIC_TODOS_SERVICE_BASE_URL;