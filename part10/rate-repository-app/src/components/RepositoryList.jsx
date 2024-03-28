import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 15,
    backgroundColor: "#e1e5e8",
  },
  center: {
    textAlign: 'center',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories}) => {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator
    />
  );
}

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;