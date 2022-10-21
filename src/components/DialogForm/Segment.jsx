import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Segment({ children, title }) {
    return <Box>
        <Typography sx={{ fontSize: '18px', fontWeight: 'semibold' }}>
            {title}
        </Typography>
        <Box>
            {children}
        </Box>
    </Box>
}