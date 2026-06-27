import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { usePostContext } from '../contexts/PostContext';

export default function PostDetailScreen() {
  const { selectedPost } = usePostContext();
  if (!selectedPost) return <Text>No Post selected</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{selectedPost.title}</Text>
      <Text>{selectedPost.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
});