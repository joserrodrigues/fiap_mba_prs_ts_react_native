import AsyncStorage from "@react-native-async-storage/async-storage";

export async function useGetStorageItem(key: string) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(key).then((value: string | null) => {        
        let jsonInfo = JSON.parse(value!);
        console.log(jsonInfo);
        resolve(jsonInfo);                          
      });
    } catch (e) {
      // error reading value
      console.log("useGetStorageItem Error = ");
      console.log(e);
      resolve(null);
    }
  });
}
export async function useSetStorageItem(key: string, value: object | string | null | undefined) {
  return new Promise((resolve, reject) => {
    try {
      let jsonInfo = JSON.stringify(value);
      AsyncStorage.setItem(key, jsonInfo);
      return true;
    } catch (e) {
      // saving error
      console.log("useSetStorageItem Error = ");
      console.log(e);
    }
    return false;
  });
}
