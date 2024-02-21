import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';



export default function Groups() {

  const [groups, setGroups] = useState<string[]>(['Galera Roketa',"andre Gato","ele e lindo"]);

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
        <GroupCard 
        title={item} 
        
        />
        )}
      />

    </Container>
  );
};
