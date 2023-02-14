import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Example from "./example";
// import Example from "./example-ref/example";
// import Example3 from "./tabs-example/example";
import Example from "./from-scratch/example";
import Example2 from "./working-example/example";
function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example2 />
            </DndProvider>
            <hr />
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    );
}

export default App;
