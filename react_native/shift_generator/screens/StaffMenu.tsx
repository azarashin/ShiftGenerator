import { StyleSheet, Text, View, Button } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native'

export default function StaffMenu() {

    const navigation = useNavigation(); 
    const route = useRoute();
    var staff = route.params.staff;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>従業員メニュー</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.title}>{route.params.staff}さん</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Button title="シフトの希望日を設定する" onPress={() => {navigation.navigate('カレンダー', {staff:staff});}}/>
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
