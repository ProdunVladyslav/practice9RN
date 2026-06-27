# Practice 9 — React Native Expo App

A multi-feature mobile app built with Expo, React Navigation, Axios, and AsyncStorage.

---

## Features

### Task 1 — Users
- Fetches a list of users from [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- Tap a user to view their full details on a separate screen

### Task 2 — Posts
- Fetches a list of posts from JSONPlaceholder
- Filter posts by keyword using the search input
- Tap a post to view its full content

### Task 3 — Products
- Fetches products from [DummyJSON](https://dummyjson.com)
- Tap a product to view details including price, rating, and reviews

### Task 4 — Weather Forecast
- Enter any city name to get the current weather
- Displays temperature, humidity, wind speed, and weather condition
- Shows a friendly error message if the city is not found
- Saves the last searched city in AsyncStorage and restores it automatically on next launch

### Task 5 — News
- Fetches top headlines from [NewsAPI](https://newsapi.org) by category
- Categories: General, Business, Technology, Sports, Entertainment, Health, Science
- Search news by keyword
- Tap an article to read its full details
- Save articles to Favorites with one tap
- Favorites are stored in AsyncStorage and restored automatically on next launch
- Dedicated Favorites screen showing all saved articles

---

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
   EXPO_PUBLIC_DUMMY_JSON_API=https://dummyjson.com
   EXPO_PUBLIC_WEATHER_API_KEY=your_openweathermap_key
   EXPO_PUBLIC_NEWS_API_KEY=your_newsapi_key
   ```

3. Run on Android:
   ```bash
   npm run android
   ```

## API Keys

| Service | Where to get |
|---|---|
| OpenWeatherMap | https://openweathermap.org/api (free plan) |
| NewsAPI | https://newsapi.org (free developer plan) |
