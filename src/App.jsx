import "./App.css";
import Player from "./components/Player";

function App() {
  return (
    <main className="py-8">
      <div className="prose container max-w-4xl">
        <h1>React Summary 10</h1>
        <div className="not-prose">
          <Player />
        </div>
      </div>
    </main>
  );
}

export default App;
