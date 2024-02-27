import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/Buttonicon";

export function Players() {
    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome da Turma" 
            subtitle="adicione a galera e separe os times" />
            <ButtonIcon icon="rocket" />
        </Container>
    )
}
