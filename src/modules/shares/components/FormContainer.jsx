export default function Layout({ children }) {
    return <Box sx={{
        padding: 2,
        background: 'white',
        minHeight: '100vh'
    }}>
        {children}
    </Box >
}