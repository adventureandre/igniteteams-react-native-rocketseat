import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";
import { useState } from "react";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from "src/storege/group/groupCreate";

export function NewGroup() {
const [group, setGroup] = useState('')



    const navigation = useNavigation()

    async function handleNew() {
        try {
            
            await groupCreate(group);
            navigation.navigate('players', { group });
            
        } catch (error) {
          console.log("error", error);
    
        }

    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="Nova Turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                />
                <Input placeholder="Nome da turma" 
                onChangeText={setGroup} />
                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}