import lodashClone from 'lodash.clonedeep';
import { AppModules } from '../module';
import { AvailableExtraVariableMapKeys } from '@/utils';
import { hasAccess } from '@/config';
import { DashboardMeta } from '@gotecq/component.complex-component';
import { DashboardAspect, DashboardGroup, DashboardOption } from '@gotecq/model';

type GetAllDashboardParams = { dashboard_meta?: DashboardAspect[], isGetSummary?: boolean };
function getAllDashboard({ dashboard_meta = DashboardMeta, isGetSummary }: GetAllDashboardParams) {
    return dashboard_meta.reduce<DashboardOption[]>((prevDashboardList, currentAspect) => {
        return [
            ...prevDashboardList,
            ...(isGetSummary ? currentAspect.items : getDashboardGroupWithoutSummary((currentAspect.items))).reduce<DashboardOption[]>((prevGroupDashboardList, currentGroup) => {
                return [
                    ...prevGroupDashboardList,
                    ...currentGroup.items.map(item => ({
                        ...item,
                        aspect_key: currentAspect._id,
                        group_key: currentGroup._id,
                        groupItem: currentGroup,
                    })),
                ];
            }, []),
        ];
    }, []);
}
export function getDashboardByCode(dashboardCode: string, isGetSummary?: boolean) {
    return getAllDashboard({ isGetSummary }).find(dashboard => dashboard.code === dashboardCode);
}

export function getSummaryDashboard(aspectKey: string) {
    return getDashboardGroupsByAspectKey(aspectKey, true).find(group => group.isSummary)?.items?.[0];
}

function reOrderDashboardMeta(current_module: AppModules) {
    const index = DashboardMeta.findIndex(aspect => aspect._id === current_module);
    if (index >= 0) {
        return [
            DashboardMeta[index],
            ...DashboardMeta.slice(0, index),
            ...DashboardMeta.slice(index + 1, DashboardMeta.length),
        ];
    }

    return [...DashboardMeta];
};
export function searchDashboard(search_text: string, current_module: any) {
    // re-order dashboard meta
    // priority to current selected module
    const result: DashboardOption[] = [];

    const reOrderedDashboardMeta = !DashboardMeta.map(aspect => aspect._id).includes(current_module)
        ? [...DashboardMeta]
        : reOrderDashboardMeta(current_module);

    reOrderedDashboardMeta.forEach(aspect => {
        aspect.items.forEach(group => {
            group.items.forEach(dashboard => {
                const { name, accessKey } = dashboard;
                if (name.toLowerCase().includes(search_text.toLowerCase())
                && (accessKey == null || hasAccess(accessKey))) {
                    result.push({
                        ...lodashClone(dashboard),
                        aspect_key: aspect._id,
                        group_key: group._id,
                        groupItem: group,
                    });
                }
            });
        });
    });

    return result;
};

export function getDashboardAspectByKey(aspectKey: string) {
    return DashboardMeta.find(aspect => aspect._id === aspectKey);
}

export function getDashboardListByAspect(aspectKey: string, isGetSummary?: boolean) {
    const dashboardAspect = getDashboardAspectByKey(aspectKey);
    return getAllDashboard({
        dashboard_meta: !dashboardAspect ? [] : [dashboardAspect],
        isGetSummary,
    });
}

export function getFilterExtraVariableMap(requiredExtraVariableMap: AvailableExtraVariableMapKeys[] = [], valuesForExtraVariableMap: Record<AvailableExtraVariableMapKeys, string>) {
    const result: Record<string, () => string> = {};

    // only get requiredExtraVariableMap field from valuesForExtraVariableMap
    requiredExtraVariableMap.forEach(variable_key => {
        if (!!valuesForExtraVariableMap?.[variable_key]) {
            result[variable_key] = () => valuesForExtraVariableMap[variable_key];
        }
    });

    return result;
}

export function getDashboardGroupsByAspectKey(aspectKey: string, withSummary?: boolean) {
    return DashboardMeta.find(aspect => aspect._id === aspectKey)?.items.filter(group => withSummary || !group.isSummary) ?? [];
}

export function getDashboardGroupWithoutSummary(dashboardGroups: DashboardGroup[]) {
    return dashboardGroups.filter(group => !group.isSummary);
}
