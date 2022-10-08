import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function PageHeader({ children }) {
    return <Typography variant="h4">{children}</Typography>;
}