import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import CreateDABTemplate from "./CreateDABTemplate";
import EditDABTemplate from "./EditDABTemplate";

import { useCreateDABTemplate, useFetchListDABTemplate } from "../../../../client/dabTemplateService";


const rows = [];
const columns = [];

export default function DABTemplateList() {
  const [isCreateDABTemplateOpen, setIsCreateDABTemplateOpen] = React.useState(false);
  const [isEditDABTemplateOpen, setIsEditDABTemplateOpen] = React.useState(false);

  const {
    method: deleteDABTemplate,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError
  } = useCreateDABTemplate();

  const {
    method: fetchListDABTemplate,
    isPending: isFetchPending,
    isSuccess: isfetchSuccess,
    isError: isFetchError,
  } = useFetchListDABTemplate();


  return (
    <Fragment>
      {isCreateDABTemplateOpen && <CreateDABTemplate closeDialogCb={() => setIsCreateDABTemplateOpen(false)} />}
      {isEditDABTemplateOpen && <EditDABTemplate closeDialogCb={() => setIsEditDABTemplateOpen(false)} />}

      <DataGridLayout
        title={"Khấu trừ, phụ cấp và lương thưởng template"}
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
                { text: "Tạo mới", handler: () => setIsCreateDABTemplateOpen(true) },
                { text: "Tạo mới KT, PC, thưởng", handler: () => setIsCreateDABTemplateOpen(true) },
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
            menu={[{ text: "KT, PC, thưởng", handler: () => { } }]}
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
