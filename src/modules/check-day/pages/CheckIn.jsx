import React, { Fragment, useRef } from 'react';
import Recognize from '../components/RegisterImage';
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {Box, Grid} from '@mui/material';
import Info from '../components/Info';
import Aicam from '../components/Aicam';
import * as aiService from '../../../client/aiService';

export default function CheckIn() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const clickTakePicture = (done) => {
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
            idUser: "123",
            imageName: "Dao Thanh Phuong",
            imageData: [image],
        };
        //call api
        aiService.uploadImage(data)
        .then(res => {
            console.log('respose ' + res.data + ' ' + res.statusText + ' ' + res.status)
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
    <Fragment>
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