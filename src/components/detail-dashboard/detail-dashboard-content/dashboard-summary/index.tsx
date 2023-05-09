import React, { useEffect } from 'react';
import { AppModules, getDashboardGroupsByAspectKey } from '@/constant';
import { ComposeHeader, ComposePanel, NonDataPanel, S8CollapseSection } from '@gotecq/s8-component';
import { DashboardEntity } from '@/entity';
import { DashboardSummaryList } from './list';
import { DownOutlined } from '@ant-design/icons';
import { QueryAPI } from '@/access';
import { useRequest } from '@gotecq/access';
import { useSelector } from 'react-redux';
import { Dashboard, DashboardGroup, DashboardItem } from '@gotecq/model';
import './index.scss';

const DashboardAspectList = [
    AppModules.DASHBOARDS,
    // AppModules.EXPERIENCE,
    // AppModules.COST,
    // AppModules.QUALITY,
];

type DashboardSummary = {
    aspectKey: string;
    searchText: string;
    onSearch?: (searchText: string) => void;
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;
};

const DashboardSummary = ({ searchText, aspectKey, onSearch, onClickDashboard }) => {

    const [
        { data: allApiDashboardsRaw },
        // refetchDashboard
    ] = useRequest<Dashboard[]>(QueryAPI.dashboard.all());
    useEffect(() => {
        DashboardEntity.updateCollection(allApiDashboardsRaw ?? []);
    }, [allApiDashboardsRaw]);

    const { dashboard: dashboardCollection = {} } = useSelector<any, { dashboard: Record<string, Dashboard> }>((state: any) => state['@ENTITY']);
    const allApiDashboards = React.useMemo(() => {
        return Object.entries(dashboardCollection)
            .map(([dashboardId, apiDashboard]) => apiDashboard)
            .filter((api_dashboard) => api_dashboard.name?.toLowerCase()?.includes(searchText.trim().toLocaleLowerCase()));    // offline search
    }, [dashboardCollection, searchText]);
    return (
        <ComposePanel className="dashboard-summary">
            <ComposePanel.Body className="dashboard-summary-body">
                <ComposePanel.Section>
                    <ComposePanel.SectionBody>
                        <S8CollapseSection
                            className="dashboard-summary-collapse"
                            defaultActiveKey={aspectKey || DashboardAspectList[0]}
                            expandIcon={({ isActive }) => <DownOutlined rotate={!isActive ? 0 : 180} />}
                        >
                            {DashboardAspectList.map(dashboardAspect => {
                                const dashboardGroupList = getDashboardGroupsByAspectKey(dashboardAspect, true);

                                const aspectDashboardCodes = dashboardGroupList.reduce<DashboardItem[]>((acummulator, currentDashboardGroup) => {
                                    return [
                                        ...acummulator,
                                        ...currentDashboardGroup.items,
                                    ];
                                }, []).map(dashboard => dashboard.code);
                                const allDashboardsCodes = allApiDashboards
                                    .map(apiDashboard => apiDashboard.code);
                                // check if no dashboard in aspect appear in favorite dashboard code list
                                const isNoAspectDashboard = aspectDashboardCodes
                                    .every(dasboardCode => !allDashboardsCodes.includes(dasboardCode));

                                return (
                                    <>
                                        {isNoAspectDashboard
                                            ?
                                            <NonDataPanel />
                                            :
                                            <ComposePanel className="dashboard-summary">
                                                <ComposeHeader type="contrast" className="dashboard-summary-header">
                                                    <ComposeHeader.HeaderTitle title={`${allApiDashboards.length} DASHBOARD${allApiDashboards.length === 1 ? '' : 'S'}`} />
                                                </ComposeHeader>
                                                <DashboardSummaryList
                                                    aspectKey={dashboardAspect}
                                                    allDashboards={allApiDashboards}
                                                    dashboardGroupList={dashboardGroupList}
                                                    onClickDashboard={onClickDashboard}
                                                    onRemoveFavoriteSuccess={({ _id }) => {
                                                        DashboardEntity.refreshItem({ _id: _id });
                                                    }}
                                                />
                                            </ComposePanel>
                                        }
                                    </>
                                );
                            })}
                        </S8CollapseSection>
                    </ComposePanel.SectionBody>
                </ComposePanel.Section>
            </ComposePanel.Body>
        </ComposePanel>
    );
};

export default DashboardSummary;