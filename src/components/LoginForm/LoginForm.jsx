import { Box, TextField } from "@mui/material";
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

export default function LoginForm() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2))
        }
    })

    return <Box>
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
    </Box>;
}