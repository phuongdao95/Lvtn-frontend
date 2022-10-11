import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function PayrollDetailFormLayout({
    title,
    formSection,
    datagridSection,
    primaryAction,
    secondaryAction
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
            }}>
                <Typography fontSize={30}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    color={grey[800]}
                >
                    {title}
                </Typography>

                <Box>
                    <Box>
                        {primaryAction}
                    </Box>

                    <Box>
                        {secondaryAction}
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box sx={{
            padding: 2
        }}>
            {formSection}
        </Box>
        <Box sx={{
            padding: 2,
        }}>
            {datagridSection}
        </Box>
    </Box >
}