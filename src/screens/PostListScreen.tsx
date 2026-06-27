import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PostCard from '../components/PostCard';
import { usePostContext } from '../contexts/PostContext';
import Entry from '../components/Entry';
import { Task2StackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<Task2StackParamList, 'PostList'>;

const PostListScreen = () => {
    const navigation = useNavigation<Nav>();
    const { nameFilter, posts, loading, error, setNameFilter, fetchPosts, setSelectedPost } = usePostContext();

    useEffect(() => { fetchPosts(); }, []);

    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
    if (error) return <Text>{error}</Text>;
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <PostCard
                    post={item}
                    onPress={() => {
                        setSelectedPost(item);
                        navigation.navigate('PostDetail')
                    }}
                />
            )}
            ListHeaderComponent={Entry} 
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={fetchPosts}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostListScreen;