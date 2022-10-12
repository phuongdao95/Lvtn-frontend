import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import SearchField from "../../../components/DataGrid/SearchField";
import DataGridLayout from "../../../layouts/DataGridLayout";
import MenuButton from "../../shares/pages/AccountsAndRolesPage/components/MenuButton/MenuButton";

const getColumnConfig = (openEditCb, openDeleteCb) => [
    {
        field: "id",
        width: 150
    },
    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },

    {
        field: "description",
        headerName: "description",
        width: 250,
    },

];

export default function BoardList() {
    const navigate = useNavigate();

    return <DataGridLayout
        title={"Bảng công việc của tôi"}
        datagridSection={
            <DataGrid
                rows={[]}
                columns={[]}
            />
        }
        primaryButtonSection={
            <MenuButton
                text={"Thao tác"}
                menu={
                    [
                        {
                            text: "Tạo mới người dùng",
                            handler: () => {
                            }
                        },
                    ]
                }
            />
        }
        searchButtonSection={<MenuButton
            text={"Liên kết liên quan"}
            menu={
                [
                    {
                        text: "Danh sách nhóm", handler: () => {
                            navigate("/group");
                        }
                    },
                ]
            }
            variant="outlined"
            color="info"
        />}
        searchSection={<SearchField />}
    />
}