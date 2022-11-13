import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import DeductionList from "./DeductionList";
import AllowanceList from "./AllowanceList";
import BonusList from "./BonusList";
import CreateDAB from "./CreateDAB";

export default function DABList() {
  const [isCreateDABOpen, setIsCreateDABOpen] = React.useState(false);
  const [shouldReload, setShouldReload] = React.useState(false);

  return <Fragment>
    {isCreateDABOpen && <CreateDAB closeDialogCb={() => setIsCreateDABOpen(false)}
      reload={() => setShouldReload(true)}
    />}
    <DataGridTabLayout
      title={"Khấu trừ, phụ cấp và thưởng"}
      primaryButtonSection={<MenuButton
        text={"Thao tác"}
        menu={
          [
            {
              text: "Tạo mới",
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
            dataGrid: <DeductionList shouldReload={shouldReload} />,
          },
          {
            index: 1,
            label: "Phụ cấp",
            dataGrid: <AllowanceList shouldReload={shouldReload} />,
          },
          {
            index: 2,
            label: "Thưởng",
            dataGrid: <BonusList shouldReload={shouldReload} />
          }
        ]
      }
    />;
  </Fragment>
}