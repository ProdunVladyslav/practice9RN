import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { User } from '../types/user';
import { Post } from '../types/post';

interface Props {
  post: Post;
  onPress: () => void;
}

export default function PostCard({ post, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{post.title}</Text>
      <Text style={styles.email}>{post.body}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8, padding: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  email: { fontSize: 13, color: '#888', marginTop: 4 },
});