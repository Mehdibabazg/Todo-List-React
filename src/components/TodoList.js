import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Todo from './Todo';


export default function TodoList() {
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
                <Todo />
            </CardContent>
        </Card>
      </Container>
  );
}