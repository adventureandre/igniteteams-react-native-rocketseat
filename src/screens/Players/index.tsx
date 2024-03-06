import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/Buttonicon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";


import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStoregeDTO } from "@storage/player/PlayerStoregeDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

import { AppError } from "@utils/AppError";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
type RouteParams = {
    group: string
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStoregeDTO[]>([]);

    const navigation = useNavigation()
    const route = useRoute();

    const { group } = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null);

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
            newPlayerNameInputRef.current?.blur();
            Keyboard.dismiss();
            setNewPlayerName('');
            fetchPlayersByTeam();



        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova Pessoa', "Não foi possivel adicionar")

            }
        }

    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playerGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam);
            setIsLoading(false);
        } catch (error) {
            console.log("error", error);
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado');

        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();

        } catch (error) {
            console.log(error);
            Alert.alert('Remover Pessoa', 'Não foi possivel remover a pessoa selecionada');

        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate("groups");
        } catch (error) {
            console.log(error);
            Alert.alert('Remover group', "Não foi possivel remover o gropo.")

        }

    }
    async function handleGroupRemove() {
        Alert.alert('Remover', "Deseja remover o grupo?", [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => groupRemove() },
        ])
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group}
                subtitle="adicione a galera e separe os times" />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
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

            {
                isLoading ? <Loading /> :


                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
                        )}
                        ListEmptyComponent={() => (
                            <ListEmpty
                                message="Não há pessoas nesse time. "
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
                    />
            }

            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />

        </Container>
    );
}
