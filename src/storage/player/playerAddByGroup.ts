import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storegeConfig";

import { PlayerStoregeDTO } from "./PlayerStoregeDTO";


export async function playerAddBayGroup(newPlayer: PlayerStoregeDTO, group: string) {
    try {

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,'' )

    } catch (error) {
        throw (error)
    };
}
