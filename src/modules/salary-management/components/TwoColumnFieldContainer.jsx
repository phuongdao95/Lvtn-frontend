import { Box } from "@mui/system";

export default function TwoColumnFieldContainer({
    firstSlot,
    secondSlot
}) {
    return <Box sx={{ display: "flex", gap: 2}}>
        <Box>
            {firstSlot}
        </Box>

        <Box>
            {secondSlot}
        </Box>
    </Box>
}