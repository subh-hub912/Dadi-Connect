import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import AdminPanel from './src/screens/AdminPanel';
import { ensureInitialData, getAppData, saveAppData } from './src/utils/storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appData, setAppData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    await ensureInitialData();
    const storedData = await getAppData();
    setAppData(storedData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateAppData = useCallback(async (nextData) => {
    setAppData(nextData);
    await saveAppData(nextData);
  }, []);

  if (isLoading || !appData) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#B45309" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#FFF4DD" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFF4DD' },
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              appData={appData}
              reloadData={loadData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AdminPanel">
          {(props) => (
            <AdminPanel
              {...props}
              appData={appData}
              updateAppData={updateAppData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4DD',
  },
});
