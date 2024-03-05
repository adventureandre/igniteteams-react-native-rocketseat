import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/Buttonicon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";


import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStoregeDTO } from "@storage/player/PlayerStoregeDTO";

import { AppError } from "@utils/AppError";
type RouteParams = {
    group: string
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStoregeDTO[]>([]);

    const route = useRoute();

    const { group } = route.params as RouteParams

    async function handleAddPlayer() {
        if (newPlayerName.trim().length == 0) {
            return Alert.alert('Nova pessoa ', "Informe o nome da pessoa para adicionar.")
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }
        try {
            await playerAddByGroup(newPlayer, group);

            

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova Pessoa', "Não foi possivel adicionar")

            }
        }

    }

    async function fetchPlayersByTeam(){
        try{
            const playersByTeam = await playerGetByGroupAndTeam(group,team)
            setPlayers(playersByTeam);
        }catch(error){
            console.log("error", error);
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado');
            
        }
    }

    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group}
                subtitle="adicione a galera e separe os times" />
            <Form>
                <Input
                    onChangeText={setNewPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />

                <ButtonIcon
                    onPress={handleAddPlayer}
                    icon="add"
                />

            </Form>
            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard name={item} onRemove={() => {
                        console.log("desc");
                    }} />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time. "
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />

            <Button
                title="Remover Turma"
                type="SECONDARY"
            />

        </Container>
    );
}
