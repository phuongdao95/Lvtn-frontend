import React, {useRef} from 'react';
import {Box, Grid} from '@mui/material';
import InfoComponent from './InfoComponent';
import AiCam from './AiCam';
import * as aiService from '../../../../../client/aiService';

const Timekeeping = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const clickTakePicture = (done) => {
        console.log('recognize from timekeeping');
        const width = 700;
        const height = width / (16 / 9);
        let video = videoRef.current;
        let photo = photoRef.current;
        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        
        var image = photo.toDataURL("image/png");
        // get data image
        const data = {
            idUser: "123",
            imageName: "Dao Thanh Phuong",
            imageData: [image],
        };
        //call api
        aiService.uploadImage(data)
        .then(res => {
            //console.log('respose ' + JSON.stringify(res));
            console.log('respose ' + res.data + ' ' + res.statusText + ' ' + res.status);
            // if (res.status === 200 && res.data !== 'not found') {
            if (res.status === 200) {
                done();
            }
            return true;
        })
        .catch(error => {
            console.log('respose error ' + JSON.stringify(error));
            return false;
        });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={8}>
                    <AiCam videoRef={videoRef} photoRef={photoRef} />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <InfoComponent takePicture={clickTakePicture} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Timekeeping;