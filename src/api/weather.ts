import axios from 'axios';
import { Weather } from '../types/weather';

const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10_000,
});

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const getWeather = async (city: string): Promise<Weather> => {
  const { data } = await weatherClient.get('/weather', {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });
  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    condition: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};
