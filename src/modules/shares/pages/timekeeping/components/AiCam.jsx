import React, {useEffect, useRef, useState} from 'react';
import { Box, Card, CardContent, CardActions, Grid, ButtonGroup, Button } from '@mui/material';
//import * as faceApi from 'face-api.js';
import axios from 'axios';

const AiCam = () => {
    let [isHasPic, setIsHasPic] = useState(false);
    let videoRef = useRef(null);
    let photoRef = useRef(null);
    useEffect(() => {
        getVideo();
    }, [videoRef]);
    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const takePicture = () => {
        console.log('take pic ' + videoRef.current.width);
        setIsHasPic(true);
        const width = 700;
        const height = width / (16 / 9);
        let video = videoRef.current;
        let photo = photoRef.current;
        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        // test save image
        var image = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(JSON.stringify(image));
        // post image to server
        axios.post({
            baseURL: 'https://localhost:7115/api/UploadImage',
            headers: {
                "accept": "*/*",
                "Content-Type": "application/json"
            },
            data: {
                idUser: "123",
                imageName: "Phuong",
                imageData: image,
            },
            timeout: 1000
        })
        .then(res => {
            console.log('respose' + res);
        })
        .catch(error => console.log('respose error ' + error));
    }
    const clearPicture = () => {
        setIsHasPic(false);
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0,0,photo.width,photo.height);
    }
    return (
        <Box sx={{
            mx: 'auto',
            py: 5,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card sx={{
                maxWidth: 700,
                minWidth: 200,
            }}>
                <CardContent sx={{
                    bgcolor: 'primary.main'
                }}>
                    Face recognition
                </CardContent>
                <CardContent sx={{
                    
                }}>
                    <canvas style={{display: isHasPic ? "" : "none",
                        maxWidth: 700,
                        minWidth: 500,
                        maxHeight: 400,
                        minHeight: 200}} ref={photoRef}></canvas>
                    <video style={{display: isHasPic ? "none" : "",
                        maxWidth: 700,
                        minWidth: 500,
                        maxHeight: 400,
                        minHeight: 200}} ref={videoRef} ></video>
                </CardContent>
                <CardActions>
                    <Button onClick={clearPicture} color="error" size="small">cancel</Button>
                    <Button onClick={takePicture} size="small">take picture</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
export default AiCam;