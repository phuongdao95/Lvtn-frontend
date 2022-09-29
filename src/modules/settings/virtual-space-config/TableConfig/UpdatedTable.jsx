import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const UpdateTable = ({open, setOpen}) => {
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
                {"Cập nhật"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {"Heleod"}
            </Typography>
            </Box>
        </Modal>
        </div>
    );
}
export default UpdateTable;