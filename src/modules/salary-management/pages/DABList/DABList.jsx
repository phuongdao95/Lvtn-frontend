import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import CreateDAB from "./CreateDAB";
import EditDAB from "./EditDAB";

import { useCreateDAB, useFetchListDAB } from "../../../../client/dabService";


const rows = [];
const columns = [];


export default function DABList() {
  const [isCreateDABOpen, setIsCreateDABOpen] = React.useState(false);
  const [isEditDABOpen, setIsEditDABOpen] = React.useState(true);

  const {
    method: deleteDAB,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError
  } = useCreateDAB();

  const {
    method: fetchListDAB,
    isPending: isFetchPending,
    isSuccess: isfetchSuccess,
    isError: isFetchError,
  } = useFetchListDAB();


  return (
    <Fragment>
      {isCreateDABOpen &&
        <CreateDAB
          closeDialogCb={
            () => setIsCreateDABOpen(false)
          }
        />}
      {isEditDABOpen &&
        <EditDAB
          closeDialogCb={
            () => setIsEditDABOpen(false)
          }
        />
      }


      <DataGridLayout
        title={"Khấu trừ, phụ cấp và lương thưởng"}
        datagridSection={
          <DataGrid
            rows={rows}
            columns={columns}
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
                { text: "Tạo mới", handler: () => setIsCreateDABOpen(true) },
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
            menu={[{ text: "Danh sách template", handler: () => { } }]}
            variant="outlined"
            color="info"
          />}
        searchSection={<SearchField />}
        dropdownFilterSection={<Select />}
        searchButtonSection={<SearchButton />}
      />
    </Fragment>
  );
}
