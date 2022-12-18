import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButtonContainer from "../../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";

import { useDeleteGroup, useFetchListGroup } from "../../../../client/groupService";

const getColumnConfig = ({ onEditBtnClick, onDeleteBtnClick }) => [
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
        width: 150,
    },

    {
        field: "action",
        headerName: "Thao tác",
        width: 300,
        renderCell: ({ id }) => {
            return <ActionButtonContainer>
                <ActionButton onClick={() => onEditBtnClick(id)}>
                    Sửa
                </ActionButton>
                <ActionButton onClick={() => onDeleteBtnClick(id)}>
                    Xóa
                </ActionButton>
            </ActionButtonContainer >
        }
    },

];


export default function GroupList() {
    const [groupId, setGroupId] = React.useState(null);

    const [isCreateGroupOpen, setIsCreateGroupOpen] = React.useState(false);
    const [isEditGroupOpen, setIsEditGroupOpen] = React.useState(false);
    const [issDeleteGroupOpen, setIsDeleteGroupOpen] = React.useState(false);

    const {
        isError: isFetchError,
        isPending: isFetchPending,
        isSuccess: isFetchSuccess,
        method: reloadList,
        data: fetchedGroups
    } = useFetchListGroup();

    const {
        isError: isDeleteError,
        isPending: isDeletePending,
        isSuccess: isDeleteSuccess,
        method: deleteGroup
    } = useDeleteGroup();

    React.useEffect(() => {
        reloadList();
    }, [isDeleteSuccess])

    return (
        <Fragment>
            {isCreateGroupOpen && <CreateGroup
                reloadList={reloadList}
                groupId={groupId}
                closeDialogCb={() => setIsCreateGroupOpen(false)} />}
            {isEditGroupOpen && <EditGroup
                reloadList={reloadList}
                groupId={groupId}
                closeDialogCb={() => setIsEditGroupOpen(false)} />}

            {issDeleteGroupOpen &&
                <ConfirmDialog
                    title={"Confirm"}
                    message="Bạn có muốn xóa chức vụ này"
                    cancelAction={{
                        text: "Cancel",
                        handler: () => {
                            setGroupId(null);
                            setIsDeleteGroupOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Confirm",
                        handler: () => {
                            setIsDeleteGroupOpen(false);
                            setGroupId(null);
                            deleteGroup(groupId);
                        }
                    }}
                />}


            <DataGridLayout
                title={"Danh sách nhóm"}
                datagridSection={
                    <DataGrid
                        rows={fetchedGroups?.data || []}
                        columns={getColumnConfig({
                            onEditBtnClick: (id) => {
                                setGroupId(id);
                                setIsEditGroupOpen(true);
                            },
                            onDeleteBtnClick: (id) => {
                                setGroupId(id);
                                setIsDeleteGroupOpen(true);

                            }
                        })}
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
                                { text: "Tạo mới", handler: () => setIsCreateGroupOpen(true) },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                }
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
