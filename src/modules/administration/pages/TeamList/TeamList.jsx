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
        headerName: "Name",
        width: 250,
    },


    {
        field: "description",
        headerName: "Description",
        width: 600,
    },

    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => openEditRoleCb(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => openDeleteRoleCb(id)}>
                    Delete
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
                    message="Bạn có muốn xóa chức vụ này"
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
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={
                            [
                                {
                                    text: "Danh sách nhóm", handler: () => {
                                        navigate("/group")
                                    }
                                },
                                {
                                    text: "Danh sách quyền", handler: () => {
                                        navigate("/permission")
                                    }
                                },
                                {
                                    text: "Danh sách người dùng", handler: () => {
                                        navigate("/user");
                                    }
                                },
                                {
                                    text: "Danh sách các cục", handler: () => {
                                        navigate("/department");
                                    }
                                },
                                {
                                    text: "Danh sách chức vụ", handler: () => {
                                        navigate("/role");
                                    }
                                },
                            ]
                        }
                        variant="outlined"
                        color="info"
                    />}
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
