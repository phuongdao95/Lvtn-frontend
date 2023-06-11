import React, { Fragment } from "react";
import DataGridTabLayout from "../../../../layouts/DataGridTabLayout";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import FormulaList from "./FormulaList";
import VariableList from "./VariableList";
import SystemVariableList from "./SystemVariableList";
import CreateFormula from "./CreateFormula";
import CreateVariable from "./CreateVariable";

export default function FormulaVariable() {
    const [isCreateFormulaOpen, setIsCreateFormulaOpen] = React.useState(false);
    const [isCreateVariableOpen, setIsCreateVariableOpen] = React.useState(false);

    return <Fragment>
        {isCreateFormulaOpen &&
            <CreateFormula closeDialogCb={() => setIsCreateFormulaOpen(false)} />
        }

        {isCreateVariableOpen &&
            <CreateVariable closeDialogCb={() => setIsCreateVariableOpen(false)} />
        }

        <DataGridTabLayout
            title={"Công thức và biến"}
            primaryButtonSection={<MenuButton
                text={"Thao tác"}
                menu={
                    [
                        {
                            text: "Tạo mới Công thức",
                            handler: () => {
                                setIsCreateFormulaOpen(true)
                            }
                        },
                        {
                            text: "Tạo mới Biến",
                            handler: () => setIsCreateVariableOpen(true)
                        }
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
                        label: "Công thức",
                        dataGrid: <FormulaList />,
                    },
                    {
                        index: 1,
                        label: "Biến",
                        dataGrid: <VariableList />,
                    },
                    {
                        index: 2,
                        label: "Biến hệ thống",
                        dataGrid: <SystemVariableList />
                    }
                ]
            }
        />
    </Fragment>
}