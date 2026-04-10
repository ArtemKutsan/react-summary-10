import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  return (
    <main className="py-8">
      <div className="prose container max-w-4xl">
        <h1>React Summary 10</h1>
      </div>
    </main>
  );
}

export default App;
