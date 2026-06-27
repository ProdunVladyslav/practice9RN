import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const Entry: React.FC<Props> = ({ value, onChangeText, placeholder = 'Search...' }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
    },
    input: {
        height: 44,
        backgroundColor: '#f1f5f9',
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 14,
        color: '#1a1a1a',
    },
});

export default Entry;