import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';

import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export default function Todo({title, description}) {
    return (
        <>
          <Card 
            className="todoCard"
            sx={{ minWidth: 275, background: "#283593", color:"white", marginTop: 3 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Typography variant="h5" sx={{ textAlign: "left" }}>{title}</Typography>
                        <Typography variant="h6" sx={{ textAlign: "left" }}>{description}</Typography>
                    </Grid>
                    <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center">
                        <IconButton className="iconButton" aria-label="delete" style={{color: "#8bc34a", backgroundColor: "white", border: "solid 3px" }}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton className="iconButton" aria-label="delete" style={{color: "#1769aa", backgroundColor: "white", border: "solid 3px" }}>
                            <ModeEditOutlineIcon />
                        </IconButton>
                        <IconButton className="iconButton" aria-label="delete" style={{color: "#b23c17", backgroundColor: "white", border: "solid 3px" }}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
          </Card>
        </>
    );
  }