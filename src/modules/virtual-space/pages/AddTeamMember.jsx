import React from 'react';
import { Close } from '@mui/icons-material';
import { IconButton, Box, Typography, DialogActions, Button } from '@mui/material';
import { blue } from "@mui/material/colors"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddLeader({ closeCb = () => { }, reload }) {

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={true}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row', bgcolor: blue[500], justifyContent: 'space-between'
                }}>
                    <DialogTitle >
                        <Typography variant="h5" color="white" component="span">
                            {"Thêm thành viên mới"}
                        </Typography>
                    </DialogTitle>
                    <IconButton onClick={() => closeCb()}>
                        <Close />
                    </IconButton>
                </Box>

                <Box sx={{ py: 1, px: 2 }}>

                    <DialogActions>
                        <Button onClick={closeCb}>
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={() => { }} >
                            Thêm thành viên
                        </Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </React.Fragment>
    );
}
