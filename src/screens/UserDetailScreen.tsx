import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useUserContext } from '../contexts/UserContext';

export default function UserDetailScreen() {
  const { selectedUser } = useUserContext();
  if (!selectedUser) return <Text>No user selected</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{selectedUser.name}</Text>
      <Text>{selectedUser.email}</Text>
      <Text>{selectedUser.phone}</Text>
      <Text>{selectedUser.company.name}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
});