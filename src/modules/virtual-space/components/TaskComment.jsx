import { Avatar, Box, Typography } from "@mui/material";
import RTEContent from "./RTEContent";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";

export default function Comment({ avatar, content, name, datetime }) {
    return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
            padding: 0.8,
            display: 'flex', flexDirection: 'row',
            alignItems: 'flex-start',
            borderBottom: '1px solid rgba(0,0,0,.25)',
            gap: 2
        }}>
            <Avatar />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: grey[700] }}>
                    {name}
                </Typography>

                {content && <RTEContent value={content} />}

                <Typography sx={{fontStyle: 'italic', fontSize: '14px'}}>
                    {dayjs(datetime).format('DD/MM/YYYY')} lúc {dayjs(datetime).format('mm:HH')}
                </Typography>
            </Box>
        </Box>
    </Box>

}