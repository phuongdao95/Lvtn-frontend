import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import FormContainer from "../../../salary-management/components/FormContainer";
import FormSection from "./FormSection";
import AvatarSection from "./AvatarSection";

export default function UserProfile() {
    return <FormContainer>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <Typography variant='h4'>Thông tin người dùng</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 10, padding: 5 }}>
            <AvatarSection />
            <FormSection />
        </Box>
    </FormContainer>
}