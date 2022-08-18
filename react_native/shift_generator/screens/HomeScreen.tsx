import { StyleSheet, Text, View, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function HomeScreen() {

    const navigation = useNavigation(); 

    console.log('シフト枠の設定');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>作業を選択してください</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.title}>12346</Text>
            <Button title="シフト枠の設定" onPress={() => {navigation.navigate('日曜日');}}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
