import './index.scss';
import React, { useState, useMemo } from 'react';
import { ActionButton, ComposeHeader, ComposePanel, Loading, NonDataPanel, ReloadOutlined } from '@gotecq/s8-component';
import { UserInfo, useRequest, useUserInfo } from '@gotecq/access';
import { QueryAPI, Requestor } from '@/access';
import { Input } from 'antd';
import { SyncIcon } from '@/assets';
import { mergeClass } from '@gotecq/utils';
import { getDashboardByCode } from '@/constant';
import { DashboardBucket } from './dashboard-bucket';
import Masonry from 'react-masonry-css';
import { Empty } from 'antd';
import styled from 'styled-components';
import { Dashboard, DashboardGroup, DashboardItem, DashboardOption, DashboardWorkItemModel, WorkRouterModel } from '@gotecq/model';

const IsParticipantContainer = styled.div`
    .main-description {
        font-size: var(--fs-2xl);
        color: var(--color-subtle);
        font-family: var(--ff-base);
        padding-bottom: var(--spacing-sm);
    }
    .sub-description {
        font-size: var(--fs-sm);
        color: var(--color-subtle);
        font-family: var(--ff-base);
    }
`;

type WorkItemOverview = {
    searchText: string;
    filterValue: any;
    currentFilterId: any;
    onSearch?: (searchText: string) => void;
    onClickDashboard?: (aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem) => void;
};
export const WorkItemOverview: React.ComponentType<WorkItemOverview> = ({
    searchText = '', filterValue, currentFilterId,
    onSearch, onClickDashboard = () => { },
}) => {
    const [allWorkItemList, setAllWorkItemList] = useState<DashboardWorkItemModel[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [{ data: allApiDashboards = [] }] = useRequest<Dashboard[]>(QueryAPI.dashboard.all());

    const [{ data: [pcpDashboardWorkRouter] = [], isLoading: isLoadingChannelId }] = useRequest<WorkRouterModel[]>(QueryAPI.workRouter.pcpDashboard());
    const { channel_id } = pcpDashboardWorkRouter || {};
    const userInfo: UserInfo = useUserInfo();
    const [{ data, isLoading: isLoadingUserInfo, queryCount }] = useRequest<any[]>(channel_id && userInfo._id ? QueryAPI.dashboard.work.member.all(channel_id, [userInfo._id]) : undefined);

    const allAvailableDashboard = useMemo(() => {
        return allApiDashboards.reduce<Array<{ localDashboardData: DashboardOption, apiDashboardData: Dashboard }>>((accumulator, currentApiDashboard) => {
            const localDashboard = getDashboardByCode(currentApiDashboard.code ?? '', true);
            if (localDashboard) {
                return [
                    ...accumulator,
                    {
                        localDashboardData: localDashboard,
                        apiDashboardData: currentApiDashboard,
                    },
                ];
            }
            return [
                ...accumulator,
            ];
        }, []);
    }, [allApiDashboards]);

    const fetchAllWorkItems = async (all_available_dashboard: Dashboard[], search_text: string, filter_value: any) => {
        try {
            setLoading(true);
            const allResponse = await Promise.allSettled(all_available_dashboard.map(api_dashboard => {
                return Requestor.request.get<DashboardWorkItemModel[]>(QueryAPI.dashboard.work.allWithFilter(api_dashboard._id, { txt: search_text, filter: filter_value }));
            }));
            const all_work_items = allResponse.reduce<DashboardWorkItemModel[]>((accumulator, response) => {
                if (response.status === 'fulfilled') {
                    return [
                        ...accumulator,
                        ...response.value,
                    ];
                }
                return [
                    ...accumulator,
                ];
            }, []);
            setAllWorkItemList(all_work_items);
        } catch (error) { } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (allAvailableDashboard.length > 0) {
            fetchAllWorkItems(allAvailableDashboard.map(item => item.apiDashboardData), searchText, filterValue);
        }
    }, [allAvailableDashboard, searchText, filterValue]);

    const refreshPage = () => {
        fetchAllWorkItems(allAvailableDashboard.map(item => item.apiDashboardData), searchText, filterValue);
    };

    return (
        <ComposePanel className="dashboard-work-item-overview">
            <ComposeHeader type="contrast" className="overview-header">
                <ComposeHeader.HeaderTitle
                    title={(
                        <>
                            {`${allWorkItemList.length} WORK ITEM${allWorkItemList.length !== 1 ? 'S' : ''}`}
                            <ActionButton
                                onClick={() => refreshPage()}
                                icon={<SyncIcon />}
                                tooltip='Refresh'
                                className={mergeClass('sync-data-btn', isLoading ? 'spin-icon' : '')}
                            />
                        </>
                    )}
                />

                <ComposeHeader.HeaderItem right>
                    <Input.Search
                        allowClear
                        defaultValue={searchText}
                        onSearch={onSearch}
                        className="overview-search"
                        placeholder="Search Work Items"
                    />
                </ComposeHeader.HeaderItem>
            </ComposeHeader>

            <ComposePanel.Body className="overview-body">
                <ComposePanel.Section>
                    <ComposePanel.SectionBody>
                        {isLoading && <Loading.FullView />}
                        {/* {allWorkItemList.length === 0 && (
                            <div className="overview-no-data-wrapper"><NonDataPanel /></div>
                        )} */}

                        {data
                            ? (
                                <Masonry
                                    breakpointCols={{
                                        default: 3,
                                        1600: 2,
                                        1200: 1,
                                    }}
                                    className="bucket-grid"
                                    columnClassName="bucket-grid__column"
                                >
                                    {allAvailableDashboard
                                        // only display dashboard has work-item
                                        .filter(dashboard => allWorkItemList.map(item => item.dashboard_id).includes(dashboard.apiDashboardData._id))
                                        .map(availableDashboard => {
                                            return (
                                                <DashboardBucket
                                                    key={availableDashboard.localDashboardData.code}
                                                    apiDashboard={availableDashboard.apiDashboardData}
                                                    localDashboard={availableDashboard.localDashboardData}
                                                    workItemList={allWorkItemList.filter(item => item.dashboard_id === availableDashboard.apiDashboardData._id)}
                                                    onUpdateSuccess={() => refreshPage()}
                                                    onClickDashboardTitle={() => onClickDashboard(availableDashboard.localDashboardData.aspect_key, availableDashboard.localDashboardData.groupItem, availableDashboard.localDashboardData)}
                                                />
                                            );
                                        })
                                    }
                                </Masonry>
                            )
                            : !isLoadingChannelId && !isLoadingUserInfo && queryCount > 0
                                ? (<IsParticipantContainer>
                                    <Empty
                                        description={<>
                                            <div className='description-wrapper'>
                                                <div className='main-description'>
                                                    You aren't participant of the work channel PCP dashboard.
                                                </div>
                                                <div className='sub-description'>
                                                    Contact admin to be added to this channel.
                                                </div>
                                            </div>
                                        </>}
                                        image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </IsParticipantContainer>)
                                : (<Loading.FullView />)
                        }
                    </ComposePanel.SectionBody>
                </ComposePanel.Section>
            </ComposePanel.Body>
        </ComposePanel>
    );
};
