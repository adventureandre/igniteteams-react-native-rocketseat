import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";

export function Players() {
    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome da Turma" 
            subtitle="adicione a galera e separe os times" />
        </Container>
    )
}
