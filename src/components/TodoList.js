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
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import Todo from './Todo';

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

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos);
    const [titleInput, setTitleInput] = useState("")
    const todosJsx = todos.map((t) => {
        return <Todo key={t.id} title={t.title} description={t.description} />
    })
    function handelAddClick(){
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            description: "",
            isCompleted: false
        };
        setTodos([...todos, newTodo]);
        setTitleInput("");
    }
    return (
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h2" sx={{ }}>My Todo List</Typography>
                <Divider />
                <ToggleButtonGroup
                    style={{ marginTop: "3%" }}
                    // value={alignment}
                    exclusive
                    // onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" >
                        All
                    </ToggleButton>
                    <ToggleButton value="center" >
                        Completed
                    </ToggleButton>
                    <ToggleButton value="right" >
                        uncompleted
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
                                handelAddClick();
                            }}
                        >
                            Add</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
      </Container>
    );
}