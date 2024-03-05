import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storegeConfig";

import { PlayerStoregeDTO } from "./PlayerStoregeDTO";
import { playerGetByGroup } from "./playersGetByGroup";


export async function playerAddByGroup(newPlayer: PlayerStoregeDTO, group: string) {
    try {

        const storedPlayer = await playerGetByGroup(group);

        const playerAlreadyExists = storedPlayer.filter(player => player.name === newPlayer.name)

        if (playerAlreadyExists.length > 0) {
            throw new AppError('Essa pessoa já está adicionaa em um time aqui.');
        }

        const storege =  JSON.stringify([...storedPlayer, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storege)

    } catch (error) {
        throw (error)
    };
}
