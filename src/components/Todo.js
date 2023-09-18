import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

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
    const {todos, setTodos} = useContext(TodosContext);

    function handleCheckClick(){
        const updatedTodos = todos.map((t) => {
            if(t.id === todo.id){
                t.isCompleted = !t.isCompleted;
            }
            return t
        });
        setTodos(updatedTodos)
    }
    function handleDeleteClick(){
        setShowDeleteDialog(true);
    }
    function handleClose(){
        setShowDeleteDialog(false);
    }
    function handleDeleteConfirm(){
        const updatedTodos = todos.filter((t) => {
            return t.id !== todo.id;
        });
        setTodos(updatedTodos);
    }
    return (
        <>
        {/* DELETE MODAL */}
        <Dialog
            onClose={handleClose}
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
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDeleteConfirm} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
        {/* === DELETE MODAL === */}
          <Card 
            className="todoCard"
            sx={{ minWidth: 275, background: "#283593", color:"white", marginTop: 3 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Typography variant="h5" sx={{ textAlign: "left" }}>{todo.title}</Typography>
                        <Typography variant="h6" sx={{ textAlign: "left" }}>{todo.description}</Typography>
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
                            className="iconButton" 
                            aria-label="delete" 
                            style={{
                                color: "#b23c17", 
                                backgroundColor: "white", 
                                border: "solid 3px" 
                            }}
                            onClick={handleDeleteClick}
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