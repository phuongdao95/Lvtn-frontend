import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal as ModalMui } from '@mui/material';

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

const Modal = ({open, setOpen, data}) => {
    const handleClose = () => setOpen(false);
    return (
        <div>
        <ModalMui
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
                    {data.title}
                </Typography>
            </Box>
        </ModalMui>
        </div>
    );
}
export default Modal;