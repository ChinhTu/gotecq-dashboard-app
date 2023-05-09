import './index.scss';
import React from 'react';
import { mergeClass } from '@gotecq/utils';
import { DashboardFilter } from './dashboard-filter';
import { DashboardWorkList } from './dashboard-work-list';
import { DashboardDiscussion } from './dashboard-discussion';
import { getDashboardByCode } from '@/constant';
import { QueryAPI } from '@/access';
import { useRequest } from '@gotecq/access';
import { Dashboard } from '@gotecq/model';

export const DashboardUtilsMenu = {
    QUERY: 'QUERY',
    DISCUSSION: 'DISCUSSION',
    WORK_ITEM: 'WORK_ITEM',
};
const DashboardUtilsMenuName = {
    [DashboardUtilsMenu.QUERY]: 'Query',
    [DashboardUtilsMenu.DISCUSSION]: 'Discussion',
    [DashboardUtilsMenu.WORK_ITEM]: 'Work Item',
};

type DashboardUtils = {
    activeMenu: string;
    showUtils: any;
    onChangeActiveMenu: (menuKey: string) => void;
    filterProps: DashboardFilter;
} & Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>;
export const DashboardUtils: React.ComponentType<DashboardUtils> = ({ showUtils, activeMenu = DashboardUtilsMenu.QUERY, onChangeActiveMenu, className, filterProps }) => {
    const localDashboard = React.useMemo(() => {
        return getDashboardByCode(filterProps.dashboardCode, true);
    }, [filterProps.dashboardCode]);
    const [{ data: [apiDashboard] = [] }] = useRequest<Dashboard[]>(filterProps.dashboardCode ? QueryAPI.dashboard.singleByCode(filterProps.dashboardCode) : undefined);

    if (!showUtils || !apiDashboard || !localDashboard || (!!localDashboard.defaultParamKey && !localDashboard.defaultParamValue && !filterProps.defaultDashboardParam)) {
        return null;
    }

    return (
        <div className={mergeClass('dashboard-utils', className)}>
            <div className="dashboard-utils-menu">
                {Object.entries(DashboardUtilsMenuName)
                    .filter(([menuKey, menuName]) => !localDashboard.isSummary || menuKey !== DashboardUtilsMenu.QUERY)
                    .map(([menuKey, menuName]) => (
                        <div
                            key={menuKey}
                            className={mergeClass('dashboard-utils-menu-item', activeMenu === menuKey ? 'activated-menu-item' : '')}
                            onClick={() => onChangeActiveMenu(menuKey)}
                        >{menuName}</div>
                    ))
                }
            </div>

            <div className="dashboard-utils-content">
                {activeMenu === DashboardUtilsMenu.QUERY && !localDashboard.isSummary && (
                    <DashboardFilter
                        {...filterProps}
                    />
                )}
                {activeMenu === DashboardUtilsMenu.DISCUSSION && (
                    <DashboardDiscussion
                        dashboardCode={filterProps.dashboardCode}
                    />
                )}
                {activeMenu === DashboardUtilsMenu.WORK_ITEM && (
                    <DashboardWorkList
                        dashboardCode={filterProps.dashboardCode}
                        apiDashboard={apiDashboard}
                        localDashboard={localDashboard}
                        defaultDashboardParam={filterProps.defaultDashboardParam}
                    />
                )}
            </div>
        </div>
    );
};
