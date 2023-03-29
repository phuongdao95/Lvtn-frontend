import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useFormik } from "formik";

import * as yup from "yup";
import { useLogin } from '../../../../client/autheticationService';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
    username: yup
        .string("Enter your username")
        .min(5, 'Username should be of minimum 5 characters length')
        .required('Username is required'),
    password: yup
        .string("Enter your password")
        .min(5, 'Password should be of minimum 5 characters length')
        .required('Password is required'),
})

const theme = createTheme();

export default function Login() {
    const { method: login, isPending, isError, isSuccess } =
        useLogin();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values.username, values.password);
        }
    })

    React.useEffect(() => {
        if (isSuccess) {
            navigate("/profile");
        }
    }, [isSuccess])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <Box
                    sx={{
                        width: 500,
                        padding: 2,
                        paddingTop: 4,
                        background: "white",
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 0 5px 4px rgba(0,0,0,0.025)'
                    }}
                >
                    <Typography variant='h4' mb={2} fontWeight={"bold"} color={grey[700]} letterSpacing={1.2}>
                        Hệ thống quản lý <br /> nhân viên
                    </Typography>

                    <Typography component="h1" variant="h6" mb={.25}>
                        Đăng nhập
                    </Typography>

                    <Box component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            gap: 2.
                        }}>

                        <TextField
                            id="username"
                            name="username"
                            label="Tài khoản"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />

                        <TextField
                            id="password"
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button
                            type="submit"
                            onClick={(e) => { formik.handleSubmit(e); }}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
