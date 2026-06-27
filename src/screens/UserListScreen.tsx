import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Task1StackParamList } from '../navigation/types';
import { useUserContext } from '../contexts/UserContext';
import UserCard from '../components/UserCard';

type Nav = NativeStackNavigationProp<Task1StackParamList, 'UserList'>;

export default function UserListScreen() {
  const { users, loading, error, fetchUsers, setSelectedUser } = useUserContext();
  const navigation = useNavigation<Nav>();

  useEffect(() => { fetchUsers(); }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          onPress={() => {
            setSelectedUser(item);
            navigation.navigate('UserDetail');
          }}
        />
      )}
    />
  );
}