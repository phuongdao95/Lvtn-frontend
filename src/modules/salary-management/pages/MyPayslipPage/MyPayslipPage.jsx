import { Box } from "@mui/system";
import PayslipAccordion from "./components/PayslipAccordion/PayslipAccordion";
import SearchField from "./components/SearchField/SearchField";

const payslips = [
  {
    name: "Tien Luong Thang 9",

    fromDate: "05/07/2022",
    toDate: "05/08/2022",

    employee: {
      name: "Le Vinh",
      address: "274 Brooklyn NYC",
      bank: "ACB",
      bankNumber: "0973846251",
      baseSalary: "20 000 000",
    },

    deductionInfo: {
      header: "Deduction List",

      items: [
        {
          name: "Thue 1",
          value: "120 000",
        },
        {
          name: "Thue 2",
          value: "240 000",
        },
      ],
    },

    allowanceInfo: {
      header: "Allowance List",

      items: [
        {
          name: "Tro cap 1",
          value: "120 000",
        },
        {
          name: "Tro cap 2",
          value: "240 000",
        },
      ],
    },

    bonusInfo: {
      header: "Bonus List",

      items: [
        {
          name: "Overtime Pay",
          value: "120 000",
        },

        {
          name: "Bonus Pay",
          value: "240 000",
        },
      ],
    },
  },

  {
    name: "Tien Luong Thang 10",

    fromDate: "05/07/2022",
    toDate: "05/08/2022",

    employee: {
      name: "Le Vinh",
      address: "274 Brooklyn NYC",
      bank: "ACB",
      bankNumber: "0973846251",
      baseSalary: "20 000 000",
    },

    deductionInfo: {
      header: "Deduction List",

      items: [
        {
          name: "Thue 1",
          value: "120 000",
        },
        {
          name: "Thue 2",
          value: "240 000",
        },
      ],
    },

    allowanceInfo: {
      header: "Allowance List",

      items: [
        {
          name: "Tro cap 1",
          value: "120 000",
        },
        {
          name: "Tro cap 2",
          value: "240 000",
        },
      ],
    },

    bonusInfo: {
      header: "Bonus List",

      items: [
        {
          name: "Overtime Pay",
          value: "120 000",
        },

        {
          name: "Bonus Pay",
          value: "240 000",
        },
      ],
    },
  },

  {
    name: "Tien Luong Thang 11",

    fromDate: "05/07/2022",
    toDate: "05/08/2022",

    employee: {
      name: "Le Vinh",
      address: "274 Brooklyn NYC",
      bank: "ACB",
      bankNumber: "0973846251",
      baseSalary: "20 000 000",
    },

    deductionInfo: {
      header: "Deduction List",

      items: [
        {
          name: "Thue 1",
          value: "120 000",
        },
        {
          name: "Thue 2",
          value: "240 000",
        },
      ],
    },

    allowanceInfo: {
      header: "Allowance List",

      items: [
        {
          name: "Tro cap 1",
          value: "120 000",
        },
        {
          name: "Tro cap 2",
          value: "240 000",
        },
      ],
    },

    bonusInfo: {
      header: "Bonus List",

      items: [
        {
          name: "Overtime Pay",
          value: "120 000",
        },

        {
          name: "Bonus Pay",
          value: "240 000",
        },
      ],
    },
  },


  {
    name: "Tien Luong Thang 12",

    fromDate: "05/07/2022",
    toDate: "05/08/2022",

    employee: {
      name: "Le Vinh",
      address: "274 Brooklyn NYC",
      bank: "ACB",
      bankNumber: "0973846251",
      baseSalary: "20 000 000",
    },

    deductionInfo: {
      header: "Deduction List",

      items: [
        {
          name: "Thue 1",
          value: "120 000",
        },
        {
          name: "Thue 2",
          value: "240 000",
        },
      ],
    },

    allowanceInfo: {
      header: "Allowance List",

      items: [
        {
          name: "Tro cap 1",
          value: "120 000",
        },
        {
          name: "Tro cap 2",
          value: "240 000",
        },
      ],
    },

    bonusInfo: {
      header: "Bonus List",

      items: [
        {
          name: "Overtime Pay",
          value: "120 000",
        },

        {
          name: "Bonus Pay",
          value: "240 000",
        },
      ],
    },
  },

];

export default function MyPayslipPage() {
  return (

    <Box sx={{display: 'flex', flexDirection: "column", gap: 2}}>
      <SearchField />
      <Box>
        {payslips.map((payslip, index, _) => (
          <PayslipAccordion
            expaned={true}
            key={payslip.name}
            name={payslip.name}
            fromDate={payslip.fromDate}
            toDate={payslip.toDate}
            employee={payslip.employee}
            allowanceInfo={payslip.allowanceInfo}
            deductionInfo={payslip.deductionInfo}
            bonusInfo={payslip.bonusInfo}
          />
        ))}
      </Box>
    </Box>
  );
}
