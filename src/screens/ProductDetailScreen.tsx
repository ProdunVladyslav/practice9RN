import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useProductsContext } from '../contexts/ProductsContext';
import ReviewCard from '../components/ReviewCard';

const ProductDetailScreen = () => {
    const { selectedProduct } = useProductsContext();

    if (!selectedProduct) return null;

    const p = selectedProduct;
    const discountedPrice = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);
    const isLowStock = p.stock < 10;

    const details: [string, string][] = [
        ['SKU', p.sku],
        ['Brand', p.brand ?? '—'],
        ['Weight', `${p.weight} g`],
        ['Dimensions', `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`],
        ['Warranty', p.warrantyInformation],
        ['Shipping', p.shippingInformation],
        ['Return Policy', p.returnPolicy],
        ['Min. Order', String(p.minimumOrderQuantity)],
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Images */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                {p.images.map((img, i) => (
                    <Image key={i} source={{ uri: img }} style={styles.image} resizeMode="contain" />
                ))}
            </ScrollView>

            <View style={styles.content}>

                {/* Title block */}
                <Text style={styles.category}>{p.category}</Text>
                <Text style={styles.title}>{p.title}</Text>
                {p.brand && <Text style={styles.brand}>by {p.brand}</Text>}

                {/* Price */}
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${discountedPrice}</Text>
                    <Text style={styles.originalPrice}>${p.price.toFixed(2)}</Text>
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{Math.round(p.discountPercentage)}%</Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    {[
                        { value: `⭐ ${p.rating.toFixed(1)}`, label: 'Rating' },
                        { value: String(p.stock), label: 'In Stock' },
                        { value: String(p.minimumOrderQuantity), label: 'Min Order' },
                    ].map((stat, i, arr) => (
                        <React.Fragment key={stat.label}>
                            <View style={styles.stat}>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                            {i < arr.length - 1 && <View style={styles.statDivider} />}
                        </React.Fragment>
                    ))}
                </View>

                {/* Status badge */}
                <View style={[styles.statusBadge, isLowStock && styles.statusBadgeLow]}>
                    <Text style={[styles.statusText, isLowStock && styles.statusTextLow]}>
                        {p.availabilityStatus}
                    </Text>
                </View>

                {/* Description */}
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{p.description}</Text>

                {/* Details table */}
                <Text style={styles.sectionTitle}>Details</Text>
                <View style={styles.detailsCard}>
                    {details.map(([label, value], i) => (
                        <View
                            key={label}
                            style={[styles.detailRow, i === details.length - 1 && styles.detailRowLast]}
                        >
                            <Text style={styles.detailLabel}>{label}</Text>
                            <Text style={styles.detailValue}>{value}</Text>
                        </View>
                    ))}
                </View>

                {/* Tags */}
                <View style={styles.tagsRow}>
                    {p.tags.map(tag => (
                        <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>#{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Reviews */}
                <Text style={styles.sectionTitle}>Reviews ({p.reviews.length})</Text>
                {p.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                ))}

                <View style={{ height: 40 }} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageScroll: {
        backgroundColor: '#f8fafc',
    },
    image: {
        width: 300,
        height: 280,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f1f5f9',
    },
    content: {
        padding: 16,
    },
    category: {
        fontSize: 11,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '600',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        marginTop: 4,
        lineHeight: 28,
    },
    brand: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 3,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 14,
    },
    price: {
        fontSize: 28,
        fontWeight: '800',
        color: '#2563eb',
    },
    originalPrice: {
        fontSize: 16,
        color: '#cbd5e1',
        textDecorationLine: 'line-through',
    },
    discountBadge: {
        backgroundColor: '#dcfce7',
        borderRadius: 7,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    discountText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#16a34a',
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        borderRadius: 14,
        padding: 16,
        marginTop: 18,
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1e293b',
    },
    statLabel: {
        fontSize: 11,
        color: '#94a3b8',
        marginTop: 3,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e2e8f0',
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#dcfce7',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 14,
    },
    statusBadgeLow: {
        backgroundColor: '#fef9c3',
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#16a34a',
    },
    statusTextLow: {
        color: '#ca8a04',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0f172a',
        marginTop: 26,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
    },
    detailsCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        overflow: 'hidden',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    detailRowLast: {
        borderBottomWidth: 0,
    },
    detailLabel: {
        fontSize: 13,
        color: '#94a3b8',
        flex: 1,
    },
    detailValue: {
        fontSize: 13,
        color: '#1e293b',
        fontWeight: '500',
        flex: 2,
        textAlign: 'right',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 18,
    },
    tag: {
        backgroundColor: '#eff6ff',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#2563eb',
        fontWeight: '500',
    },
});

export default ProductDetailScreen;