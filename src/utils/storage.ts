import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  return result ? JSON.parse(result) : null;
};

export const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
