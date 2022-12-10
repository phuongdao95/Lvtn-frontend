import React, { Fragment, useRef, useState } from 'react';
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {Box, Grid} from '@mui/material';
import Info from '../components/Info';
import Aicam from '../components/Aicam';
import * as aiService from '../../../client/aiService';
import Snackbar from '../../../components/Snackbar/Snackbar';

export default function CheckIn() {
const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [state, setState] = useState({
        open: false,
        type: 'info',
        message: '',
    });
    const clickTakePicture = (form, done) => {
        console.log('recognize from timekeeping');
        let video = videoRef.current;
        let photo = photoRef.current;
        const width = 700; 
        photo.width = width;
        const height = width / (16 / 9);
        photo.height = height;
        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        
        var image = photo.toDataURL("image/png");
        // get data image
        const data = {
            imageName: window.localStorage.getItem('user_id'),
            imageData: [image],
            dto: form,
        };
        console.log(data);
        //call api
        aiService.uploadImage(data)
        .then(res => {
            console.log('respose ' + res.data + ' ' + res.status)
            if (res.data == window.localStorage.getItem('user_id')) {
                done();
                setState({
                    type: 'success',
                    message: 'Chấm công thành công',
                    open: true,
                })
                return true;
            }
            setState({
                type: 'warning',
                message: 'Thất bại! Xin hãy thử lại!',
                open: true,
            })
            return true;
        })
        .catch(error => {
            console.log('respose error ' + JSON.stringify(error));
            setState({
                type: 'error',
                message: 'Không thể nhận diện khuôn mặt!',
                open: true,
            })
            return false;
        });
    }


    return (
    <Fragment>
        <Snackbar state={state} close={() => setState({...state, open: false})} />
        <Box sx={{
            padding: 2,
            background: 'white'
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 4,
                }}>
                    <Typography fontSize={30}
                        textTransform={"capitalize"}
                        fontWeight={500}
                        color={grey[800]}
                    >
                        Chấm công
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={8} md={8}>
                                <Aicam videoRef={videoRef} photoRef={photoRef} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Info takePicture={clickTakePicture} />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box >
    </Fragment>
    );
}