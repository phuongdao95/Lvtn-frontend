import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

export default function Unauthorizied() {
    const navigate = useNavigate();

    return <Box sx={{
        display: 'flex',
        background: 'white',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '80vh'
    }}>
        <Typography variant="h1">
            403
        </Typography>

        <Typography variant="h4" >
            Bạn không có quyền truy cập trang này
        </Typography>

        <Button sx={{ width: 300 }} variant="contained" color="info" onClick={() => navigate("/profile")}>
            Quay lại trang cá nhân
        </Button>
    </Box>
}