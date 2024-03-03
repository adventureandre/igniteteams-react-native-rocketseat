import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storegeConfig";

export async function groupsGetAll() {
    try {
        const storege = await AsyncStorage.getItem(GROUP_COLLECTION)

        const groups: string[] = storege ? JSON.parse(storege) : [];

        return groups;
    } catch (error) {
        throw error;
    }
}