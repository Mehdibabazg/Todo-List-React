import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { TodosContext } from '../contexts/TodosContext';
import { useContext, useState } from 'react'; 

//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Todo({ todo }) {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({
        title: todo.title, 
        description: todo.description,
    });
    const {todos, setTodos} = useContext(TodosContext);

    function handleCheckClick(){
        const updatedTodos = todos.map((t) => {
            if(t.id === todo.id){
                t.isCompleted = !t.isCompleted;
            }
            return t
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    function handleDeleteClick(){
        setShowDeleteDialog(true);
    }
    function handleDeleteDialogClose(){
        setShowDeleteDialog(false);
    }
    function handleUpdateClick(){
        setShowUpdateDialog(true);
    }
    function handleUpdateClose(){
        setShowUpdateDialog(false);
    }
    function handleDeleteConfirm(){
        const updatedTodos = todos.filter((t) => {
            return t.id !== todo.id;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    function handleUpdateConfirm(){
        const updatedTodos = todos.map((t) => {
            if(t.id === todo.id){
                return {...t, title: updatedTodo.title, description: updatedTodo.description};
            }else{
                return t
            }
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setShowUpdateDialog(false);
    }
    return (
        <>
        {/* DELETE MODAL */}
        <Dialog
            onClose={handleDeleteDialogClose}
            open={showDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you Sure ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to delete this task?
                    This process cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteDialogClose}>Disagree</Button>
                <Button onClick={handleDeleteConfirm} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
        {/* === DELETE MODAL === */}

        {/* EDIT MODAL */}
        <Dialog
            onClose={handleUpdateClose}
            open={showUpdateDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Edit task
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={updatedTodo.title}
                    onChange={(e) => {
                        setUpdatedTodo({...updatedTodo, title: e.target.value})
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={updatedTodo.description}
                    onChange={(e) => {
                        setUpdatedTodo({...updatedTodo, description: e.target.value})
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateClose}>Disagree</Button>
                <Button onClick={handleUpdateConfirm} autoFocus>Confirm</Button>
            </DialogActions>
        </Dialog>
        {/* === EDIT MODAL === */}
          <Card 
            className="todoCard"
            sx={{ minWidth: 275, background: "#283593", color:"white", marginTop: 3 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Typography variant="h5" sx={{ textAlign: "left" , textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                            {todo.title}
                        </Typography>
                        <Typography variant="h6" sx={{ textAlign: "left" }}>
                            {todo.description}
                        </Typography>
                    </Grid>
                    <Grid 
                        xs={4} 
                        display="flex" 
                        justifyContent="space-around" 
                        alignItems="center"
                    >
                        <IconButton 
                            onClick={() => {
                                handleCheckClick();
                            }}
                            className="iconButton" 
                            aria-label="add" 
                            style={{
                                color: todo.isCompleted ? "white" : "#8bc34a", 
                                backgroundColor: todo.isCompleted ? "#8bc34a" : "white", 
                                border: "solid 3px" 
                            }}
                        >
                            <CheckIcon />
                        </IconButton>
                        <IconButton 
                            onClick={handleUpdateClick}
                            className="iconButton" 
                            aria-label="edit" 
                            style={{
                                color: "#1769aa", 
                                backgroundColor: "white", 
                                border: "solid 3px" 
                            }}
                        >
                            <ModeEditOutlineIcon />
                        </IconButton>
                        <IconButton 
                            onClick={handleDeleteClick}
                            className="iconButton" 
                            aria-label="delete" 
                            style={{
                                color: "#b23c17", 
                                backgroundColor: "white", 
                                border: "solid 3px" 
                            }}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
          </Card>
        </>
    );
  }