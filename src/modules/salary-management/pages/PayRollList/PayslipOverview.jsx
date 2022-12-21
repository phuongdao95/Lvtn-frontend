import React, { Fragment } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import Label from "../../../../components/DialogForm/Label";
import { useFetchOnePayslip } from "../../../../client/payrollService";

export default function PayslipOverview() {
    const { payslipId } = useParams();

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchDetail,
        data: detail
    } = useFetchOnePayslip();

    React.useEffect(() => {
        fetchDetail(payslipId);
    }, [])

    return <Box>
        {detail &&

            <Fragment>

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tên nhân viên"} />
                                <Typography>
                                    {detail.employeeName}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Mô tả"} />
                                <Typography>
                                    {detail.description}
                                </Typography>
                            </Box>
                        </Fragment>
                    }
                />


                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tên payslip"} />
                                <Typography>
                                    {detail.name}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Fragment>
                                <Box>
                                    <Label text={"Tháng"} />
                                    <Typography>
                                        {detail.month}
                                    </Typography>
                                </Box>
                            </Fragment>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Lương cơ bản"} />
                                <Typography>
                                    {detail.baseSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Lương thực tế"} />
                                <Typography>
                                    {detail.actualSalary.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Typography>
                            </Box>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tổng khấu trừ"} />
                                <Typography>
                                    {(detail.totalDeduction ?? 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tổng phụ cấp"} />
                                <Typography>
                                    {(detail.totalAllowance ?? 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Typography>
                            </Box>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tổng thưởng"} />
                                <Typography>
                                    {(detail.totalBonus ?? 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tổng lương chấm công"} />
                                <Typography>
                                    {(detail.salaryAfterTimekeeepingCalculation ?? 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Typography>
                            </Box>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Công thức áp dụng"} />
                                <Typography>
                                    {detail.formulaName}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Định nghĩa Công thức"} />
                                <Typography>
                                    {detail.formulaDefine}
                                </Typography>
                            </Box>
                        </Fragment>
                    }
                />
            </Fragment>
        }
    </Box>;
}