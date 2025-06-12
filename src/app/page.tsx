import Metronome from './components/Metronome';
import {PrimeReactProvider} from 'primereact/api';

export default function Home() {
    return (
        <div className="min-h-screen p-8 flex items-center justify-center bg-gray-100 dark:bg-gray-900 w-full">
            <PrimeReactProvider>
                <Metronome/>
            </PrimeReactProvider>
        </div>
    );
}
