import './index.scss';
import React from 'react';
import { FilterPanel, FilterPanelProps } from '@gotecq/filter';
import { DashboardFilterSchemas } from '@/constant/dashboard-filter-schema';
import { NonDataPanel } from '@gotecq/s8-component';
import { UserInfo, useUserInfo } from '@gotecq/access';
import { getDashboardByCode, getFilterExtraVariableMap } from '@/constant';
import { CustomActivityFilterElement } from './custom-activity-filter-element';
import { CustomStarFilterElement } from './custom-star-filter-element';

export type DashboardFilter = {
    dashboardCode: string;
    defaultDashboardParam: any;
    subPanel?: string;
    viewLevel: 'org' | 'network';
    handleChangeViewLevel: (level: 'org' | 'network') => void;
    clickTab: (menuKey: string) => void;
} & Pick<FilterPanelProps, 'value' | 'onFilterValueChange' | 'onSavedFilterChange' | 'onClear' | 'currentSavedItemID'>;
export const DashboardFilter: React.ComponentType<DashboardFilter> = ({ dashboardCode, value, onFilterValueChange, onSavedFilterChange, onClear, currentSavedItemID, defaultDashboardParam, subPanel, clickTab, viewLevel, handleChangeViewLevel }) => {
    const userInfo: UserInfo = useUserInfo();
    const filterSchema = React.useMemo(() => {
        return DashboardFilterSchemas[dashboardCode](subPanel);
    }, [dashboardCode, subPanel]);
    const dashboardData = React.useMemo(() => {
        return getDashboardByCode(dashboardCode);
    }, [dashboardCode]);

    const variableMap = React.useMemo(() => {
        const dashboard_data = getDashboardByCode(dashboardCode);
        if (!dashboard_data) {
            return {};
        }

        return ({
            ...(dashboard_data.defaultParamKey
                ? {
                    [dashboard_data.defaultParamKey]: () => dashboard_data.defaultParamValue ? dashboard_data.defaultParamValue : defaultDashboardParam,
                }
                : {}
            ),
            ...(dashboard_data.extraVariableMapKeys
                ? getFilterExtraVariableMap(
                    dashboard_data.extraVariableMapKeys,
                    { user_id: userInfo?._id },
                )
                : {}
            ),
        });
    }, [dashboardCode, defaultDashboardParam, userInfo?._id]);

    if (!filterSchema || !dashboardData || (!!dashboardData.defaultParamKey && !dashboardData.defaultParamValue && !defaultDashboardParam)) {
        return (
            <div className="dashboard-filter">
                <NonDataPanel />
            </div>
        );
    }
    return (
        <div className="dashboard-filter">
            <CustomActivityFilterElement dashboardCode={dashboardCode} subPanel={subPanel} clickTab={clickTab} />
            <CustomStarFilterElement dashboardCode={dashboardCode} viewLevel={viewLevel} handleChangeViewLevel={handleChangeViewLevel} />
            <FilterPanel
                key={defaultDashboardParam ?? 'dashboard-filter'}   // re-mount when defaultDashboardParam change
                title="QUERY"
                {...filterSchema}
                loggedId={userInfo?._id}
                value={value}
                currentSavedItemID={currentSavedItemID}
                onFilterValueChange={onFilterValueChange}
                onSavedFilterChange={onSavedFilterChange}
                onClear={onClear}
                variableMap={variableMap}
            />
        </div>
    );
};
