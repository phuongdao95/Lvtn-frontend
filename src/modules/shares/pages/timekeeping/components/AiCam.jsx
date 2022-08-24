import React, {useEffect} from 'react';
import { Box, Card, CardContent } from '@mui/material';

const AiCam = ({videoRef, photoRef}) => {
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
                maxWidth: 700,
                minWidth: 200,
            }}>
                <CardContent sx={{
                    bgcolor: 'primary.main'
                }}>
                    Face recognition
                </CardContent>
                <CardContent>
                    <canvas style={{display: "none"}} ref={photoRef}></canvas>
                    <video ref={videoRef} ></video>
                </CardContent>
            </Card>
        </Box>
    );
}
export default AiCam;