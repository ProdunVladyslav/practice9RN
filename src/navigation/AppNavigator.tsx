import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import PostListScreen from '../screens/PostListScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import WeatherScreen from '../screens/WeatherScreen';
import NewsListScreen from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {
  Task1StackParamList,
  Task2StackParamList,
  Task3StackParamList,
  Task4StackParamList,
  Task5StackParamList,
} from './types';

const Drawer = createDrawerNavigator();
const Stack1 = createNativeStackNavigator<Task1StackParamList>();
const Stack2 = createNativeStackNavigator<Task2StackParamList>();
const Stack3 = createNativeStackNavigator<Task3StackParamList>();
const Stack4 = createNativeStackNavigator<Task4StackParamList>();
const Stack5 = createNativeStackNavigator<Task5StackParamList>();

const Task1Stack = () => (
  <Stack1.Navigator>
    <Stack1.Screen name="UserList" component={UserListScreen} options={{ title: 'Users' }} />
    <Stack1.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User Details' }} />
  </Stack1.Navigator>
);

const Task2Stack = () => (
  <Stack2.Navigator>
    <Stack2.Screen name="PostList" component={PostListScreen} options={{ title: 'Posts' }} />
    <Stack2.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Post Details' }} />
  </Stack2.Navigator>
);

const Task3Stack = () => (
  <Stack3.Navigator>
    <Stack3.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
    <Stack3.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
  </Stack3.Navigator>
);

const Task4Stack = () => (
  <Stack4.Navigator>
    <Stack4.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather Forecast' }} />
  </Stack4.Navigator>
);

const Task5Stack = () => (
  <Stack5.Navigator>
    <Stack5.Screen name="NewsList" component={NewsListScreen} options={{ title: 'News' }} />
    <Stack5.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: 'Article' }} />
    <Stack5.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
  </Stack5.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Task 1">
        <Drawer.Screen name="Task 1" component={Task1Stack} />
        <Drawer.Screen name="Task 2" component={Task2Stack} />
        <Drawer.Screen name="Task 3" component={Task3Stack} />
        <Drawer.Screen name="Task 4" component={Task4Stack} />
        <Drawer.Screen name="Task 5" component={Task5Stack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
