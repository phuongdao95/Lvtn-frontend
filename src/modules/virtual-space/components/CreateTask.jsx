import React, {useState} from 'react';
import { Paper, Button, Typography, IconButton, Box, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FBF8F8',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const ModalCreate = ({open, setOpen}) => {
    const handleClose = () => setOpen(false);
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {"Tạo mới"}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {new Date().toString()}
                </Typography>
            </Box>
        </Modal>
        </div>
    );
}

const CreateTask = () => {
    const [open, setOpen] = useState(false);
    const openCreateModal = () => {
        setOpen(true);
    }
    return (
    <>
        {ModalCreate({open, setOpen})}
        <IconButton size="large" sx={{
            position: 'fixed',
            zIndex: 99,
            bottom: 0,
            left: 320,
            bgcolor: '#2196f3',
            '&:hover': {
                bgcolor: '#2196f3',
            },
        }} 
            onClick={() => openCreateModal()}
        >
            <AddIcon sx={{color: 'white', fontSize: '45px'}} />
        </IconButton>
    </>
    );
}

export default CreateTask;