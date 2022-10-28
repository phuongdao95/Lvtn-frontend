import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router";
import { useFetchPayslipOfPayroll } from "../../../../client/payrollService";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import EditPayslip from "./EditPayslip";
import InfoDialog from "../../../../components/Dialog/InfoDialog";
import SearchField from "../../../../components/DataGrid/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";

const getColumnConfig = (handleOpenDetail) => [
    {
        field: "id",
    },
    {
        field: "name",
        headerName: "Tên",
        width: 250
    },
    {
        field: "description",
        headerName: "Mô tả",
        width: 250
    },
    {
        field: "employeeName",
        headerName: "Tên nhân viên",
        width: 250,
    },

    {
        field: "baseSalary",
        headerName: "Lương cơ bản",
        width: 150,
    },

    {
        field: "actualSalary",
        headerName: "Lương thực tế",
        width: 150,
    },

    {
        field: "action",
        headerName: "Thao tác",
        renderCell: ({ id }) => {
            return <ActionButton onClick={() => handleOpenDetail(id)}>
                Chi tiết
            </ActionButton>
        }
    }
]

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function PayslipList({ }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [payslipId, setPayslipId] = React.useState(null);

    const [isEditPayslipOpen, setIsEditPayslipOpen] = React.useState(false);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchPayslips
    } = useFetchPayslipOfPayroll();

    React.useState(() => {
        fetchPayslips(id);
    }, []);

    return (
        <Fragment>
            {isEditPayslipOpen &&
                <EditPayslip closeDialogCb={
                    () => setIsEditPayslipOpen(false)}
                    payslipId={payslipId} />}

            {isInfoDialogOpen && <InfoDialog
                title={infoDialogMessage.title}
                message={infoDialogMessage.message}
                closeDialogCb={() => {
                    setIsInfoDialogOpen(false);
                    resetDialogState();
                }}
            />}

            <DataGridLayout
                title={"Danh sách payslip"}
                datagridSection={
                    <DataGrid
                        rows={response?.data ?? []}
                        columns={getColumnConfig(
                            (id) => {
                                navigate(`${id}`);
                            })}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
                    />
                }
                secondaryButtonSection={
                    <ActionButton onClick={() => navigate(-1)}>
                        Quay lại
                    </ActionButton>}
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}


