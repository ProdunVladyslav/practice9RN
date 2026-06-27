import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Article } from '../types/news';

interface Props {
  article: Article;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function NewsCard({ article, onPress, isFavorite, onToggleFavorite }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.source}>{article.source.name}</Text>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        {article.description ? (
          <Text style={styles.desc} numberOfLines={2}>{article.description}</Text>
        ) : null}
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favBtn}>
          <Text style={styles.favText}>{isFavorite ? '★ Saved' : '☆ Save'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginHorizontal: 12, marginVertical: 6, borderRadius: 10, elevation: 2, overflow: 'hidden' },
  image: { width: '100%', height: 160 },
  body: { padding: 12 },
  source: { fontSize: 12, color: '#888', marginBottom: 4, textTransform: 'uppercase' },
  title: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 4 },
  desc: { fontSize: 13, color: '#555', marginBottom: 8 },
  favBtn: { alignSelf: 'flex-start' },
  favText: { fontSize: 13, color: '#e67e22', fontWeight: '600' },
});
