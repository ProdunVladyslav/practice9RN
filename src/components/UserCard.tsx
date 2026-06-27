import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { User } from '../types/user';

interface Props {
  user: User;
  onPress: () => void;
}

export default function UserCard({ user, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8, padding: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  email: { fontSize: 13, color: '#888', marginTop: 4 },
});