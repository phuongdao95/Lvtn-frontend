import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import EditSalary from "./EditSalary";

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    employeeCode: "012345678",
    firstName: "A",
    lastName: "Nguyen Van",
    role: "Admin",
    baseSalary: "10909000",
    bankName: "ACB",
    bankAccountNumber: "019237418",
}));

const getColumnConfig = ({ onEditBtnClick }) => [
    {
        field: "id",
        headerName: "ID",
    },
    {
        field: "employeeCode",
        headerName: "Employee Code",
        width: 150,
    },

    {
        field: "firstName",
        headerName: "First name",
        width: 150,
    },

    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
    },

    {
        field: "role",
        headerName: "Role",
        width: 150,
    },

    {
        field: "baseSalary",
        headerName: "Base salary",
        width: 150,
    },

    {
        field: "bankName",
        headerName: "Bank Name",
        width: 150,
    },

    {
        field: "bankAccountNumber",
        headerName: "Bank Number",
        width: 150,
    },


    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: () => {
            return <ActionButton onClick={() => onEditBtnClick(true)}>
                Edit
            </ActionButton>
        }
    },
]

export default function SalaryList() {
    const [isEditSalaryOpen, setIsEditSalaryOpen] = React.useState(false);

    return (
        <Fragment>
            {isEditSalaryOpen &&
                <EditSalary
                    closeDialogCb={() => setIsEditSalaryOpen(false)}
                />
            }

            <DataGridLayout
                title={"Danh sách lương nhân viên"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig({ onEditBtnClick: () => setIsEditSalaryOpen(true) })}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                { text: "Xuất bảng excel", handler: () => { } },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={
                            [
                                { text: "Danh sách template", handler: () => { } }
                            ]
                        }
                        variant="outlined"
                        color="info"
                    />}
                searchSection={<SearchField />}
                dropdownFilterSection={<></>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
