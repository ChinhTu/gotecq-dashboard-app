import './index.scss';
import React, { useState, useMemo, useEffect } from 'react';
import { getDashboardAspectByKey, getDashboardByCode, getDashboardGroupWithoutSummary } from '@/constant';
import { DownOutlined } from '@ant-design/icons';
import { mergeClass } from '@gotecq/utils';
import { DashboardTooltip } from '@/constant/dashboard-meta/dashboard-tooltip';
import { QueryAPI, Requestor } from '@/access';
import { useSelector } from 'react-redux';
import { DashboardEntity } from '@/entity';
import { StarDashboardButton } from '@/components';
import { Collapse } from 'antd';
import { hasAccess } from '@/config';
import { Dashboard, DashboardOption } from '@gotecq/model';

type Props = {
    menuMode: string;
    currentModule: any;
    onSelectItem?: (dashboardOption: DashboardOption) => void;
    filterDashboardList: DashboardOption[];
};
export const DashboardMenu: React.FC<Props> = ({ menuMode, currentModule, onSelectItem, filterDashboardList }) => {
    const fetchAllApiDashboardsRaw = async () => {
        try {
            const response = await Requestor.request.get<Dashboard[]>(QueryAPI.dashboard.all());
            DashboardEntity.updateCollection(Array.isArray(response) ? response : []);
        } catch (error) { }
    };

    useEffect(() => {
        fetchAllApiDashboardsRaw();
    }, []);

    const { dashboard: dashboardCollection = {} } = useSelector<any, { dashboard: Record<string, Dashboard> }>((state: any) => state['@ENTITY']);
    const allApiDashboards = Object.entries(dashboardCollection).map(([dashboardId, apiDashboard]) => apiDashboard);;

    const dashboardAspect = getDashboardAspectByKey(currentModule);
    const [activeKey, setActiveKey] = useState<any>(getDashboardGroupWithoutSummary(dashboardAspect?.items ?? [])
        .map(item => item._id));

    const currentDashboardData = useMemo(() => {
        const current_dashboard_data = getDashboardByCode(menuMode);
        // if (!!current_dashboard_data) {
        //     setActiveKey(current_dashboard_data.group_key);
        // }
        return current_dashboard_data;
    }, [menuMode]);

    const isInFilterDashboardList = (dashboard_name: string) => {
        const dashboardNameList = filterDashboardList.map(item => item.name);
        return dashboardNameList.includes(dashboard_name);

    };

    return (
        <div className="side-nav__dashboard-menu">
            {dashboardAspect && (
                <Collapse
                    // accordion
                    activeKey={activeKey}
                    // defaultActiveKey={activeKey}
                    className="side-nav__dashboard-menu__collapse"
                    expandIcon={({ isActive }) => <DownOutlined rotate={!isActive ? 0 : 180} />}
                    expandIconPosition="right"
                    onChange={(key) => {
                        setActiveKey(key);
                    }}
                >
                    {getDashboardGroupWithoutSummary(dashboardAspect.items)
                        // only display GROUP has dashboard matched api dashboard info
                        .filter(group => group.items.map(localDashboard => localDashboard.code)
                            .some(localDashboardCode => allApiDashboards
                                .map(apiDashboard => apiDashboard.code)
                                .includes(localDashboardCode)))
                        // Check permission for entry from side nav panel menu
                        .filter(entry => {
                            const accessKeyList = entry.items.map(item => item.accessKey);
                            const hasMinimalAccess = accessKeyList.reduce((prev, currentKey) => {
                                return prev || (currentKey == null || hasAccess(currentKey));
                            }, false);

                            return hasMinimalAccess;
                        })
                        .map(group => {
                            const { accessKey } = group.items.find(entry => entry._id === menuMode) ?? {};
                            let filterGroupItems: any = [];
                            //check item is in filterdashboard or not
                            if(filterDashboardList.length > 0) {
                                filterGroupItems = group.items.filter(item => isInFilterDashboardList(item.name));
                            }

                            return filterGroupItems.length > 0 && <Collapse.Panel
                                key={group._id}
                                header={<span className="truncate">{group.name.toUpperCase()}</span>}
                                /** Đề phòng trường hợp user dùng direct URL, như vậy sẽ bypass được phần filter phía trên */
                                className={currentDashboardData?.group_key === group._id
                                    && (accessKey == null || hasAccess(accessKey))
                                    ? 'activated-group'
                                    : ''}
                            >
                                
                                {(filterDashboardList.length > 0 ? filterGroupItems :  group.items)
                                    // only display DASHBOARD matched api dashboard info
                                    .filter(localDashboard => allApiDashboards.map(apiDashboard => apiDashboard.code).includes(localDashboard.code))
                                    // Check permission for entry from side nav panel item
                                    .filter(entry => {
                                        return entry.accessKey == null || hasAccess(entry.accessKey);
                                    })
                                    .map(localDashboard => {
                                        const apiDashboard = allApiDashboards.find(api_dashboard => api_dashboard.code === localDashboard.code);

                                        // actually this never happen, just write this to make proper type check for now
                                        // update logic later & remove it
                                        if (!apiDashboard) {
                                            return null;
                                        }

                                        return (
                                            <DashboardTooltip
                                                key={localDashboard._id}
                                                dashboardCode={localDashboard.code}
                                                tooltipDescription={localDashboard.tooltipDescription}
                                            >
                                                <div
                                                    className={mergeClass(
                                                        'dashboard-item',
                                                        menuMode === localDashboard.code ? 'activated-dashboard' : '',
                                                    )}
                                                >
                                                    <div
                                                        onClick={() => onSelectItem?.({
                                                            ...localDashboard,
                                                            aspect_key: dashboardAspect._id,
                                                            group_key: group._id,
                                                            groupItem: group,
                                                        })}
                                                        className="dashboard-item__name"
                                                    >{localDashboard.name}</div>

                                                    <StarDashboardButton
                                                        apiDashboard={apiDashboard}
                                                        onUpdateSuccess={() => {
                                                            DashboardEntity.refreshItem({ _id: apiDashboard._id });
                                                        }}
                                                        tooltipPlacement="topRight"
                                                    />
                                                </div>
                                            </DashboardTooltip>
                                        );
                                    })}
                            </Collapse.Panel>;
                        })}
                </Collapse>
            )}
        </div>
    );
};
