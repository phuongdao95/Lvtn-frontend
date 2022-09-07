import { Box } from "@mui/system";

export default function DialogForm({ children }) {
    return <form>
        <Box>
            {children}
        </Box>
    </form>;
}