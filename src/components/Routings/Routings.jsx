import { Route, Routes } from "react-router";

import WorkFlows from "../../modules/approve-workflow/user/WorkFlows";
import MyRequests from "../../modules/approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../../modules/approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan";
import ConfigAdvancePayment from "../../modules/approve-workflow/advance-payment/ConfigAdvancePayment";
import ConfigCheckinout from "../../modules/approve-workflow/check-inout-manual/ConfigCheckinout";
import ConfigCost from "../../modules/approve-workflow/cost/ConfigCost";
import ConfigHelpdesk from "../../modules/approve-workflow/helpdesk/ConfigHelpdesk";
import ConfigOvertime from "../../modules/approve-workflow/overtime/ConfigOvertime";
import ConfigWFH from "../../modules/approve-workflow/wfh/ConfigWFH";

import UserNghiPhep from "../../modules/approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan";
import UserAdvancePayment from "../../modules/approve-workflow/advance-payment/UserAdvancePayment";
import UserCheckinout from "../../modules/approve-workflow/check-inout-manual/UserCheckinout";
import UserCost from "../../modules/approve-workflow/cost/UserCost";
import UserHelpdesk from "../../modules/approve-workflow/helpdesk/UserHelpdesk";
import UserOvertime from "../../modules/approve-workflow/overtime/UserOvertime";
import UserWFH from "../../modules/approve-workflow/wfh/UserWFH";
import WorkflowConfig from "../../modules/approve-workflow/configs/WorkflowConfig";

import ListUsers from "../../modules/shares/pages/ListUsers/ListUsers";
import Timekeeping from "../../modules/check-day/pages/Timekeeping";
import Registe from "../../modules/check-day/pages/Registe";
import CheckIn from "../../modules/check-day/pages/CheckIn";
import Calendar from "../../modules/check-day/pages/Calendar";
import TableConfig from "../../modules/settings/virtual-space-config/TableConfig/TableConfig";
import LabelConfig from "../../modules/settings/virtual-space-config/LabelConfig/LabelConfig";
import TypeWorkDayConfig from "../../modules/settings/check-day-config/TypeWorkDayConfig/TypeWorkDayConfig";
import RulesWorkDayConfig from "../../modules/settings/check-day-config/RulesWorkDayConfig/RulesWorkDayConfig";
import PunishWorkDayConfig from "../../modules/settings/check-day-config/PunishWorkDayConfig/PunishWorkDayConfig";
import HolidayConfig from "../../modules/settings/check-day-config/HolidayConfig/HolidayConfig";
import TypeWorkShiftConfig from "../../modules/settings/check-day-config/TypeWorkShiftConfig/TypeWorkShiftConfig";
import SelectTypeWorkShift from "../../modules/check-day/pages/SelectTypeWorkShift"

import DABList from "../../modules/salary-management/pages/DABList/DABList";
import FormulaList from "../../modules/salary-management/pages/FormulaList/FormulaList";
import SalaryList from "../../modules/salary-management/pages/SalaryList";

import GroupList from "../../modules/administration/pages/GroupList/GroupList";
import PermissionList from "../../modules/administration/pages/PermissionList/PermissionList";
import UserList from "../../modules/administration/pages/UserList";
import RoleList from "../../modules/administration/pages/RoleList/RoleList";
import DepartmentList from "../../modules/administration/pages/DepartmentList";
import TeamList from "../../modules/administration/pages/TeamList";
import AccountsAndRolesPage from "../../modules/shares/pages/AccountsAndRolesPage/AccountsAndRolesPage";
import PayrollList from "../../modules/salary-management/pages/PayRollList/PayrollList.jsx";
import EditPayroll from "../../modules/salary-management/pages/PayRollList/EditPayroll";
import UserProfile from "../../modules/shares/pages/UserProfile/UserProfile";
import MyDABs from "../../modules/salary-management/pages/MyDABs/MyDABs";
import FormulaVariable from "../../modules/salary-management/pages/FormulaVariable/FormulaVariable";
import { Group } from "@mui/icons-material";
import BoardDetail from "../../modules/virtual-space/pages/BoardDetail";
import BoardList from "../../modules/virtual-space/pages/BoardList";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function Routings() {
    return <Routes>
        <Route path="/approve-workflows" element={<WorkFlows />} />
        <Route exact path="/approve-workflows/configs" element={<WorkflowConfig />} />
        <Route path="/approve-workflows/my-requests" element={<MyRequests />} />

        <Route exact path="/approve-workflows/user-nghi-phep/:id" element={<UserNghiPhep />} />
        <Route exact path="/approve-workflows/:id" element={<UserNghiPhep />} />


        <Route exact path="/approve-workflows/user-nghi-thai-san" element={<UserNghiThaiSan />} />
        <Route exact path="/approve-workflows/user-advance-payment" element={<UserAdvancePayment />} />
        <Route exact path="/approve-workflows/user-check-in-out" element={<UserCheckinout />} />
        <Route exact path="/approve-workflows/user-cost" element={<UserCost />} />
        <Route exact path="/approve-workflows/user-helpdesk" element={<UserHelpdesk />} />
        <Route exact path="/approve-workflows/user-overtime" element={<UserOvertime />} />
        <Route exact path="/approve-workflows/user-wfh" element={<UserWFH />} />

        <Route exact path="/approve-workflows/configs/config-nghi-phep" element={<ConfigNghiPhep />} />
        <Route exact path="/approve-workflows/configs/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />
        <Route exact path="/approve-workflows/configs/config-advance-payment" element={<ConfigAdvancePayment />} />
        <Route exact path="/approve-workflows/configs/config-check-in-out" element={<ConfigCheckinout />} />
        <Route exact path="/approve-workflows/configs/config-cost" element={<ConfigCost />} />
        <Route exact path="/approve-workflows/configs/config-helpdesk" element={<ConfigHelpdesk />} />
        <Route exact path="/approve-workflows/configs/config-overtime" element={<ConfigOvertime />} />
        <Route exact path="/approve-workflows/configs/config-wfh" element={<ConfigWFH />} />

        <Route path="/check-in-2" element={<Timekeeping />} />
        <Route path="/check-in" element={<CheckIn />} />
        {/* <Route path="/check-out" element={<Timekeeping />} /> */}
        <Route path="/registe-image" element={<Registe />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/select-type-work-shift" element={<SelectTypeWorkShift />} />

        <Route path="/virtual-space/" element={<BoardDetail />} />
        <Route path="/virtual-space/board" element={<BoardList />} />
        <Route path="/virtual-space/table-config" element={<TableConfig />} />
        <Route path="/virtual-space/label-config" element={<LabelConfig />} />

        <Route path="/check-day-config/type-work-day" element={<TypeWorkDayConfig />} />
        <Route path="/check-day-config/rules-work-day" element={<RulesWorkDayConfig />} />
        <Route path="/check-day-config/punish-work-day" element={<PunishWorkDayConfig />} />
        <Route path="/check-day-config/holiday" element={<HolidayConfig />} />
        <Route path="/check-day-config/type-work-shift-day" element={<TypeWorkShiftConfig />} />

        <Route path="/list-users" element={<ListUsers />} />

        {/* Administration module */}

        <Route path="/user" element={
            <ProtectedRoute>
                <UserList />
            </ProtectedRoute>
        } />

        <Route path="/role" element={
            <ProtectedRoute>
                <RoleList />
            </ProtectedRoute>
        } />
        <Route path="/group" element={<GroupList />} />
        <Route path="/permission" element={<PermissionList />} />
        <Route path="/department" element={<DepartmentList />} />
        <Route path="/team" element={<TeamList />} />
        <Route path="/group" element={<Group />} />

        {/* Salary Management Module */}
        <Route path="/salary" element={<SalaryList />} />
        <Route path="/dab" element={<DABList />} />
        <Route path="/my-dab" element={<MyDABs />} />
        <Route path="/formula" element={<FormulaList />} />
        <Route path="/formula-variable" element={<FormulaVariable />} />
        <Route path="/payroll" element={<PayrollList />} />
        <Route path="/payroll/:id" element={<EditPayroll />} />

        {/** Shared module */}
        <Route path="/my-profile" element={<UserProfile />} />

    </Routes>
}