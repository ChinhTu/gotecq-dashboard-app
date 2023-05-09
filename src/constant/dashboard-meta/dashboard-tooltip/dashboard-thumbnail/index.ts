import { DashboardCode } from '../../dashboard-code';

import MemberPanelSummaryThumbnail from '../dashboard-thumbnail/member-management.png';
import QualityMeasureThumbnail from '../dashboard-thumbnail/quality-measure.png';
import UserManagementThumbnail from '../dashboard-thumbnail/user-management.png';
import ProviderManagementThumbnail from '../dashboard-thumbnail/provider-management.png';
import ProcessManagementThumbnail from '../dashboard-thumbnail/process-management.png';
import MAHDashboardThumbnail from '../dashboard-thumbnail/mah-dashboard.png';
import InventoryDashboardThumbnail from '../dashboard-thumbnail/inventory-management.png';
import ActivitySummaryThumbnail from '../dashboard-thumbnail/activity-summary.png';
import StarDashboardThumbnail from '../dashboard-thumbnail/star-dashboard.png';
import HighCostMembersThumbnail from '../dashboard-thumbnail/high-cost-members.png';
import ComplicatedConditionsMemberThumbnail from '../dashboard-thumbnail/complicated-conditions-member.png';
import PotentialHighCostMemberThumbnail from '../dashboard-thumbnail/potential-high-cost-member.png';
import ChronicRenalThumbnail from '../dashboard-thumbnail/chronic-renal-members.png';
import HomeHealthVisitsThumbnail from '../dashboard-thumbnail/home-health-visits.png';
import NoOfficeVisitThumbnail from '../dashboard-thumbnail/no-office-visit.png';
import MemberDistributionMapThumbnail from '../dashboard-thumbnail/member-distribution-map.png';

export const DashboardThumbnailMapping = {
    [DashboardCode.MEMBER_PANEL_SUMMARY]: MemberPanelSummaryThumbnail,
    [DashboardCode.QUALITY_MEASURE]: QualityMeasureThumbnail,
    [DashboardCode.USER_MANAGEMENT]: UserManagementThumbnail,
    [DashboardCode.PROVIDER_MANAGEMENT]: ProviderManagementThumbnail,
    [DashboardCode.PROCESS_MANAGEMENT]: ProcessManagementThumbnail,
    [DashboardCode.MAH_DASHBOARD]: MAHDashboardThumbnail,
    [DashboardCode.INVENTORY_MANAGEMENT]: InventoryDashboardThumbnail,
    [DashboardCode.ACTIVITY_SUMMARY]: ActivitySummaryThumbnail,
    [DashboardCode.STAR_DASHBOARD]: StarDashboardThumbnail,
    [DashboardCode.HIGH_COST_MEMBERS]: HighCostMembersThumbnail,
    [DashboardCode.COMPLICATED_CONDITIONS_MEMBER]: ComplicatedConditionsMemberThumbnail,
    [DashboardCode.POTENTIAL_HIGH_COST_MEMBERS]: PotentialHighCostMemberThumbnail,
    [DashboardCode.CHRONIC_RENAL_FAILURE_MEMBERS]: ChronicRenalThumbnail,
    [DashboardCode.HOME_HEALTH_EMERGENCY_ROOM_VISITS]: HomeHealthVisitsThumbnail,
    [DashboardCode.MEMBERS_WITHOUT_OFFICE_VISIT]: NoOfficeVisitThumbnail,
    [DashboardCode.MEMBER_DISTRIBUTION_MAP]: MemberDistributionMapThumbnail,
};