import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppError} from "@utils/AppError";

import { GROUP_COLLECTION } from "../storegeConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroup);

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome.');
        }

        const storage = JSON.stringify([...storedGroups, newGroup])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)

    } catch (error) {
        throw error;
    }
}