import React, {useRef, useState} from 'react';
import {Box, Grid} from '@mui/material';
import Register from './Register';
import Aicam from './Aicam';
import * as aiService from '../../../client/aiService';
import Snackbar from '../../../components/Snackbar/Snackbar';

const RegisterImage = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [state, setState] = useState({
        open: false,
        type: 'info',
        message: '',
    });
    const clickTakePicture = () => {
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
        }

        // get data image
        const data = {
            imageName: window.localStorage.getItem('user_id'),
            imageData: listImage,
        };
        // call api
        aiService.register(data)
        .then(res => {
            // console.log('respose ' + JSON.stringify(res));
            console.log('respose ' + res.data + ' ' + res.statusText + ' ' + res.status);
            setState({
                type: 'success',
                message: 'Đăng ký thành công',
                open: true,
            })

        })
        .catch(error => {
            console.log('respose error ' + JSON.stringify(error))
            setState({
                type: 'error',
                message: 'Thất bại!! Xin hãy thử lại!',
                open: true,
            })
        });
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <Snackbar state={state} close={() => setState({...state, open: false})} />
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