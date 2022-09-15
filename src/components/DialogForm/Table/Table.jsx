import BasicTable from "../../BasicTable/BasicTable";

/**Table to be used in DialogForm component */
export default function Table({ rows, columns }) {
    return <BasicTable rows={rows} columns={columns} />;
}                                 