import './index.scss';
import React, { useRef } from 'react';
import { Input, message } from 'antd';
import { CommandAPI, QueryAPI, Requestor } from '@/access';
import { Loading } from '@gotecq/s8-component';
import { Dashboard, DashboardItem, DashboardWorkItemModel, WorkItem, WorkItemReference, WorkRouterModel } from '@gotecq/model';
import { getDashboardRedirectUrl } from '@/utils';
import { actionErrorReporter, useRequest } from '@gotecq/access';
import { AddWorkItemModal } from '@gotecq/component.complex-component';

type DashboardQuickAddWorkItem = {
    apiDashboard: Dashboard;
    defaultDashboardParam: any;
    localDashboard: DashboardItem;
    onCreatedSuccess?: () => void;
};
export const DashboardQuickAddWorkItem: React.ComponentType<DashboardQuickAddWorkItem> = ({ apiDashboard, defaultDashboardParam, localDashboard, onCreatedSuccess = () => { } }) => {
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [newWorkItemName, setNewWorkItemName] = React.useState('');
    const [{ data: [pcpDashboardWorkRouter] = [] }] = useRequest<WorkRouterModel[]>(QueryAPI.workRouter.pcpDashboard());
    const { channel_id } = pcpDashboardWorkRouter || {};
    const channelIdRef = useRef<any>(null);

    const createWorkItem = async () => {
        if (!newWorkItemName) {
            message.warning('Task name can not be empty!');
            return;
        }

        setSubmitting(true);
        const workPayload = {
            dashboard_id: apiDashboard._id,
            name: newWorkItemName.trim(),
        } as DashboardWorkItemModel;
        try {
            const response = await Requestor.request({ method: 'post', url: CommandAPI.work.create(), data: workPayload });
            createReferenceForWorkItem(response.data?._resp?.[0]?.data?._id);
            onCreatedSuccess();
            setNewWorkItemName('');
        } catch (error) {
            // Show error message at screen right bottom 
            actionErrorReporter(error, {});
        } finally {
            setSubmitting(false);
        }
    };

    const createReferenceForWorkItem = async (new_work_item_id: string) => {
        if (!new_work_item_id) {
            console.error('Error: New work item not found! Cannot create reference link.');
            return;
        }

        try {
            await Requestor.request.post(CommandAPI.workItemReference.add(new_work_item_id), {
                data: {
                    kind: 'LINK',
                    url: getDashboardRedirectUrl(localDashboard.code, defaultDashboardParam),
                    title: [localDashboard.name, 'Dashboard'].join(' '),
                } as Partial<WorkItemReference>,
            });
        } catch (error) { }
    };

    return (
        <div className="quick-add-work-item">
            {isSubmitting && <Loading.FullView />}

            <Input
                autoFocus
                size="large"
                onPressEnter={createWorkItem}
                className="input-work-item"
                placeholder="Enter to create a work item"
                value={newWorkItemName}
                onChange={(e) => setNewWorkItemName(e.target.value)}
                disabled={isSubmitting}
            />

            <div className="quick-add-work-item-footer">
                <span className="action" onClick={() => channelIdRef.current?.open()}>Add details</span>

                <AddWorkItemModal ref={channelIdRef}
                    channelId={channel_id}
                    source='pcp-dashboard'
                    showFieldChannel
                    onCreatedSuccess={async (workItemResponse: WorkItem) => {
                        createReferenceForWorkItem(workItemResponse._id);
                        onCreatedSuccess();
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
        </div>
    );
};
