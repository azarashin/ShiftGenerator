import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Home from './navigation/Home';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
//    <Navigation colorScheme={colorScheme} />
    return (
      <SafeAreaProvider>

        <Home/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
