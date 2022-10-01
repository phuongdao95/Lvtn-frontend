import { Box } from "@mui/system";

export default function OneColumnFieldContainer({ slot }) {
    return <Box maxWidth={225}>
        {slot}
    </Box>;
}