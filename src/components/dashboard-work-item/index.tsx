import './index.scss';
import React, { useState, useMemo } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { Loading } from '@gotecq/s8-component';
import { errorReporter } from '@gotecq/access';
import { CommandAPI, Requestor } from '@/access';
import { WorkItem } from '@gotecq/model';
import { dayCount, getWorkItemStatusName, WorkItemStatus } from '@/utils';
import { EntityUserCompact } from '@gotecq/component.entity';
import { WorkItemDetailPopup } from '@gotecq/component.complex-component';
import { UserCheckIcon } from '@/assets';
import { mergeClass } from '@gotecq/utils';

type DashboardWorkItem = {
    workItemData: WorkItem;
    wrapperClassName?: string;
    onUpdateSuccess?: () => void;
};
export const DashboardWorkItem: React.ComponentType<DashboardWorkItem> = ({ workItemData, wrapperClassName, onUpdateSuccess = () => { } }) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isWorkPopupVisible, setWorkPopupVisible] = useState(false);
    const { _id: workItemId, status, name, owner_id, due_date, channel_id } = workItemData;
    const day_count = useMemo(() => dayCount(due_date), [due_date]);;

    const handleClickWorkItem = () => {
        setWorkPopupVisible(true);
    };

    const handleCloseWorkPopup = () => {
        setWorkPopupVisible(false);
        onUpdateSuccess();
    };

    return (
        <div className={mergeClass('bucket-work-item-wrap', wrapperClassName)}>
            <div className="work-item">
                {isSubmitting && <Loading.FullView />}
                <div className='work-item__head'>
                    <Checkbox
                        className="work-item-checkbox"
                        defaultChecked={status === WorkItemStatus.DONE}
                        checked={status === WorkItemStatus.DONE}
                        onChange={async ({ target: { checked } }) => {
                            const statusUpdate = checked ? WorkItemStatus.DONE : WorkItemStatus.NEW;
                            setSubmitting(true);
                            try {
                                await Requestor.request.post(CommandAPI.work.update(workItemId), { data: { status: statusUpdate } });
                                onUpdateSuccess();
                            } catch (error) {
                                errorReporter(error);
                            } finally { setSubmitting(false); }
                        }}
                    />
                </div>
                <div className='work-item__body' onClick={handleClickWorkItem}>
                    <div className="body__top">
                        <div className={`title ${status === WorkItemStatus.DONE && 'title-line'}`}>
                            <Tooltip title={name}>
                                <span className="truncate">{name}</span>
                            </Tooltip>
                        </div>
                        <div className={`work-bucket__status ${status}`}>
                            {getWorkItemStatusName(status)}
                        </div>
                    </div>
                    <div className="body__bottom">
                        <div className="owner">
                            <EntityUserCompact showIcon id={owner_id} avatar={() => <UserCheckIcon />} />
                        </div>
                        {/* <div className="due-date">
                            <WorkItemDueDateStatus dayCount={day_count} />
                        </div> */}
                    </div>
                </div>

                <WorkItemDetailPopup
                    channelId={channel_id}
                    workItemId={workItemId}
                    visible={isWorkPopupVisible}
                    onClose={handleCloseWorkPopup}
                />
            </div>
        </div>
    );
};
