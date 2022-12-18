import React, { Fragment } from "react";
import { Box } from "@mui/system";

import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import CreateTeam from "./CreateTeam";

import { useFetchListTeam, useDeleteTeam } from "../../../../client/teamService";
import { useNavigate } from "react-router";
import EditTeam from "./EditTeam";

const getColumnConfig = (openEditRoleCb, openDeleteRoleCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },

    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },


    {
        field: "description",
        headerName: "Mô tả",
        width: 300,
    },

    {
        field: "action",
        headerName: "Thao tác",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => openEditRoleCb(id)}>
                    Sửa
                </ActionButton>
                <ActionButton onClick={() => openDeleteRoleCb(id)}>
                    Xóa
                </ActionButton>
            </Box >
        }
    }

];


export default function TeamList() {
    const [teamId, setTeamId] = React.useState(false);

    const [isCreateTeamOpen, setIsCreateTeamOpen] = React.useState(false);
    const [isEditTeamOpen, setIsEditTeamOpen] = React.useState(false);
    const [isDeleteTeamOpen, setIsDeleteTeamOpen] = React.useState(false);

    const navigate = useNavigate();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchTeamList
    } = useFetchListTeam();

    const {
        isSuccess: isDeleteSuccess,
        method: deleteTeam
    } = useDeleteTeam();

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchTeamList();
        }
    }, [isDeleteSuccess])



    return (
        <Fragment>
            {isCreateTeamOpen && <CreateTeam
                closeDialogCb={() => setIsCreateTeamOpen(false)}
            />}

            {isEditTeamOpen && <EditTeam 
                closeDialogCb={() => setIsEditTeamOpen(false)}
                teamId={teamId}
            />}

            {isDeleteTeamOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa Team này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setTeamId(null);
                            setIsDeleteTeamOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteTeamOpen(false);
                            setTeamId(null);
                            deleteTeam(teamId);
                        }
                    }}
                />}

            <DataGridLayout
                title={"Danh sách team"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchTeamList((nextPageIndex) * limit, limit)
                        }}
                        rowCount={response?.total ?? 0}
                        paginationMode="server"
                        rows={response?.data ?? []}
                        columns={getColumnConfig(
                            (id) => {
                                setTeamId(id);
                                setIsEditTeamOpen(true);
                            },
                            (id) => {
                                setTeamId(id);
                                setIsDeleteTeamOpen(true);
                            })}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
                    />
                }
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                {
                                    text: "Tạo mới Team", handler: () => {
                                        setIsCreateTeamOpen(true);
                                    }
                                }
                            ]
                        }
                    />
                }
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
