import { Route, Routes } from "react-router";

import WorkFlows from "../../modules/approve-workflow/user/WorkFlows";
import MyRequests from "../../modules/approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../../modules/approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan";

import UserNghiPhep from "../../modules/approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan";

import ListUsers from "../../modules/shares/pages/ListUsers/ListUsers";
import Timekeeping from "../../modules/check-day/pages/Timekeeping";
import VirtualSpace from "../../modules/virtual-space/pages/VirtualSpace";
import TableConfig from "../../modules/settings/virtual-space-config/TableConfig/TableConfig";
import LabelConfig from "../../modules/settings/virtual-space-config/LabelConfig/LabelConfig";
import TypeWorkDayConfig from "../../modules/settings/check-day-config/TypeWorkDayConfig/TypeWorkDayConfig";
import RulesWorkDayConfig from "../../modules/settings/check-day-config/RulesWorkDayConfig/RulesWorkDayConfig";
import PunishWorkDayConfig from "../../modules/settings/check-day-config/PunishWorkDayConfig/PunishWorkDayConfig";
import HolidayConfig from "../../modules/settings/check-day-config/HolidayConfig/HolidayConfig";

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

export default function Routings() {
    return <Routes>
        <Route path="/approve-workflows" element={<WorkFlows />} />
        <Route path="/approve-workflows/my-requests" element={<MyRequests />} />

        <Route exact path="/approve-workflows/user-nghi-phep" element={<UserNghiPhep />} />
        <Route exact path="/approve-workflows/user-nghi-thai-san" element={<UserNghiThaiSan />} />

        <Route exact path="/approve-workflows/config-nghi-phep" element={<ConfigNghiPhep />} />
        <Route exact path="/approve-workflows/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />

        <Route path="/check-in" element={<Timekeeping />} />
        <Route path="/virtual-space" element={<VirtualSpace />} />
        <Route path="/virtual-space-config/table" element={<TableConfig />} />
        <Route path="/virtual-space-config/label" element={<LabelConfig />} />
        <Route path="/check-day-config/type-work-day" element={<TypeWorkDayConfig />} />
        <Route path="/check-day-config/rules-work-day" element={<RulesWorkDayConfig />} />
        <Route path="/check-day-config/punish-work-day" element={<PunishWorkDayConfig />} />
        <Route path="/check-day-config/holiday" element={<HolidayConfig />} />

        <Route path="/list-users" element={<ListUsers />} />

        {/* Administration module */}
        <Route path="/user" element={<UserList />} />
        <Route path="/role" element={<RoleList />} />
        <Route path="/group" element={<GroupList />} />
        <Route path="/permission" element={<PermissionList />} />
        <Route path="/department" element={<DepartmentList />} />
        <Route path="/team" element={<TeamList />} />
        <Route path="/group" element={<Group />} />

        {/* Salary Management Module */}
        <Route path="/salary" element={<SalaryList />} />
        <Route path="/dab" element={<DABList />} />
        <Route path="/formula" element={<FormulaList />} />
        <Route path="/formula-variable" element={<FormulaVariable />} />
        <Route path="/payroll/:id" element={<EditPayroll />} />
        <Route path="/payroll" element={<PayrollList />} />
        <Route path="/my-dab" element={<MyDABs />} />

        {/** Shared module */}
        <Route path="/my-profile" element={<UserProfile />} />

        {/* Legacy components */}
        <Route path="/account-role" element={<AccountsAndRolesPage />} />
    </Routes>
}