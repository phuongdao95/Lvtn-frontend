import * as React from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DropzoneArea } from 'material-ui-dropzone';
import { styled } from '@mui/material/styles';

const GrayButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#afafaf'),
    backgroundColor: '#afafaf',
    '&:hover': {
        backgroundColor: 'white',
    },
    textTransform: 'none',
    marginLeft: '3px'
}));

const ViewNghiPhep = () => {
    return (<div>
        <h2>Yêu cầu nghỉ phép</h2>
        <Box>
            <GrayButton variant="contained">Chỉnh sửa thông tin</GrayButton>
            <GrayButton variant="contained" sx={{ marginRight: '15px' }}>Thêm bình luận</GrayButton>

            <GrayButton variant="contained">Thêm người theo dõi</GrayButton>
            <GrayButton variant="contained" sx={{ marginRight: '15px' }}>Thêm người xét duyệt</GrayButton>

            <GrayButton variant="contained">Thông qua request</GrayButton>
            <GrayButton variant="contained" sx={{ marginRight: '15px' }}>Hủy bỏ request</GrayButton>
        </Box>
        <Divider variant="middle" sx={{ mb: '20px', mt: '10px' }} />


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

        <Typography sx={{ fontWeight: 'bold !important' }}>
            Người tạo: Nguyễn Chí Thiện (MSNV: NCT)
        </Typography>
        <br />
        <Typography sx={{ fontWeight: 'bold !important' }}>
            Người xác nhận: Trương Khánh Toàn (MSNV: TKT)
        </Typography>

        <Divider variant="middle" textAlign='left' sx={{ mb: '20px', mt: '10px' }} >Bình luận</Divider>


    </div>)
}

export default ViewNghiPhep;