import { Box, CircularProgress } from "@mui/material";

export default function LoadingOverlay({ isLoading = true }) {
    return isLoading && <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
    }>
        <CircularProgress />
    </Box >
        ;
}