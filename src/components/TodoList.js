import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { TodosContext } from '../contexts/TodosContext';
import { useContext, useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Todo from './Todo';


export default function TodoList() {

    const {todos, setTodos} = useContext(TodosContext)
    const [titleInput, setTitleInput] = useState("");
    const [displayedTodosType, setDisplayedTodosType] = useState("all")



    const completedTodos = todos.filter((t) => {
        return t.isCompleted;
    });

    const unCompletedTodos = todos.filter((t) => {
        return !t.isCompleted;
    });

    let todosToBeRendered = todos;

    if(displayedTodosType === "completed")
    {
        todosToBeRendered = completedTodos;

    }else if(displayedTodosType === "uncompleted"){
        todosToBeRendered = unCompletedTodos;
    }

    const todosJsx = todosToBeRendered.map((t) => {
        return <Todo key={t.id} todo={t} />
    });

    useEffect(() => {
        console.log("callinng use effect");
        const storageTodos = JSON.parse(localStorage.getItem("todos"));
        setTodos(storageTodos);
    }, []);

    function changeDisplayType(e){
        setDisplayedTodosType(e.target.value);
    }
    function handleAddClick(){
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            description: "",
            isCompleted: false
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTitleInput("");
    }

    return (
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{
            maxHeight: "88vh",
            overflow: "scroll"
        }}>
            <CardContent>
                <Typography variant="h2" sx={{ }}>My Todo List</Typography>
                <Divider />
                <ToggleButtonGroup
                    style={{ marginTop: "3%" }}
                    value={displayedTodosType}
                    exclusive
                    onChange={changeDisplayType}
                    aria-label="text alignment"
                    color="primary"
                >
                    <ToggleButton value="all" >
                        All
                    </ToggleButton>
                    <ToggleButton value="completed" >
                        Completed
                    </ToggleButton>
                    <ToggleButton value="uncompleted" >
                        Uncompleted
                    </ToggleButton>
                </ToggleButtonGroup>
                {todosJsx}
                <Grid container style={{marginTop: "20px" }} spacing={2}>
                    <Grid 
                        xs={8} 
                        display="flex" 
                        justifyContent="space-around" 
                        alignItems="center"
                    >
                        <TextField 
                            style={{width: "100%" }}
                            id="outlined-basic" 
                            label="Task title" 
                            variant="outlined" 
                            value={titleInput}
                            onChange={(e) => {
                                setTitleInput(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid 
                        xs={4} 
                        display="flex" 
                        justifyContent="space-around" 
                        alignItems="center"
                        // style={{backgroundColor: "orange" }}
                    >
                        <Button 
                            variant="contained"
                            style={{width: "100%", height: "100%", fontWeight:"bold" }}
                            onClick={() => {
                                handleAddClick();
                            }}
                            disabled={titleInput.length === 0}
                        >
                            Add</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
      </Container>
    );
}