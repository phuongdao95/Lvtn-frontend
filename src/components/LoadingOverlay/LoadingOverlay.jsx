import { Box, CircularProgress } from "@mui/material";

export default function LoadingOverlay({ isLoading }) {
    return isLoading && <Box sx={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: 'rgba(0,0,0, 0.15)',
        top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 9999,
    }}>
        <CircularProgress />
    </Box >
}