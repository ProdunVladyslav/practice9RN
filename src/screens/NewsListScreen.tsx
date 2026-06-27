import React, { useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Task5StackParamList } from '../navigation/types';
import { useNewsContext } from '../contexts/NewsContext';
import NewsCard from '../components/NewsCard';
import { NEWS_CATEGORIES } from '../types/news';

type Nav = NativeStackNavigationProp<Task5StackParamList, 'NewsList'>;

export default function NewsListScreen() {
  const navigation = useNavigation<Nav>();
  const { articles, loading, error, category, query, setCategory, setQuery, fetchNews, setSelectedArticle, toggleFavorite, isFavorite } = useNewsContext();

  useEffect(() => { fetchNews(); }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.topBar}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Search news..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={fetchNews}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={fetchNews}>
            <Text style={styles.searchBtnText}>Go</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {NEWS_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.favLink} onPress={() => navigation.navigate('Favorites')}>
        <Text style={styles.favLinkText}>★ Favorites</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 40 }} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            isFavorite={isFavorite(item)}
            onToggleFavorite={() => toggleFavorite(item)}
            onPress={() => { setSelectedArticle(item); navigation.navigate('NewsDetail'); }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { backgroundColor: '#fff', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8, elevation: 2 },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
  searchBtn: { backgroundColor: '#2c3e50', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  searchBtnText: { color: '#fff', fontWeight: '700' },
  categories: { flexDirection: 'row' },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#eee', marginRight: 8 },
  chipActive: { backgroundColor: '#2c3e50' },
  chipText: { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  favLink: { alignSelf: 'flex-end', margin: 12 },
  favLinkText: { color: '#e67e22', fontWeight: '700', fontSize: 14 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
