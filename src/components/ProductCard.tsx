import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Product } from '../types/product';

interface Props {
    product: Product;
    onPress: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${discountedPrice}</Text>
                    <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.rating}>⭐ {product.rating.toFixed(1)}</Text>
                    <Text style={styles.stock}>{product.availabilityStatus}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 14,
        marginHorizontal: 16,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: 110,
        height: 110,
        backgroundColor: '#f1f5f9',
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    category: {
        fontSize: 10,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        fontWeight: '600',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        marginTop: 3,
        lineHeight: 19,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: '#2563eb',
    },
    originalPrice: {
        fontSize: 12,
        color: '#cbd5e1',
        textDecorationLine: 'line-through',
    },
    discountBadge: {
        backgroundColor: '#dcfce7',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    discountText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#16a34a',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    rating: {
        fontSize: 12,
        color: '#64748b',
    },
    stock: {
        fontSize: 11,
        color: '#94a3b8',
    },
});

export default ProductCard;