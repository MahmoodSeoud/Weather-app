// Env vars
const API_BASE_URL_DIRECT: any = process.env.REACT_APP_API_BASE_URL_DIRECT;
const API_BASE_URL_WEATHER: any = process.env.REACT_APP_API_BASE_URL_WEATHER;

const API_KEY_NAME: any = process.env.REACT_APP_API_KEY_NAME;
const API_KEY_VALUE: any = process.env.REACT_APP_API_KEY_VALUE; 

console.log(API_KEY_NAME)

export const APILocation = (location: string): string => {
   return `${API_BASE_URL_DIRECT}?q=${location.trim()}&limit=1&${API_KEY_NAME}=${API_KEY_VALUE}`;
}

export const APITemp = (locationArr: number[]): string => {
    return `${API_BASE_URL_WEATHER}?lat=${locationArr[0]}&lon=${locationArr[1]}&${API_KEY_NAME}=${API_KEY_VALUE}`;
}


