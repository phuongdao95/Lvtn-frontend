import * as React from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

const UserNghiPhep = () => {
    return (
        <Box sx={{ pl: '5%', pr: '5%' }}>
            <h2>Tạo request Nghỉ phép mới</h2>
            <Divider variant="middle" sx={{ mb: '20px' }} />

            <FormControl variant="standard" sx={{ mb: '10px', width: '100%' }}>
                <Typography sx={{ fontWeight: 'bold !important', fontSize: '0.9rem !important' }}>
                    Tiêu đề
                </Typography>
                <TextField variant='outlined' size='small' sx={{ backgroundColor: 'white', width: '50%' }} />
            </FormControl>
            <br />

            <FormControl variant="standard" sx={{ mb: '10px', width: '100%' }}>
                <Typography sx={{ fontWeight: 'bold !important', fontSize: '0.9rem !important' }}>
                    Mô tả chi tiết
                </Typography>
                <TextField variant='outlined' size='small' sx={{ backgroundColor: 'white', width: '50%' }} multiline minRows={4} />
            </FormControl>
            <br />

            <FormControl variant="standard" sx={{ mb: '10px', width: '100%' }}>
                <Typography sx={{ fontWeight: 'bold !important', fontSize: '0.9rem !important' }}>
                    Tài liệu đính kèm
                </Typography>
                <DropzoneArea
                />
            </FormControl>
            <br />

            <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', fontStyle: 'italic', color: 'gray' }}>
                Lưu ý: Quản lý cần phải xác nhận request để đưa vào danh sách cần xem xét
            </Typography>

            <Divider variant="middle" sx={{ mb: '20px', mt: '20px' }} />

            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="medium">
                        Hủy bỏ
                    </Button>
                    <Button variant="contained" size="medium">
                        Tạo mới
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default UserNghiPhep;