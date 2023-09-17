import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div 
      className="App" 
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems:"center", 
        height:"100vh",
        minHeight:"100%",
        background: "#191b1f"}}>
      <TodoList />
    </div>
  );
}

export default App;
