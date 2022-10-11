import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Header from "../components/Dialog/Header";



export default function DialogFormTableLayout({
    title,
    searchSection,
    actionSection,
    tableSection,
}) {
    return <Box sx={{
        display: "flex",
        flexDirection: "column"
    }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Header color={grey[700]} >{title}</Header>

            <Box sx={{ display: "flex", flexDirection: "row" }} >
                {searchSection}
                {actionSection}
            </Box>
        </Box>

        {tableSection}
    </Box>
}