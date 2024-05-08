import './App.css';
import { Header } from "./containers/Header/Header"
import { Forecast } from "./containers/Forecast/Forecast"

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Forecast></Forecast>
    </div>
  );
}

export default App;
