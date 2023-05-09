import './index.scss';
import React from 'react';
import { FavoriteDashboardCard } from '../item';
import { Dashboard, DashboardGroup, DashboardItem } from '@gotecq/model';

type FavoriteDashboardList = {
    aspectKey: string;
    allDashboards: Dashboard[];
    dashboardGroupList: DashboardGroup[];
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;
    onRemoveFavoriteSuccess?: (apiDashboard: Dashboard) => void;
};
export const FavoriteDashboardList: React.ComponentType<FavoriteDashboardList> = ({
    aspectKey, allDashboards, dashboardGroupList,
    onClickDashboard = () => { }, onRemoveFavoriteSuccess = () => { },
}) => {
    return (
        <div className="favorite-dashboard-aspect">
            {dashboardGroupList.map(group => {
                // no dashboard in group appear in favorite dashboard code list
                const groupDashboardCodes = group.items.map(dashboard => dashboard.code);
                const allFavoriteDashboardsCodes = allDashboards.filter(apiDashboard => apiDashboard.is_favorite).map(apiDashboard => apiDashboard.code);
                if (groupDashboardCodes.every(dasboardCode => !allFavoriteDashboardsCodes.includes(dasboardCode))) {
                    return null;
                }

                return (
                    <div
                        key={group._id}
                        className="favorite-dashboard-aspect-group"
                    >
                        <div className="group-name">
                            <b>{group.name}</b>
                        </div>

                        <div className="dashboard-list">
                            {group.items
                                .map(localDashboard => {
                                    const apiDashboard = allDashboards
                                        .find(api_dashboard => api_dashboard.code === localDashboard.code
                                            && api_dashboard.is_favorite);
                                    if (!apiDashboard) {
                                        return null;
                                    }

                                    return (
                                        <FavoriteDashboardCard
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
