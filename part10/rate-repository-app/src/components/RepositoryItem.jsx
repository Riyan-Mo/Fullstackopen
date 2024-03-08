import { View } from 'react-native';
import RepositoryStats from './RepositoryStats';
import RepositoryHeading from './RepositoryHeading';

export default function RepositoryItem({item}) {
    return (
        <View>
            <RepositoryHeading item={item}/>
           <RepositoryStats item={item}/>
        </View>
    )
}