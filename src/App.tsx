import { useState } from "react";
import "./App.css";
import { Command } from '@tauri-apps/plugin-shell';

function App() {
    const [output, setOutput] = useState("Click button to run wipe tool...");
    const [isRunning, setIsRunning] = useState(false);

    async function runWipe() {
        setIsRunning(true);
        setOutput("Running...");

        try {
            // 1. Setup the sidecar command
            const command = Command.sidecar("binaries/wipe");
            
            // 2. Execute it and wait for the result
            // .execute() is simpler than .spawn() if you just want the final output
            const result = await command.execute();

            // 3. Display the result
            if (result.code === 0) {
                setOutput(result.stdout);
            } else {
                setOutput(`${result.stderr}`);
            }
        } catch (err) {
            setOutput(`Error executing sidecar: ${err}`);
        } finally {
            setIsRunning(false);
        }
    }

    return (
        <main className="container">
            <h1>wipe-tool</h1>

            <div className="row">
                <button onClick={runWipe} disabled={isRunning}>
                    {isRunning ? "Running..." : "Run Wipe Binary"}
                </button>
            </div>

            <pre className="output-area">
                {output}
            </pre>
        </main>
    );
}

export default App;
