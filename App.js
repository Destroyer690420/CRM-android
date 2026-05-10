import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabNavigator} from './src/navigation/TabNavigator';
import {colors} from './src/theme/colors';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: colors.accent,
            background: colors.background,
            card: colors.surface,
            text: colors.textPrimary,
            border: colors.border,
            notification: colors.accent,
          },
          fonts: {
            regular: {fontFamily: 'System', fontWeight: '400'},
            medium: {fontFamily: 'System', fontWeight: '500'},
            bold: {fontFamily: 'System', fontWeight: '700'},
            heavy: {fontFamily: 'System', fontWeight: '900'},
          },
        }}>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;