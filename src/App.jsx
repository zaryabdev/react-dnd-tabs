import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Example from "./example";
import Example from './example-ref/example';
// import Example from './pics-example/example';
// import Example from "./tabs-example/example";
function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>

        </div>
    );
}

export default App;
