import './index.scss';
import React from 'react';
import { DashboardSummaryCard } from '../item';
import { Dashboard, DashboardGroup, DashboardItem } from '@gotecq/model';

type DashboardSummaryList = {
    aspectKey: string;
    allDashboards: Dashboard[];
    dashboardGroupList: DashboardGroup[];
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;
    onRemoveFavoriteSuccess?: (apiDashboard: Dashboard) => void;
};
export const DashboardSummaryList: React.ComponentType<DashboardSummaryList> = ({
    aspectKey, allDashboards, dashboardGroupList,
    onClickDashboard = () => { }, onRemoveFavoriteSuccess = () => { },
}) => {
    return (
        <div className="dashboard-summary-aspect">
            {dashboardGroupList.map(group => {
                const groupDashboardCodes = group.items.map(dashboard => dashboard.code);
                const allFavoriteDashboardsCodes = allDashboards.map(apiDashboard => apiDashboard.code);
                if (groupDashboardCodes.every(dasboardCode => !allFavoriteDashboardsCodes.includes(dasboardCode))) {
                    return null;
                }

                return (
                    <div
                        key={group._id}
                        className="dashboard-summary-aspect-group"
                        style={group._id === 'summary' ? ({ 'display':'none' }) : ({ 'display':'block' })}
                    >
                        <div className="group-name">
                            <b>{group.name}</b>
                        </div>

                        <div className="dashboard-list">
                            {group.items
                                .map(localDashboard => {
                                    const apiDashboard = allDashboards
                                        .find(api_dashboard => api_dashboard.code === localDashboard.code
                                            && api_dashboard.code !== 'summary');
                                    if (!apiDashboard) {
                                        return null;
                                    }

                                    return (
                                        <DashboardSummaryCard
                                            key={localDashboard.code}
                                            localDashboard={localDashboard}
                                            apiDashboard={apiDashboard}
                                            onClick={() => onClickDashboard(aspectKey, group, localDashboard)}
                                            onRemoveFavoriteSuccess={() => onRemoveFavoriteSuccess(apiDashboard)}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
