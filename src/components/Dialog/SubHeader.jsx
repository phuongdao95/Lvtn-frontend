export default function SubHeader({ children, ...rest }) {
    return <Typography variant="h5" color="white" component="span" {...rest}>
        {children}
    </Typography>
}