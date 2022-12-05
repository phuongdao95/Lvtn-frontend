import { Route, Routes } from "react-router";

import WorkFlows from "../../modules/approve-workflow/user/WorkFlows";
import MyRequests from "../../modules/approve-workflow/view-requests/MyRequests";
import MyToDoRequests from "../../modules/approve-workflow/view-requests/MyToDoRequest";

import ConfigNghiPhep from "../../modules/approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan";
import ConfigCheckinout from "../../modules/approve-workflow/check-inout-manual/ConfigCheckinout";

import UserNghiPhep from "../../modules/approve-workflow/nghi-phep/UserNghiPhep";
import ViewNghiPhep from "../../modules/approve-workflow/nghi-phep/ViewNghiPhep";
import UserNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan";
import ViewNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ViewNghiThaiSan";
import UserCheckinout from "../../modules/approve-workflow/check-inout-manual/UserCheckinout";
import ViewCheckInOut from "../../modules/approve-workflow/check-inout-manual/ViewCheckInOut";

import WorkflowConfig from "../../modules/approve-workflow/configs/WorkflowConfig";

import ListUsers from "../../modules/shares/pages/ListUsers/ListUsers";
import Timekeeping from "../../modules/check-day/pages/Timekeeping";
import Registe from "../../modules/check-day/pages/Registe";
import CheckIn from "../../modules/check-day/pages/CheckIn";
import Calendar from "../../modules/check-day/pages/Calendar";
import TypeWorkDayConfig from "../../modules/settings/check-day-config/TypeWorkDayConfig/TypeWorkDayConfig";
import RulesWorkDayConfig from "../../modules/settings/check-day-config/RulesWorkDayConfig/RulesWorkDayConfig";
import PunishWorkDayConfig from "../../modules/settings/check-day-config/PunishWorkDayConfig/PunishWorkDayConfig";
import HolidayConfig from "../../modules/settings/check-day-config/HolidayConfig/HolidayConfig";
import TypeWorkShiftConfig from "../../modules/settings/check-day-config/TypeWorkShiftConfig/TypeWorkShiftConfig";
import SelectTypeWorkShift from "../../modules/check-day/pages/SelectTypeWorkShift"
import WorkingShiftList from "../../modules/check-day/pages/WorkingShiftList"

import DABList from "../../modules/salary-management/pages/DABList/DABList";
import SalaryList from "../../modules/salary-management/pages/SalaryList";

import GroupList from "../../modules/administration/pages/GroupList/GroupList";
import PermissionList from "../../modules/administration/pages/PermissionList/PermissionList";
import UserList from "../../modules/administration/pages/UserList";
import RoleList from "../../modules/administration/pages/RoleList/RoleList";
import DepartmentList from "../../modules/administration/pages/DepartmentList";
import TeamList from "../../modules/administration/pages/TeamList";
import PayrollList from "../../modules/salary-management/pages/PayRollList/PayrollList.jsx";
import UserProfile from "../../modules/shares/pages/UserProfile/UserProfile";
import MyDABs from "../../modules/salary-management/pages/MyDABs/MyDABs";
import FormulaVariable from "../../modules/salary-management/pages/FormulaVariable/FormulaVariable";
import BoardDetail from "../../modules/virtual-space/pages/BoardDetail";
import BoardList from "../../modules/virtual-space/pages/BoardList";
import LabelList from "../../modules/virtual-space/pages/LabelList";
import SalaryGroupList from "../../modules/salary-management/pages/SalaryGroup/SalaryGroupList";
import ColumnList from "../../modules/virtual-space/pages/ColumnList";
import PayslipList from "../../modules/salary-management/pages/PayRollList/PayslipList";
import PayslipDetail from "../../modules/salary-management/pages/PayRollList/PayslipDetail";
import MyPayslipList from "../../modules/salary-management/pages/MyPayslipList/MyPayslipList";
import MyPayslipDetail from "../../modules/salary-management/pages/MyPayslipList/MyPayslipDetail";
import ViewCheckDay from "../../modules/check-day/pages/TimekeepingListSchedule";
import WorkingShiftRegistrationList from "../../modules/check-day/pages/WorkingShiftRegistrationList";
import TimekeepingSchedule from "../../modules/check-day/pages/TimekeepingListSchedule";
import RegisteredWorkingShiftList from "../../modules/check-day/pages/RegisteredWorkingShiftList"

import NotFound from "../../modules/shares/404/NotFound";
import HomePage from "../../modules/shares/homepage/HomePage";

export default function Routings() {
    return <Routes>
        <Route path="/approve-workflows" element={<WorkFlows />} />
        <Route exact path="/approve-workflows/configs" element={<WorkflowConfig />} />
        <Route path="/approve-workflows/my-requests" element={<MyRequests />} />
        <Route path="/approve-workflows/my-todo-requests" element={<MyToDoRequests />} />

        <Route exact path="/approve-workflows/user-nghi-phep/:id" element={<UserNghiPhep />} /> { /*new and update*/}
        <Route exact path="/approve-workflows/user-nghi-phep/view/:id" element={<ViewNghiPhep isApprover={false} />} /> { /*view the flow*/}
        <Route exact path="/approve-workflows/user-nghi-phep/todo/:id" element={<ViewNghiPhep isApprover={true} />} /> { /*view and update flow for approver*/}

        <Route exact path="/approve-workflows/user-nghi-thai-san/:id" element={<UserNghiThaiSan />} />
        <Route exact path="/approve-workflows/user-nghi-thai-san/view/:id" element={<ViewNghiThaiSan isApprover={false} />} /> { /*view the flow*/}
        <Route exact path="/approve-workflows/user-nghi-thai-san/todo/:id" element={<ViewNghiThaiSan isApprover={true} />} /> { /*view and update flow for approver*/}


        <Route exact path="/approve-workflows/user-check-in-out/:id" element={<UserCheckinout />} />
        <Route exact path="/approve-workflows/user-check-in-out/view/:id" element={<ViewCheckInOut isApprover={false} />} /> { /*view the flow*/}
        <Route exact path="/approve-workflows/user-check-in-out/todo/:id" element={<ViewCheckInOut isApprover={true} />} /> { /*view and update flow for approver*/}

        <Route exact path="/approve-workflows/configs/config-nghi-phep" element={<ConfigNghiPhep />} />
        <Route exact path="/approve-workflows/configs/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />
        <Route exact path="/approve-workflows/configs/config-check-in-out" element={<ConfigCheckinout />} />

        <Route path="/check-in-2" element={<CheckIn />} />
        {/* <Route path="/check-out" element={<Timekeeping />} /> */}
        <Route path="/registe-image" element={<Registe />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/select-type-work-shift" element={<SelectTypeWorkShift />} />

        <Route path="/taskboard" element={<BoardList />} />
        <Route path="/taskboard/:id" element={<BoardDetail />} />
        <Route path="/taskboard/:id/label" element={<LabelList />} />
        <Route path="/taskboard/:id/column" element={<ColumnList />} />

        <Route path="/check-day-config/type-work-day" element={<TypeWorkDayConfig />} />
        <Route path="/check-day-config/rules-work-day" element={<RulesWorkDayConfig />} />
        <Route path="/check-day-config/punish-work-day" element={<PunishWorkDayConfig />} />
        <Route path="/check-day-config/holiday" element={<HolidayConfig />} />
        <Route path="/check-day-config/type-work-shift-day" element={<TypeWorkShiftConfig />} />

        <Route path="/list-users" element={<ListUsers />} />

        {/* Administration module */}

        <Route path="/user" element={
            // <ProtectedRoute>
            <UserList />
            // </ProtectedRoute>
        } />

        <Route path="/role" element={
            // <ProtectedRoute>
            // </ProtectedRoute>
            <RoleList />
        } />
        <Route path="/group" element={<GroupList />} />
        <Route path="/team" element={<TeamList />} />
        <Route path="/permission" element={<PermissionList />} />
        <Route path="/department" element={<DepartmentList />} />

        {/* Timekeeping module */}
        <Route path="timekeeping-schedule" element={<TimekeepingSchedule />} />
        <Route path="timekeeping-check" element={<CheckIn />} />
        <Route path="workingshift-registration" element={<WorkingShiftRegistrationList />} />
        <Route path="workingshift" element={<WorkingShiftList />} />
        <Route path="registered-workingshift" element={<RegisteredWorkingShiftList />} />

        {/* Salary Management Module */}
        <Route path="/salary" element={<SalaryList />} />
        <Route path="/dab" element={<DABList />} />
        <Route path="/formula-variable" element={<FormulaVariable />} />
        <Route path="/payroll" element={<PayrollList />} />
        <Route path="/payroll/:id/payslip" element={<PayslipList />} />
        <Route path="/payroll/:payrollId/payslip/:payslipId" element={<PayslipDetail />} />
        <Route path="/salary-group/" element={<SalaryGroupList />} />
        <Route path="/my-dab" element={<MyDABs />} />
        <Route path="/my-payslips" element={<MyPayslipList />} />
        <Route path="/my-payslips/:payslipId" element={<MyPayslipDetail />} />


        {/** Shared module */}
        <Route path="/my-profile" element={<UserProfile />} />

        <Route exact path="/" element={<HomePage />} />

        {/* Return not found page if there's no valid route */}
        <Route path="*" element={<NotFound />} />
        
        <Route path="/scheduler"
            element={
                <ViewCheckDay />
            }
        />
    </Routes>
}