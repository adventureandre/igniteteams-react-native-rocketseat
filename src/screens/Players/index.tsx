import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/Buttonicon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

export function Players() {
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState(['andre',"aurora","Milena"])

    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome da Turma"
                subtitle="adicione a galera e separe os times" />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />

                <ButtonIcon
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
                    <PlayerCard name={item} onRemove={()=>{console.log("desc");
                    }}  />
                )}
            />

        </Container>
    )
}
