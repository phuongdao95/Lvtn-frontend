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
                                <Label text={"Description"} />
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
                                <Label text={"Name"} />
                                <Typography>
                                    {detail.name}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Description"} />
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
                                <Label text={"Month"} />
                                <Typography>
                                    {detail.month}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Year"} />
                                <Typography>
                                    {detail.Year}
                                </Typography>
                            </Box>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Lương cơ bản"} />
                                <Typography>
                                    {detail.baseSalary}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Lương thực tế"} />
                                <Typography>
                                    {detail.actualSalary}
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
                                    {detail.totalDeduction ?? 0}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tổng phụ cấp"} />
                                <Typography>
                                    {detail.totalAllowance ?? 0}
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
                                    {detail.totalBonus ?? 0}
                                </Typography>
                            </Box>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Box>
                                <Label text={"Tổng lương chấm công"} />
                                <Typography>
                                    {detail.salaryAfterTimekeeepingCalculation ?? 0}
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