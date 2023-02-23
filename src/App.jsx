import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Example from "./example";
// import Example from "./example-ref/example";
// import Example3 from "./tabs-example/example";
import Example from "./from-scratch/example";
// import Example from "./working-example/example";
// import Bugsnag from "@bugsnag/js";
// import BugsnagPluginReact from "@bugsnag/plugin-react";
// import LogRocket from "logrocket";
import React, { useEffect } from "react";

// Bugsnag.start({
//     apiKey: "42454c478abb0c0b804605e392e81acc",
//     plugins: [new BugsnagPluginReact()],
// });

// const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

function App() {
    // useEffect(() => {
    //     Bugsnag.notify(new Error("Test error"));
    // }, []);
    // LogRocket.init("riubic/react-dnd-tabs");

    return (
        <div className="App">
            {/* <ErrorBoundary>
                </ErrorBoundary> */}
            {/* <DndProvider backend={HTML5Backend}>
                <Example2 />
                </DndProvider>
                <hr />
            */}
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    );
}

export default App;
