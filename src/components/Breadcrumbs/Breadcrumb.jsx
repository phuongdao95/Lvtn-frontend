import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

// const links = [
//     { text: "", to: "", align, style  }
// ]

export default function Breadcrumbs({ links }) {
    return <Breadcrumbs>
        {links.map(({ text, to, ...rest }) => <Link to={to} {...rest}>
            {text}
        </Link>)}
    </Breadcrumbs>;
}