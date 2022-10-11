import { Box } from "@mui/system";

export default function FormContainer({ children }) {
    return <Box
        sx={{
            padding: 2,
            background: 'white',
            minHeight: '85vh'
        }}
    >
        {children}
    </Box >
}