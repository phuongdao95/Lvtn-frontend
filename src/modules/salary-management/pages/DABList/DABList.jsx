import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import DeductionList from "./DeductionList";
import AllowanceList from "./AllowanceList";
import BonusList from "./BonusList";
import CreateDAB from "./CreateDAB";

export default function DABList() {
  const [isCreateDABOpen, setIsCreateDABOpen] = React.useState(false);

  return <Fragment>
    {isCreateDABOpen && <CreateDAB closeDialogCb={() => setIsCreateDABOpen(false)} />}
    <DataGridTabLayout
      title={"Khấu trừ, phụ cấp và thưởng"}
      primaryButtonSection={<MenuButton
        text={"Thao tác"}
        menu={
          [
            {
              text: "Tạo mới khấu trừ, phụ cấp, thưởng",
              handler: () => {
                setIsCreateDABOpen(true)
              }
            },
          ]
        }
        variant="contained"
        color="info"
      />}
      secondaryButtonSection={
        <Fragment></Fragment>
      }
      tabSections={
        [
          {
            index: 0,
            label: "Khấu trừ",
            dataGrid: <DeductionList />,
          },
          {
            index: 1,
            label: "Phụ cấp",
            dataGrid: <AllowanceList />,
          },
          {
            index: 2,
            label: "Thưởng",
            dataGrid: <BonusList />
          }
        ]
      }
    />;
  </Fragment>
}