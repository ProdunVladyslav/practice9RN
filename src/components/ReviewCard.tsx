import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductReview } from '../types/product';

interface Props {
    review: ProductReview;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const date = new Date(review.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{review.reviewerName.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{review.reviewerName}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <Text style={styles.stars}>{stars}</Text>
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 14,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1e293b',
    },
    date: {
        fontSize: 11,
        color: '#94a3b8',
        marginTop: 2,
    },
    stars: {
        fontSize: 14,
        color: '#f59e0b',
        letterSpacing: 1,
    },
    comment: {
        fontSize: 13,
        color: '#475569',
        lineHeight: 20,
    },
});

export default ReviewCard;