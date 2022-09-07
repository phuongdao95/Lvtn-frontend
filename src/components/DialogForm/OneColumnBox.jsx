import { Box } from "@mui/system"

export default function OneColumnBox({ slot }) {
    return <Box sx={{ padding: 1, display: "flex", flexDirection: "column" }}>
        {slot}
    </Box>
}