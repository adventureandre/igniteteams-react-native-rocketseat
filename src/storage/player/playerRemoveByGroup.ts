import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storegeConfig";
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string,group:string){
try{
    const storege =  await playerGetByGroup(group)

    const filterd = storege.filter(player => player.name !== playerName);
    const players =  JSON.stringify(filterd)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)

}catch(error){
    throw error;
}
}