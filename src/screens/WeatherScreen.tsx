import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeather } from '../api/weather';
import { Weather } from '../types/weather';

const LAST_CITY_KEY = 'weather_last_city';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(LAST_CITY_KEY).then(saved => {
      if (saved) {
        setCity(saved);
        fetchWeather(saved);
      }
    });
  }, []);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const result = await getWeather(cityName.trim());
      setWeather(result);
      await AsyncStorage.setItem(LAST_CITY_KEY, cityName.trim());
    } catch (e: any) {
      const status = e?.response?.status;
      console.log('Weather error:', status, e?.message, e?.response?.data);
      setError(status === 404 ? 'City not found. Please check the name.' : 'Failed to fetch weather. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={() => fetchWeather(city)}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.btn} onPress={() => fetchWeather(city)}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 40 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.cityName}>{weather.city}</Text>
          <Text style={styles.temp}>{weather.temperature}°C</Text>
          <Text style={styles.condition}>{weather.condition}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{weather.windSpeed} m/s</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E6F4FE' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20, textAlign: 'center', color: '#1a5276' },
  row: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 10, fontSize: 15, elevation: 2,
  },
  btn: { backgroundColor: '#1a5276', borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  error: { color: '#c0392b', marginTop: 24, textAlign: 'center', fontSize: 15 },
  card: {
    marginTop: 32, backgroundColor: '#fff', borderRadius: 16, padding: 24,
    elevation: 4, alignItems: 'center',
  },
  cityName: { fontSize: 22, fontWeight: '700', color: '#1a5276' },
  temp: { fontSize: 60, fontWeight: '300', color: '#1a5276', marginVertical: 8 },
  condition: { fontSize: 16, color: '#555', textTransform: 'capitalize', marginBottom: 20 },
  details: { flexDirection: 'row', gap: 40 },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 13, color: '#888' },
  detailValue: { fontSize: 18, fontWeight: '600', color: '#1a5276' },
});
