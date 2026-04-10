import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.data);

  function logout() {
    dispatch(reset());
  }

  return (
    <main className="py-8">
      <div className="prose container max-w-4xl">
        <h1>React Summary 10</h1>
      </div>
    </main>
  );
}

export default App;
