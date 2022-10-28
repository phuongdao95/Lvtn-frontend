import React from "react";

import { Box } from "@mui/system";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import InfoDialog from "../../../../components/Dialog/InfoDialog";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import EditDAB from "./EditDAB";
import { useDeleteDAB, useFetchAllowance, useFetchDeduction, useFetchListDAB } from "../../../../client/dabService";
import { useNavigate } from "react-router";

const getColumnConfig = (onEditBtnClick, onDeleteBtnClick) => [
    {
        field: "id",
        headerName: "id",
        width: 150,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },
    {
        field: "formulaName",
        headerName: "Công thức",
        width: 250,
    },
    {
        field: "type",
        headerName: "Loại",
        width: 150,
    },
    {
        field: "description",
        headerName: "Mô tả",
        width: 150,
    },
    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => onEditBtnClick(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => onDeleteBtnClick(id)}>
                    Delete
                </ActionButton>
            </Box>
        }
    }
];

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function DeductionList({ shouldReload }) {
    const navigate = useNavigate();
    const [deductionId, setDeductionId] = React.useState(null);
    const [deductionList, setDeductionList] = React.useState([]);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isSuccess: isfetchSuccess,
        data: response,
        method: fetchDeduction
    } = useFetchAllowance();

    const {
        isPending: isDeletePending,
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteDAB,
    } = useDeleteDAB();

    React.useEffect(() => {
        if (isfetchSuccess) {
            setDeductionList(response.data);
        }
    }, [isfetchSuccess]);

    React.useEffect(() => {
        fetchDeduction();
    }, []);


    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchDeduction();
        }
    }, [isDeleteSuccess])

    return <Box >
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: 2,
        }}>
            <SearchField />
            <SearchButton />
        </Box>
        {
            isEditOpen &&
            <EditDAB
                dabId={deductionId}
                closeDialogCb={() => {
                    setIsEditOpen(false);
                    fetchDeduction();
                }}
            />
        }

        {isDeleteOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa chức vụ này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setDeductionId(null);
                        setIsDeleteOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setIsDeleteOpen(false);
                        setDeductionId(null);
                        deleteDAB(deductionId);
                    }
                }}
            />}


        {isInfoDialogOpen && <InfoDialog
            title={infoDialogMessage.title}
            message={infoDialogMessage.message}
            closeDialogCb={() => {
                setIsInfoDialogOpen(false);
                resetDialogState();
            }}
        />}

        <DataGrid
            rows={deductionList}
            columns={getColumnConfig(
                (id) => {
                    setDeductionId(id);
                    setIsEditOpen(true);
                },
                (id) => {
                    setDeductionId(id)
                    setIsDeleteOpen(true);
                })
            }
            height={500} />
    </Box>;
}