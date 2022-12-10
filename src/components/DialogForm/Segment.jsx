import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function Segment({ children, title }) {
    return <Box>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: grey[700] }}>
            {title}
        </Typography>
        <Box>
            {children}
        </Box>
    </Box>
}