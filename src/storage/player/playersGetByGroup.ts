import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStoregeDTO } from "./PlayerStoregeDTO";
import { PLAYER_COLLECTION } from "@storage/storegeConfig";

export async function playerGetByGroup(group:string){
    try{
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

        const players: PlayerStoregeDTO[] = storage ? JSON.parse(storage) : [];

        return players;

    }catch(error){
        throw error;
    }
}