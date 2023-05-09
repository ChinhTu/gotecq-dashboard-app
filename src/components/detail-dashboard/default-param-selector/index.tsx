import React from 'react';
import { QualityMeasureDatasetSelectorTrigger } from './quality-measure';
import { DefaultParamSelectorTriggerProps } from './constant';
import { DashboardCode } from '@/constant';
import { DashboardItem } from '@gotecq/model';
import { QualityDatasetBoard } from '@gotecq/component.complex-component';

const dashboardDefaultParamSelectorMapping = {
    [DashboardCode.QUALITY_MEASURE]: QualityDatasetBoard,
    [DashboardCode.MAH_DASHBOARD]: QualityDatasetBoard,
    [DashboardCode.ACTIVITY_SUMMARY]: QualityDatasetBoard,
    [DashboardCode.STAR_DASHBOARD]: QualityDatasetBoard,

};
type DashboardDefaultParamSelector = {
    dashboardData: DashboardItem;
    onChangeDefaultParam?: (newDefaultParamValue: any) => void;
};
export const DashboardDefaultParamSelector: React.ComponentType<DashboardDefaultParamSelector> = ({ dashboardData, onChangeDefaultParam = () => { } }) => {
    const Comp = React.useMemo(() => {
        return dashboardDefaultParamSelectorMapping?.[dashboardData.code];
    }, [dashboardData]);

    return (
        <Comp onItemSelected={onChangeDefaultParam} />
    );
};

const dashboardDefaultParamSelectorTriggerMapping = {
    [DashboardCode.QUALITY_MEASURE]: QualityMeasureDatasetSelectorTrigger,
    [DashboardCode.MAH_DASHBOARD]: QualityMeasureDatasetSelectorTrigger,
    [DashboardCode.ACTIVITY_SUMMARY]: QualityMeasureDatasetSelectorTrigger,
    [DashboardCode.STAR_DASHBOARD]: QualityMeasureDatasetSelectorTrigger,
};
export const DefaultParamSelectorTrigger: React.FC<DefaultParamSelectorTriggerProps> = ({ dashboardData, onChange, defaultDashboardParam }) => {
    const Comp = React.useMemo(() => {
        return dashboardDefaultParamSelectorTriggerMapping?.[dashboardData.code];
    }, [dashboardData]);

    if (!Comp) {
        return null;
    }

    return (
        <Comp
            dashboardData={dashboardData}
            defaultDashboardParam={defaultDashboardParam ?? dashboardData.defaultParamValue}
            onChange={onChange}
        />
    );
};
