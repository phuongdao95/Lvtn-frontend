import React, {useEffect} from 'react';
import { Box, Card, CardContent } from '@mui/material';

const Aicam = ({videoRef, photoRef}) => {
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
            py: 1,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card>
                <CardContent>
                    <canvas style={{display: "none"}} ref={photoRef}></canvas>
                    <video ref={videoRef} style={{
                        "maxWidth": "100%",
                        height: "auto",
                    }} ></video>
                </CardContent>
            </Card>
        </Box>
    );
}
export default Aicam;