import { Box } from "@mui/material"

export default function TwoColumnBox({
    firstSlot,
    secondSlot
}) {
    return <Box sx={{ padding: 1, display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
            {firstSlot}
        </Box>

        <Box sx={{ flex: 1 }}>
            {secondSlot}
        </Box>
    </Box>

}