import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import { TodosContext } from './contexts/TodosContext'; 
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialTodos = [
  {
      id: uuidv4(),
      title: "task1",
      description: "lorem ipsum 1",
      isCompleted: false
  },
  {
      id: uuidv4(),
      title: "task2",
      description: "lorem ipsum 2",
      isCompleted: false
  },
  {
      id: uuidv4(),
      title: "task3",
      description: "lorem ipsum 3",
      isCompleted: false
  }
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <div 
      className="App" 
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems:"center", 
        height:"100vh",
        minHeight:"100%",
        background: "#191b1f"}}
      >
      <TodosContext.Provider value={{todos, setTodos}}>    
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
