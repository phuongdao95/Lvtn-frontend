import React, { Fragment } from 'react';
import { Box } from "@mui/system";
import RegisterImage from '../components/RegisterImage';
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Registe() {
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
                        Đăng ký hình ảnh
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <RegisterImage />
                </Box>
            </Box>
        </Box >
    </Fragment>
    );
}