import React, {useRef} from 'react';
import {Box, Grid} from '@mui/material';
import Register from './components/Register';
import AiCam from './components/AiCam';
import * as aiService from '../../../../client/aiService';

const TimekeepingRegister = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const clickTakePicture = () => {
        console.log('register from timekeepingregister');
        const width = 700;
        const height = width / (16 / 9);
        let video = videoRef.current;
        let photo = photoRef.current;
        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        
        var image = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
        // get data image
        const data = {
            idUser: "123",
            imageName: "Phuong",
            imageData: image,
        };
        console.log(data);
        //call api
        aiService.register(data)
        .then(res => {
            console.log('respose' + JSON.stringify(res));
        })
        .catch(error => console.log('respose error ' + JSON.stringify(error)));
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={8} md={8}>
                    <AiCam videoRef={videoRef} photoRef={photoRef} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Register takePicture={clickTakePicture} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default TimekeepingRegister;