import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>应用发生错误</Text>
          <Text style={styles.subtitle}>请查看以下错误信息：</Text>
          <ScrollView style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.error?.toString()}
            </Text>
            {this.state.errorInfo && (
              <Text style={styles.stackText}>
                {this.state.errorInfo.componentStack}
              </Text>
            )}
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    maxHeight: 400,
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  stackText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});
