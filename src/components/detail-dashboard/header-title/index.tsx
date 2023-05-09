import './index.scss';
import React, { useState, useRef } from 'react';
import { ComposeHeader } from '@gotecq/s8-component';
import { Dropdown, Menu, Tooltip } from 'antd';
import { SyncOutlined, PlusOutlined, ShareAltOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { ExpandIcon, ExportIcon, NormalscreenIcon, MoreIcon } from '@/assets';
import { Dashboard, DashboardOption, Favorite, WorkItem, WorkItemReference, WorkRouterModel } from '@gotecq/model';
import { getDashboardRedirectUrl } from '@/utils';
import { actionSuccessReporter, useRequest } from '@gotecq/access';
import { DashboardEntity, DashboardWorkItemEntity } from '@/entity';
import { CommandAPI, QueryAPI, Requestor } from '@/access';
import { Tag } from 'antd';
import { AddWorkItemModal } from '@gotecq/component.complex-component';

type DetailDashboardHeader = {
    isFullscreen: boolean;
    apiDashboard: Dashboard;
    defaultDashboardParam: any;
    localDashboardData: DashboardOption;
    hasFilter?: boolean,
    onToggleFullscreen: (aspectKey: string) => void;
    onRefreshDashboard: () => void;
    onClickExportPdf: () => void;
};
export const DetailDashboardHeader: React.ComponentType<DetailDashboardHeader> = ({
    defaultDashboardParam,
    localDashboardData,
    apiDashboard,
    hasFilter,
    isFullscreen,
    onToggleFullscreen,
    onRefreshDashboard,
    onClickExportPdf,
}) => {
    const [isSubmittingFavorited, setSubmittingFavorited] = useState(false);

    const [{ data: [pcpDashboardWorkRouter] = [] }] = useRequest<WorkRouterModel[]>(QueryAPI.workRouter.pcpDashboard());
    const { channel_id } = pcpDashboardWorkRouter || {};
    const channelIdRef = useRef<any>(null);

    const [, apiDashboardEntity] = DashboardEntity.useEntity({ _id: apiDashboard?._id });

    const copyDashboardUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        actionSuccessReporter({
            message: 'Link Copied!',
        });
    };

    const openAddWorkItemModal = () => {
        channelIdRef.current?.open();
    };

    const handleUpdateFavoriteSuccess = () => {
        DashboardEntity.refreshItem({ _id: apiDashboard._id });
    };

    const removeFavoriteFromDashboard = async (dashboard_id: string) => {
        try {
            setSubmittingFavorited(true);
            const favoriteItemList = await Requestor.request.get<Favorite[]>(QueryAPI.dashboard.favorite.single(dashboard_id));

            if (!favoriteItemList?.length) {
                actionSuccessReporter({
                    message: 'Wrong favorite data. Please try again later!',
                    type: 'error',
                });
                setSubmittingFavorited(false);
                return;
            }

            await Requestor.request({
                url: CommandAPI.dashboard.favorite.delete(favoriteItemList[0]._id),
                method: 'POST',
            });
            handleUpdateFavoriteSuccess();
        } catch (error) { } finally {
            setSubmittingFavorited(false);
        }
    };

    const addFavoriteToDashboard = async (dashboard_id: string) => {
        try {
            setSubmittingFavorited(true);
            await Requestor.request({
                url: CommandAPI.dashboard.favorite.create(),
                method: 'POST',
                data: {
                    resource: 'dashboard',
                    resource_id: dashboard_id,
                },
            });
            handleUpdateFavoriteSuccess();
        } catch (error) { } finally {
            setSubmittingFavorited(false);
        }
    };

    return (
        <div className="detail-dashboard-title">
            <ComposeHeader.HeaderTitle title={localDashboardData.name} />

            {apiDashboardEntity && (
                <Tooltip title={apiDashboardEntity.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                    <span
                        onClick={(!isSubmittingFavorited && apiDashboardEntity)
                            ? apiDashboardEntity.is_favorite
                                ? () => removeFavoriteFromDashboard(apiDashboardEntity._id)
                                : () => addFavoriteToDashboard(apiDashboardEntity._id)
                            : undefined
                        }
                    >
                        {apiDashboardEntity.is_favorite
                            ? <StarFilled className="action-btn star-icon" />
                            : <StarOutlined className="action-btn star-icon" />
                        }
                    </span>
                </Tooltip>
            )}

            <Tooltip title="Refresh">
                <span><SyncOutlined className="action-btn" onClick={onRefreshDashboard} /></span>
            </Tooltip>

            {isFullscreen
                ? (
                    <Tooltip title="Normal view">
                        <span><NormalscreenIcon className="action-btn" onClick={
                            () => onToggleFullscreen(localDashboardData.aspect_key)} /></span>
                    </Tooltip>
                )
                : (
                    <Tooltip title="Fullscreen">
                        <span><ExpandIcon className="action-btn" onClick={() => onToggleFullscreen(localDashboardData.aspect_key)} /></span>
                    </Tooltip>
                )
            }

            <Dropdown
                trigger={['click']}
                overlay={(
                    apiDashboard.code === 'summary'
                        || apiDashboard.code === 'high-cost-members'
                        || apiDashboard.code === 'complicated-conditions-member'
                        || apiDashboard.code === 'chronic-renal-failure-members'
                        || apiDashboard.code === 'home-health-and-emergency-room-visits'
                        || apiDashboard.code === 'members-without-office-visit'
                        ? (
                            <Menu className="detail-dashboard__action-menu">
                                <Menu.Item key="create-task" onClick={openAddWorkItemModal}><PlusOutlined /> Create task</Menu.Item>
                                <Menu.Item key="share" onClick={() => copyDashboardUrl()}><ShareAltOutlined /> Copy URL</Menu.Item>
                            </Menu>
                        )
                        : (
                            <Menu className="detail-dashboard__action-menu">
                                <Menu.Item key="create-task" onClick={openAddWorkItemModal}><PlusOutlined /> Create task</Menu.Item>
                                <Menu.Item key="export" onClick={onClickExportPdf}><ExportIcon /> Export (Experiment)</Menu.Item>
                                <Menu.Item key="share" onClick={() => copyDashboardUrl()}><ShareAltOutlined /> Copy URL</Menu.Item>
                            </Menu>
                        )
                )}
            >
                <Tooltip title="More actions">
                    <span><MoreIcon className="action-btn" /></span>
                </Tooltip>
            </Dropdown>

            {hasFilter && <Tag className="filter-tag" color="blue">Filter is applied</Tag>}

            <AddWorkItemModal ref={channelIdRef}
                channelId={channel_id}
                source='pcp-dashboard'
                showFieldChannel
                onCreatedSuccess={async (workItemResponse: WorkItem) => {
                    try {
                        await Requestor.request.post(CommandAPI.workItemReference.add(workItemResponse._id), {
                            data: {
                                kind: 'LINK',
                                url: getDashboardRedirectUrl(localDashboardData.code, defaultDashboardParam),
                                title: [localDashboardData.name, 'Dashboard'].join(' '),
                            } as Partial<WorkItemReference>,
                        });
                    } catch (error) { }

                    try {
                        const newWorkItemList = await Requestor.request.GET(QueryAPI.dashboard.work.all(apiDashboard._id));
                        if (Array.isArray(newWorkItemList)) {
                            DashboardWorkItemEntity.replaceCollection(newWorkItemList);     // replace to make sure the work-list order follow API data
                        }
                    } catch (error) { }
                }}
                commandApi={CommandAPI.work.create()}
                transformSchema={(schema) => {
                    const schemaClone = { ...schema };
                    schemaClone.properties['dashboard_id'] = {
                        type: 'string',
                        widget: 'HiddenField',
                        initialValue: apiDashboard._id,
                    };
                    schemaClone.properties['source'] = {
                        type: 'string',
                        widget: 'HiddenField',
                        initialValue: 'pcp-dashboard',
                    };
                    // Overwrite display value for channel field as PCP Dashboard but dont show the hexadeximal UUID error
                    schemaClone.properties.channel_id.searchProfile = () => {
                        return [{
                            displayvalue: 'PCP Dashboard',
                            value: channel_id,
                            key: channel_id,
                        }];
                    };
                    schemaClone.properties.channel_id.requireProfile = () => {
                        return [{
                            displayvalue: 'PCP Dashboard',
                            value: channel_id,
                            key: channel_id,
                        }];
                    };
                    return schemaClone;
                }}
            />
        </div>
    );
};
