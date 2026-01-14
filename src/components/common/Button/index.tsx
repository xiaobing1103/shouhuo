import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#1E40AF',
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
};
