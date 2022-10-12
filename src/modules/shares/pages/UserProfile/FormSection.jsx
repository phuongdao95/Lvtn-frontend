import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Label from "../../../../components/DialogForm/Label";
import TextField from "../../../../components/DialogForm/TextField";
import Button from "@mui/material";

const singleColumnMaxWidth = 820;

export default function FormSection() {
    return <Box sx={{
        display: "flex",
        gap: 1.25,
        flexDirection: "column"
    }}>
        <Typography>
            Thông tin cơ bản
        </Typography>

        <Box sx={{ maxWidth: singleColumnMaxWidth }}>
            <Label text={"Họ và Tên"} />
            <TextField fullWidth />
        </Box>

        <Box sx={{ maxWidth: singleColumnMaxWidth }}>
            <Label text={"Email"} />
            <TextField />
        </Box>

        <Box sx={{
            display: "flex",
            flexDirection: "row",
            maxWidth: singleColumnMaxWidth,
            gap: 3
        }}>
            <Box>
                <Label text={"Tuổi"} />
                <TextField />
            </Box>

            <Box>
                <Label text={"Ngày sinh"} />
                <TextField />
            </Box>
        </Box>


        <Box sx={{
            display: "flex",
            flexDirection: "row",
            maxWidth: singleColumnMaxWidth,
            gap: 3
        }}>

            <Box>
                <Label text={"Số điện thoại"} />
                <TextField />
            </Box>

            <Box>
                <Label text={"Giới tính"} />
                <TextField />
            </Box>
        </Box>

        <Box>
            <Label text={"Địa chỉ"} />
            <TextField
                multiline
                row={3}
            />
        </Box>

        <Box>
            <Label text={"Về tôi"} />
            <TextField
                multiline
                row={3}
            />
        </Box>


        <Typography>
            Thông tin hành chính
        </Typography>

        <Box>
            <Label text={"Chức vụ"} />
            <TextField
                multiline
                row={3}
            />
        </Box>

        <Box>
            <Label text={"Department"} />
            <TextField
                multiline
                row={3}
            />
        </Box>

        <Box>
            <Label text={"Team"} />
            <TextField
                multiline
                row={3}
            />
        </Box>
    </Box >
}