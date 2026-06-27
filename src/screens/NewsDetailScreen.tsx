import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNewsContext } from '../contexts/NewsContext';

export default function NewsDetailScreen() {
  const { selectedArticle, isFavorite, toggleFavorite } = useNewsContext();
  if (!selectedArticle) return <Text style={{ padding: 20 }}>No article selected.</Text>;

  const fav = isFavorite(selectedArticle);

  return (
    <ScrollView style={styles.container}>
      {selectedArticle.urlToImage ? (
        <Image source={{ uri: selectedArticle.urlToImage }} style={styles.image} />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.source}>{selectedArticle.source.name}</Text>
        <Text style={styles.title}>{selectedArticle.title}</Text>
        {selectedArticle.author ? <Text style={styles.author}>By {selectedArticle.author}</Text> : null}
        <Text style={styles.date}>{new Date(selectedArticle.publishedAt).toLocaleDateString()}</Text>
        <TouchableOpacity style={[styles.favBtn, fav && styles.favBtnActive]} onPress={() => toggleFavorite(selectedArticle)}>
          <Text style={styles.favBtnText}>{fav ? '★ Remove from Favorites' : '☆ Add to Favorites'}</Text>
        </TouchableOpacity>
        {selectedArticle.description ? <Text style={styles.desc}>{selectedArticle.description}</Text> : null}
        {selectedArticle.content ? <Text style={styles.content}>{selectedArticle.content.replace(/\[\+\d+ chars\]/, '')}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 220 },
  body: { padding: 16 },
  source: { fontSize: 12, color: '#888', textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 8 },
  author: { fontSize: 13, color: '#555', marginBottom: 2 },
  date: { fontSize: 13, color: '#888', marginBottom: 16 },
  favBtn: { backgroundColor: '#eee', borderRadius: 8, padding: 10, alignItems: 'center', marginBottom: 16 },
  favBtnActive: { backgroundColor: '#fdebd0' },
  favBtnText: { color: '#e67e22', fontWeight: '700' },
  desc: { fontSize: 15, color: '#333', marginBottom: 12, lineHeight: 22 },
  content: { fontSize: 14, color: '#555', lineHeight: 22 },
});
