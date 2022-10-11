import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function AvatarSection() {
    return <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        gap: 2
    }}>
        <Avatar sx={{ width: 200, height: 200 }}></Avatar>
        <Box sx={{
            display: 'flex',
            flexDirection: "column",
            gap: 1,
            alignItems: 'center'
        }}>
            <Typography variant="h6"  >
                Tăng Minh Nhật
            </Typography>
            <Typography>
                CEO
            </Typography>
        </Box>
    </Box>
}