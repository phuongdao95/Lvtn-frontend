import { Box } from "@mui/system";
import { Typography, Select, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import MenuButton from "../../components/MenuButton/MenuButton";
import PayrollList from "./PayrollList/PayrollList";
import { useFetchListPayslip } from "../../../../client/payslipService";

export default function ManagePayrollRecordList() {
  const [month, setMonth] = useState("08/2022");

  const { method, isPending, isError, isSuccess } = useFetchListPayslip();

  return (
    <Box sx={{ padding: 2, background: 'white' }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 4,
        }}
      >
        <Typography
          fontSize={30}
          textTransform={"capitalize"}
          fontWeight={500}
          color={grey[800]}
        >
          Danh sách Payroll theo tháng
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <MenuButton
            text={"Related Pages"}
            variant="outlined"
            menu={[
              { clickHandler: () => { }, text: "Salary" },
              { clickHandler: () => { }, text: "Bonus" },
            ]}
          />
          <MenuButton
            text={"Thao tác"}
            menu={[
              { clickHandler: () => { }, text: "Calculate payslip" },
              { clickHandler: () => { }, text: "Send payslip" },
              { clickHandler: () => { }, text: "Export to excel" },
            ]}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            sx={{ width: 132 }}
            size="small"
          >
            <MenuItem value={month}>08/2022</MenuItem>
          </Select>
        </Box>

        <PayrollList />
      </Box>
    </Box>
  );
}
