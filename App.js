import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';

import SuppressionDistanceCounter from './SuppressionDistanceCounter';

export default function App() {
    return (
        <PaperProvider>
            <SuppressionDistanceCounter/>
            <StatusBar style="auto"/>
        </PaperProvider>
    );
}
