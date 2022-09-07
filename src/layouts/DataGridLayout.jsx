import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DataGridLayout({
    title,
    primaryButtonSection,
    secondaryButtonSection,
    datagridSection,
    searchSection,
    dropdownFilterSection,
    searchButtonSection,
    actionSection,
}) {
    return <Box sx={{
        padding: 2,
        background: 'white'
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 4,
            }}>
                <Typography fontSize={30}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    color={grey[800]}
                >
                    {title}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    {secondaryButtonSection}

                    {primaryButtonSection}
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1.5,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                }}>
                    {dropdownFilterSection}
                    {searchSection}
                    {searchButtonSection}
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                }}>
                    {actionSection}
                </Box>
            </Box>

        </Box>
        <Box>
            {datagridSection}
        </Box>
    </Box >

}