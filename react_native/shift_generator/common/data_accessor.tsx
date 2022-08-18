import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage: Storage = new Storage({
    // 最大容量
    size: 1000,
    // バックエンドにAsyncStorageを使う
    storageBackend: AsyncStorage,
    // キャッシュ期限(null=期限なし)
    defaultExpires: null,
    // メモリにキャッシュするかどうか
    enableCache: true,
})

export function DASave_Slot(slot: string, required: number) { 
    var key = 'slot:' + slot;
    storage.save({
        key: key, 
        data: {
            required: required
        }
    });
}

export function DALoad_Slot(slot: string, callback: (retRequired: number) => void) { 
    var key = 'slot:' + slot;
    storage.load({
        key : key
      }).then((data) => {
        // 読み込み成功時処理
        callback(data.required); // --> { col1: 'hoge', col2: 100 }
      }).catch(err => {
        // 読み込み失敗時処理
        console.log('load failed.');
        callback(0);
      });
}
