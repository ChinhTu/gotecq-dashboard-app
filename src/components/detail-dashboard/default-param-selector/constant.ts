import { DashboardOption } from '@gotecq/model';

export type DefaultParamSelectorTriggerProps = {
    dashboardData: DashboardOption;
    onChange?: (defaultParamValue: any) => void;
    defaultDashboardParam: any;
};