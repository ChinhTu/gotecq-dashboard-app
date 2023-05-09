import './index.scss';
import React, { useEffect } from 'react';
import { ComposeHeader, ComposePanel, NonDataPanel } from '@gotecq/s8-component';
import { useRequest } from '@gotecq/access';
import { QueryAPI } from '@/access';
import { Space, Row, Col } from 'antd';
import { AppModules, getDashboardGroupsByAspectKey } from '@/constant';
import { DashboardEntity } from '@/entity';
import { useSelector } from 'react-redux';
import { StarDashboardButton } from '../star-dashboard-button';
import { Input } from 'antd';
import { Dashboard, DashboardGroup, DashboardItem } from '@gotecq/model';

const DashboardAspectList = [AppModules.DASHBOARDS, AppModules.EXPERIENCE, AppModules.COST, AppModules.QUALITY];
type DashboardHelp = {
    searchText: string;
    onSearch?: (searchText: string) => void;
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;
};
export const DashboardHelp: React.ComponentType<DashboardHelp> = ({ searchText = '', onSearch, onClickDashboard = () => { } }) => {
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
        <ComposePanel className="dashboard-help">
            <ComposeHeader type="contrast" className="dashboard-help-header">
                <ComposeHeader.HeaderTitle title="HELP & SUPPORT" />

                {/* API still bug, offline search FOR NOW */}
                <ComposeHeader.HeaderItem right>
                    <Input.Search
                        className="dashboard-help-search"
                        defaultValue={searchText}
                        onSearch={onSearch}
                        placeholder="Search Dashboard Documents"
                    />
                </ComposeHeader.HeaderItem>
            </ComposeHeader>

            <ComposePanel.Body className="dashboard-help-body">
                <ComposePanel.Section>
                    <ComposePanel.SectionBody>
                        <div className="aspect-list">
                            {DashboardAspectList.map(dashboardAspect => {
                                const dashboardGroupList = getDashboardGroupsByAspectKey(dashboardAspect);

                                const hadDashboardGroupList = dashboardGroupList
                                    .map(group => ({
                                        ...group,
                                        items: group.items.reduce<{ localDashboard: DashboardItem, apiDashboard: Dashboard }[]>((accumulator, local_dashboard) => {
                                            const apiDashboard = allApiDashboards.find(api_dashboard => api_dashboard.code === local_dashboard.code);

                                            // attach api_dashboard so we can track is_favorite status
                                            if (apiDashboard) {
                                                return [
                                                    ...accumulator,
                                                    {
                                                        localDashboard: local_dashboard,
                                                        apiDashboard: apiDashboard,
                                                    },
                                                ];
                                            }

                                            return accumulator;
                                        }, []),
                                    }))
                                    .filter(group => group.items.length > 0);

                                return (
                                    <div key={dashboardAspect} className="aspect-wrapper">
                                        <div className="aspect-name">{dashboardAspect.toUpperCase()}</div>

                                        {hadDashboardGroupList.length === 0
                                            ? <NonDataPanel />
                                            : (
                                                <div className="aspect-content">
                                                    <div className="aspect-group-list">
                                                        {hadDashboardGroupList.map(group => {
                                                            return (
                                                                <div key={group._id} className="aspect-group-item">
                                                                    <div className="group-name">{group.name}</div>
                                                                    <Row
                                                                        className="group-dashboard-list"
                                                                        gutter={[40, 8]}
                                                                    >
                                                                        {group.items.map(dashboardData => (
                                                                            <Col
                                                                                key={dashboardData.localDashboard.code}
                                                                                className="group-dashboard-item"
                                                                                span={24}
                                                                                lg={12}
                                                                                xl={8}
                                                                                xxl={6}
                                                                            >
                                                                                <Space className="content-wrapper">
                                                                                    <span>{dashboardData.localDashboard.name}</span>
                                                                                    <StarDashboardButton
                                                                                        apiDashboard={dashboardData.apiDashboard}
                                                                                        onUpdateSuccess={() => {
                                                                                            DashboardEntity.refreshItem({ _id: dashboardData.apiDashboard._id });
                                                                                        }}
                                                                                    />
                                                                                </Space>
                                                                            </Col>
                                                                        ))}
                                                                    </Row>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </ComposePanel.SectionBody>
                </ComposePanel.Section>
            </ComposePanel.Body>
        </ComposePanel>
    );
};
