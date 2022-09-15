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

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string("Enter your password")
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
})

const theme = createTheme();

export default function Login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2))
            /** do contact with server at this place */
        }
    })

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
                    <Typography variant='h4' fontWeight={"bold"} color={grey[700]} letterSpacing={1.2}>Welcome to EMS</Typography>

                    <Typography component="h1" variant="h6" mb={4}>
                        Sign in
                    </Typography>
                    <Box component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{
                            mt: 1,
                            display: 'flex',
                            flexDirection: "column",
                            gap: 2.
                        }}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
