import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Task5StackParamList } from '../navigation/types';
import { useNewsContext } from '../contexts/NewsContext';
import NewsCard from '../components/NewsCard';

type Nav = NativeStackNavigationProp<Task5StackParamList, 'Favorites'>;

export default function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const { favorites, setSelectedArticle, toggleFavorite, isFavorite } = useNewsContext();

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No saved articles yet.</Text>
        <Text style={styles.emptyHint}>Tap ☆ on any article to save it here.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
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
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  emptyHint: { fontSize: 14, color: '#888', textAlign: 'center' },
});
