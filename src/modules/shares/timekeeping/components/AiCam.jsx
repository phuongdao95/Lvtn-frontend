import React, {useEffect, useRef} from 'react';
import { Box, Card, CardContent } from '@mui/material';
//import * as faceApi from 'face-api.js';

const AiCam = () => {
    let videoRef = useRef(null);
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
            }}>
                <CardContent sx={{
                    bgcolor: 'primary.main'
                }}>
                    Face recognition
                </CardContent>
                <CardContent sx={{
                    maxWidth: 700,
                    minWidth: 500
                }}>
                    <video ref={videoRef} ></video>
                </CardContent>
            </Card>
        </Box>
    );
}
export default AiCam;