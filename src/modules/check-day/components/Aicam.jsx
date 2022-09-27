import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent } from '@mui/material';

const Aicam = ({videoRef, photoRef}) => {
    let videoStream = null;
    useEffect(() => {
        getVideo();
        return () => {
            stopVideo();
        }
    }, [videoRef]);
    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                videoStream = stream;
                video.play();
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const stopVideo = () => {
        videoStream.getVideoTracks().forEach((track: any) => {
            if (track.readyState === "live") {
                track.stop();
            }
        });
    }

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