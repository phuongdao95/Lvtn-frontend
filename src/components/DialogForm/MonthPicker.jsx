import { MonthPicker as MuiMonthPicker } from "@mui/x-date-pickers";

export default function MonthPicker({ id, name, value, onChange, ...rest }) {
    return <MuiMonthPicker
        id={id}
        name={name}
        date={value}
        onChange={onChange}
        {...rest}
    />;
}