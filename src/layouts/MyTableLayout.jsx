export default function MyTableLayout({ title, searchSection, dropdownFilterSection, searchButtonSection, tableSection }) {
    return <Box sx={{
        padding: 2,
        background: 'white'
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 4,
            }}>
                <Typography fontSize={30}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    color={grey[800]}
                >
                    {title}
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
                marginBottom: 1.5,
            }}>
                {dropdownFilterSection}
                {searchSection}
                {searchButtonSection}
            </Box>

        </Box>
        <Box>
            {tableSection}
        </Box>
    </Box >
}