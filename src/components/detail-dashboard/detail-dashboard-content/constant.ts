import { DashboardGroup, DashboardItem } from '@gotecq/model';

export type DetailDashboardContentProps = {
    dashboardData: DashboardItem;
    filter: any;
    defaultDashboardParam: any;
    subPanel?: string;
    viewLevel?: 'org' | 'network',
    order?: any;
    aspectKey: string;
    searchText: string;
    onSearch?: (searchText: string) => void;
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;

    // props for dashboard component
    dashboardState: any;
    dashboardDrilldownState: any;
    onDashboardStateChange: (newDashboardState: any) => void;
    onDashboardDrilldownStateChange: (newDashboardDrilldownState: any) => void;
};