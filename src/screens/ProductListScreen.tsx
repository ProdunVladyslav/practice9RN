import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProductsContext } from '../contexts/ProductsContext';
import { Task3StackParamList } from '../navigation/types';
import ProductCard from '../components/ProductCard';
import Entry from '../components/Entry';

type Nav = NativeStackNavigationProp<Task3StackParamList, 'ProductList'>;

const ProductListScreen = () => {
    const navigation = useNavigation<Nav>();
    const { filteredProducts, isLoading, error, fetchProducts, setSelectedProduct, totalItems, nameFilter, setNameFilter } =
        useProductsContext();

    useEffect(() => { fetchProducts(); }, []);

    if (isLoading && filteredProducts.length === 0) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>📡</Text>
                <Text style={styles.errorTitle}>No Connection</Text>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={filteredProducts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <ProductCard
                    product={item}
                    onPress={() => {
                        setSelectedProduct(item);
                        navigation.navigate('ProductDetail');
                    }}
                />
            )}
            ListHeaderComponent={
                <View style={styles.listHeader}>

                    <Entry value={nameFilter} onChangeText={setNameFilter} placeholder="Search products..." />

                    <Text style={styles.count}>
                        {filteredProducts.length} of {totalItems ?? '...'} products
                    </Text>
                </View>
            }
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🔍</Text>
                    <Text style={styles.emptyText}>No products found</Text>
                </View>
            }
            contentContainerStyle={styles.list}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={fetchProducts}
                    tintColor="#2563eb"
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 8,
        paddingBottom: 24,
    },
    listHeader: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 6,
    },
    count: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 8,
        marginBottom: 4,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 8,
    },
    errorIcon: {
        fontSize: 52,
        marginBottom: 8,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
    },
    errorMessage: {
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 64,
        gap: 8,
    },
    emptyIcon: {
        fontSize: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#94a3b8',
    },
});

export default ProductListScreen;