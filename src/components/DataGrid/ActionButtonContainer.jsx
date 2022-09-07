import { Box } from "@mui/system";

export default function ActionButtonContainer({ children }) {
    return <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
        {children}
    </Box>;
}