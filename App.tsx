import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './src/contexts/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import { PostProvider } from './src/contexts/PostContext';
import { ProductsProvider } from './src/contexts/ProductsContext';
import { NewsProvider } from './src/contexts/NewsContext';

export default function App() {
  return (
    <NewsProvider>
      <ProductsProvider>
        <PostProvider>
          <UserProvider>
            <AppNavigator/>
          </UserProvider>
        </PostProvider>
      </ProductsProvider>
    </NewsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
