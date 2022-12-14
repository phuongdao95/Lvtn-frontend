import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import Select from "../../../../components/DialogForm/Select";
import AutoComplete from "../../../../components/DialogForm/AutoComplete";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import { useCreateDAB, useFetchOneDAB } from "../../../../client/dabService";
import { useFetchListFormula } from "../../../../client/formulaService";
import { useFormik } from "formik";
import { useFetchListGroup } from "../../../../client/groupService";
import dayjs from "dayjs";

function generateYears() {
    return Array.from({ length: 200 }, (_, i) => i + 2020)
}

export default function CreateDAB({ closeDialogCb, reload }) {
    const [groupOptions, setGroupOptions] = React.useState([]);
    const [formulaOptions, setFormulaOptions] = React.useState([]);

    const {
        isSuccess: isFetchGroupsSuccess,
        isPending: isFetchGroupsPending,
        isError: isFetchGroupsError,
        data: groups,
        method: fetchGroupList
    } = useFetchListGroup();

    const {
        isSuccess: isUpdateSuccess,
        isPending: isUpdatePending,
        isError: isUpdateError,
        method: createDAB,
    } = useCreateDAB();

    const {
        isSuccess: isFetchListFormulaSuccess,
        isPending: isFetchListFormulaPending,
        isError: isFetchListFormulaError,
        method: fetchFormulaList,
        data: fetchedFormulaList
    } = useFetchListFormula();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            type: "",
            fromMonth: 1,
            toMonth: 1,
            year: 2022,
            group: null,
            formulaName: null,
        },
        onSubmit: (values) => {
            createDAB({
                ...values,
                groupId: values.group?.id,
                formulaName: values.formulaName?.id
            })
        }
    });

    React.useEffect(() => {
        fetchFormulaList("salarydelta");
        fetchGroupList();
    }, []);

    React.useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setFormulaOptions(fetchedFormulaList.data.map((formula) => ({ id: formula.name })))
        }
    }, [isFetchListFormulaSuccess])

    React.useEffect(() => {
        if (isUpdateSuccess) { 
            reload();
            closeDialogCb();
        }
    }, [isUpdateSuccess])

    React.useEffect(() => {
        if (isFetchGroupsSuccess) {
            setGroupOptions(groups.data.map(group => ({ id: group.id, name: group.name })))
        }
    }, [isFetchGroupsSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => {
                formik.submitForm();
            },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="T???o m???i kh???u tr???, ph??? c???p, th?????ng"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isUpdatePending} />
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"T??n"} />
                            <TextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Lo???i"} />
                            <Select
                                id="type"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                menu={[
                                    {
                                        label: "Kh???u tr???",
                                        value: "Deduction"
                                    },
                                    {
                                        label: "Ph??? c???p",
                                        value: "Allowance",
                                    },
                                    {
                                        label: "Th?????ng",
                                        value: "Bonus"
                                    }
                                ]}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Th??ng b???t ?????u"} />
                        <Select
                            value={formik.values.fromMonth}
                            onChange={(event) => {
                                formik.setFieldValue("fromMonth", event.target.value);
                            }}
                            menu={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                            ].map((value) => ({ label: `Th??ng ${value}`, value: value }))}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Th??ng k???t th??c"} />
                        <Select
                            value={formik.values.toMonth}
                            onChange={(event) => {
                                formik.setFieldValue("toMonth", event.target.value);
                            }}
                            menu={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                            ].map((value) => ({ label: `Th??ng ${value}`, value: value }))}
                        />
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"N??m"} />
                        <Select
                            value={formik.values.year}
                            onChange={(event) => {
                                formik.setFieldValue("year", event.target.value)
                            }}
                            menu={generateYears().map((value) =>
                                ({ label: `N??m ${value}`, value: value }))}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                    </Fragment>}
                />


                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Nh??m"} />
                            <AutoComplete
                                id="group"
                                name="group"
                                options={groupOptions}
                                value={formik.values.group}
                                onChange={(event, value) => {
                                    formik.setFieldValue("group", value);
                                }}
                            />
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"C??ng th???c"} />
                            <AutoComplete
                                id="formulaName"
                                name="formulaName"
                                options={formulaOptions}
                                value={formik.values.formulaName}
                                getOptionLabel={(option) => option.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, value) => {
                                    formik.setFieldValue("formulaName", value);
                                }}
                            />
                        </Fragment>}
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"M?? t???"} />
                            <TextField />
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >
}