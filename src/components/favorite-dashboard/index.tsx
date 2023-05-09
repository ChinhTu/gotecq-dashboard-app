import './index.scss';
import React, { useEffect } from 'react';
import { ComposeHeader, ComposePanel, NonDataPanel, S8CollapseSection } from '@gotecq/s8-component';
import { useRequest } from '@gotecq/access';
import { QueryAPI } from '@/access';
import { AppModules, getDashboardGroupsByAspectKey } from '@/constant';
import { DownOutlined } from '@ant-design/icons';
import { FavoriteDashboardList } from './list';
import { DashboardEntity } from '@/entity';
import { useSelector } from 'react-redux';
import { Input } from 'antd';
import { Dashboard, DashboardGroup, DashboardItem } from '@gotecq/model';

const DashboardAspectList = [
    AppModules.DASHBOARDS,
    // AppModules.EXPERIENCE,
    // AppModules.COST,
    // AppModules.QUALITY,
];
type FavoriteDashboard = {
    aspectKey: string;
    searchText: string;
    onSearch?: (searchText: string) => void;
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;
};
export const FavoriteDashboard: React.ComponentType<FavoriteDashboard> = ({ aspectKey, searchText = '', onSearch, onClickDashboard = () => { } }) => {
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

    // useEffect(() => {
    //     refetchDashboard();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [searchText]);

    return (
        <ComposePanel className="favorite-dashboard">
            <ComposeHeader type="contrast" className="favorite-dashboard-header">
                <ComposeHeader.HeaderTitle title={`${allApiDashboards.filter(apiDashboard => apiDashboard.is_favorite).length} FAVORITE DASHBOARD${allApiDashboards.filter(apiDashboard => apiDashboard.is_favorite).length === 1 ? '' : 'S'}`} />

                {/* API still bug, offline search FOR NOW */}
                <ComposeHeader.HeaderItem right>
                    <Input.Search
                        allowClear
                        defaultValue={searchText}
                        onSearch={onSearch}
                        placeholder="Search Dashboards"
                    />
                </ComposeHeader.HeaderItem>
            </ComposeHeader>

            <ComposePanel.Body className="favorite-dashboard-body">
                <ComposePanel.Section>
                    <ComposePanel.SectionBody>
                        <S8CollapseSection
                            className="favorite-dashboard-collapse"
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
                                const allFavoriteDashboardsCodes = allApiDashboards
                                    .filter(apiDashboard => apiDashboard.is_favorite)
                                    .map(apiDashboard => apiDashboard.code);
                                // check if no dashboard in aspect appear in favorite dashboard code list
                                const isNoFavoriteAspectDashboard = aspectDashboardCodes
                                    .every(dasboardCode => !allFavoriteDashboardsCodes.includes(dasboardCode));

                                return (
                                    <>
                                        <S8CollapseSection.Panel
                                            key={dashboardAspect}
                                            // header={dashboardAspect.toUpperCase()}
                                            header={'DASHBOARDS'}
                                        >
                                            {isNoFavoriteAspectDashboard
                                                ?
                                                <NonDataPanel />
                                                :
                                                <FavoriteDashboardList
                                                    aspectKey={dashboardAspect}
                                                    allDashboards={allApiDashboards}
                                                    dashboardGroupList={dashboardGroupList}
                                                    onClickDashboard={onClickDashboard}
                                                    onRemoveFavoriteSuccess={({ _id }) => {
                                                        DashboardEntity.refreshItem({ _id: _id });
                                                    }}
                                                />
                                            }
                                        </S8CollapseSection.Panel>
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
