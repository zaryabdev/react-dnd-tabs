import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Example from "./example";
import Example from './example-ref/example';
function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Example />
        </DndProvider>
    );
}

export default App;
