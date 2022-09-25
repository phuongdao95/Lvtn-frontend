import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Segment({ children, title }) {
    return <Box>
        <Typography>
            {title}
        </Typography>
        <Box>
            {children}
        </Box>
    </Box>
}