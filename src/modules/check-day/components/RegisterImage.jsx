import React, {useRef} from 'react';
import {Box, Grid} from '@mui/material';
import Register from './Register';
import Aicam from './Aicam';
import * as aiService from '../../../client/aiService';

const RegisterImage = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const clickTakePicture = (inputId, inputName) => {
        console.log('register from timekeepingregister');
        let video = videoRef.current;
        let photo = photoRef.current;
        const width = 700; 
        photo.width = width;
        const height = width / (16 / 9);
        photo.height = height;
        let listImage = [];
        var i, image;

        for(i = 0; i < 20; i++) {
            let ctx = photo.getContext('2d');
            ctx.drawImage(video, 0, 0, width, height);
            image = photo.toDataURL("image/png");
            listImage.push(image);
            setTimeout(() => {
            }, 100);
        }

        // get data image
        const data = {
            idUser: inputId,
            imageName: inputName,
            imageData: listImage,
        };
        // call api
        aiService.register(data)
        .then(res => {
            // console.log('respose ' + JSON.stringify(res));
            console.log('respose ' + res.data + ' ' + res.statusText + ' ' + res.status);
            alert('Thành công!');
        })
        .catch(error => console.log('respose error ' + JSON.stringify(error)));
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={8} md={8}>
                    <Aicam videoRef={videoRef} photoRef={photoRef} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Register takePicture={clickTakePicture} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default RegisterImage;