import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFetchDeductionAllowanceBonusList } from "../../../../../../client/dabService";

export default function DABList({ items }) {

  return (
    <Box>
      {items.map((item) => (
        <Box>
          <Typography>{item.name}</Typography>
          <Typography>{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
}
