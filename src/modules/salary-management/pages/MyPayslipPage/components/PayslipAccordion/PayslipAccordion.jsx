import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import DABCard from "../DABCard/DABCard";
import PayslipDisplayField from "../PayslipDisplayField/PayslipDisplayField";

export default function PayslipAccordion({
  name,
  employee,
  fromDate,
  toDate,
  baseSalary,
  deductionInfo,
  allowanceInfo,
  bonusInfo,
  description,
  expanded
}) {
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<GridExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography fontSize={18} fontWeight={"bold"} color={grey[700]}>
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{display:'flex', flexDirection: 'column', gap: 2}}>
          <Box>
            <Box maxWidth={1000} sx={{display: 'flex'}}>
              <Box maxWidth={500}>
                <PayslipDisplayField
                  label={"Employee name"}
                  value={employee.name}
                />

                <PayslipDisplayField 
                  label={"Address"} 
                  value={employee.address}
                />
    
                <PayslipDisplayField 
                  label={"Bank"} 
                  value={employee.bank} 
                />

                <PayslipDisplayField
                  label={"Bank number"}
                  value={employee.bankNumber}
                />
              </Box>

              <Box maxWidth={500}>
                <PayslipDisplayField
                  label={"From date"}
                  value={fromDate}
                />

                <PayslipDisplayField
                  label={"To date"}
                  value={toDate}
                />
              </Box>
            </Box>

          </Box>

          <Box sx={{ maxWidth: 500, display: 'flex', gap: 2, flexDirection: "column"}}>
            <PayslipDisplayField
              fontSize={20}
              label={"Base salary"}
              value={employee.baseSalary}
            />

            {[deductionInfo, allowanceInfo, bonusInfo].map((item) => (
              <DABCard header={item.header} items={item.items} />
            ))}
          </Box>


          <Box sx={{maxWidth: 500}}>
            <PayslipDisplayField
                fontSize={20}
                label={"Total Salary"}
                value={"20 000 000"}
              />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
