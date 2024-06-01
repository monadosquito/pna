import { Chat } from './components/Chat'

import cs from './App.module.css';


const App = () => {
    return (
        <main>
            <Chat elemClass={cs.root__chat} />
        </main>
    );
}

export default App;

