import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function SchedulerEventCard({ title }) {
    return <Box sx={{
        position: 'relative',
        maxWidth: '150px',
        padding: "4px 8px",
        fontSize: '13px',
        backgroundColor: "white",
        border: '1px solid rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        borderLeft: `4px solid ${blue[500]}`
    }}>
        {title}
    </Box>
}