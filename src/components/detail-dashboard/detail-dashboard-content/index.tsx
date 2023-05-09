import './index.scss';
import React from 'react';
import { Dashboard } from '@gotecq/component.complex-component/domain-dashboard';
import { DashboardPanel } from '@gotecq/model';
import { DetailDashboardContentProps } from './constant';
import { DashboardCode } from '@/constant';
import { DefaultParamName } from '../constant';
import DashboardSummary from './dashboard-summary';

const dashboardContentMapping = {
    [DashboardCode.MEMBER_PANEL_SUMMARY]: Dashboard.MemberDashboard.MemberPanelSummary,
    [DashboardCode.QUALITY_MEASURE]: Dashboard.QualityDashboard.ProgramSummary,
    [DashboardCode.USER_MANAGEMENT]: Dashboard.UserDashboard.UserManagement,
    [DashboardCode.PROVIDER_MANAGEMENT]: Dashboard.ProviderDashboard.ProviderManagement,
    [DashboardCode.PROCESS_MANAGEMENT]: Dashboard.ProcessDashboard.ProcessManagement,
    [DashboardCode.MAH_DASHBOARD]: Dashboard.QualityDashboard.MAHDashboard,
    [DashboardCode.INVENTORY_MANAGEMENT]: Dashboard.MemberEngagementDashboard.MemberEngagement,
    [DashboardCode.ACTIVITY_SUMMARY]: Dashboard.QualityDashboard.ActivitySummary,
    [DashboardCode.STAR_DASHBOARD]: Dashboard.QualityDashboard.StarDashboard,
    [DashboardCode.HIGH_COST_MEMBERS]: Dashboard.MemberDashboard.HighCostMember,
    [DashboardCode.COMPLICATED_CONDITIONS_MEMBER]: Dashboard.MemberDashboard.ComplicatedConditionsMember,
    [DashboardCode.POTENTIAL_HIGH_COST_MEMBERS]: Dashboard.MemberDashboard.PotentialHighCostMember,
    [DashboardCode.CHRONIC_RENAL_FAILURE_MEMBERS]: Dashboard.MemberDashboard.ChronicRenalTable,
    [DashboardCode.HOME_HEALTH_EMERGENCY_ROOM_VISITS]: Dashboard.MemberDashboard.ERHomeHealthVisitTable,
    [DashboardCode.MEMBERS_WITHOUT_OFFICE_VISIT]: Dashboard.MemberDashboard.NoOfficeVisitTable,
    [DashboardCode.MEMBER_DISTRIBUTION_MAP]: Dashboard.MemberDashboard.MemberDistributionMap,
};

export const DetailDashboardContent = React.forwardRef<HTMLDivElement, DetailDashboardContentProps>((
    {
        dashboardData, filter, subPanel, order, viewLevel, defaultDashboardParam,
        dashboardState, dashboardDrilldownState, aspectKey, searchText, onSearch, onClickDashboard,
        onDashboardStateChange, onDashboardDrilldownStateChange,
    },
    ref, // ref for printing dashboard content
) => {
    const Comp: React.ComponentType<DashboardPanel<any, any, any>> = React.useMemo(() => {
        return dashboardContentMapping?.[dashboardData.code];
    }, [dashboardData]);

    if (!Comp) {
        return (
            <DashboardSummary
                aspectKey={aspectKey}
                searchText={searchText}
                onSearch={onSearch}
                onClickDashboard={onClickDashboard}
            />
        );
    }

    return (
        <div ref={ref} className={`detail-dashboard-content detail-dashboard-content__${dashboardData.code}`}>
            <Comp
                props={{
                    filter,
                    subPanel,
                    order,
                    viewLevel,
                    ...(defaultDashboardParam
                        ? {
                            // FOR NOW: ONLY Dashboard with named default param is passed defaultParam to Dashboard component
                            // if something goes wrong, please check DefaultParamName
                            [DefaultParamName[dashboardData.code]]: defaultDashboardParam,
                        }
                        : {}
                    ),

                }}
                state={dashboardState || undefined}
                onStateChange={onDashboardStateChange}
                drilldownState={dashboardDrilldownState || undefined}
                onDrilldownStateChange={onDashboardDrilldownStateChange}
            />
        </div>
    );
});
