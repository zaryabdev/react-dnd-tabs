import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Example from "./tabs-example/example";
import Example from "./pics-example/example";
import EaxmpleMe from "./pics-me-example/example";
function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
            <hr />
            <DndProvider backend={HTML5Backend}>
                <EaxmpleMe />
            </DndProvider>
        </div>
    );
}

export default App;
