import { Players } from '@screens/Players';
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerGetByGroupAndTeam(group:string, team:string) {
    try{
        const storege =  await playerGetByGroup(group);

        const players = storege.filter(player => player.team === team);

        return players;

    }catch(error){
        throw error;
    }
}