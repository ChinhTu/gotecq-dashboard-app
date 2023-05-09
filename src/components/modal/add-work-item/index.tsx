import './index.scss';
import React, { useRef } from 'react';
import moment from 'moment';
import { S8Modal, S8Button } from '@gotecq/s8-component';
import { CommandAPI } from '@/access';
import { BaseForm, AutoField, AsyncSelectField, SelectWithGuidanceField, MultipleSelectWithGuidanceField, ErrorsField, LongTextField, HiddenField, SubmitField, RadioGroupField } from '@gotecq/form';
import { WorkItemImportance, WorkItemStatus } from '@/utils';
import { ComposeHeader } from '@gotecq/s8-component';
import { actionSuccessReporter } from '@gotecq/access';
import { searchAvailableAssignee, TagsFetcher } from '@/helper';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col } from 'antd';
import { WorkItem } from '@gotecq/model';

export type AddWorkItemModal = {
    visible: boolean;
    dashboardId: string;
    onCloseModal?: () => void;
    onCreatedSuccess?: (dataResponse: WorkItem) => void;
}
export const AddWorkItemModal: React.ComponentType<AddWorkItemModal> = ({
    visible, dashboardId,
    onCreatedSuccess = () => { }, onCloseModal = () => { },
}) => {
    const formRef = useRef<any>(null);

    return (
        <S8Modal
            className="modal-add-work-item"
            title="Add New Work Item"
            visible={visible}
            onCancel={onCloseModal}
            width={600}
            destroyOnClose
            nopadding
        >
            <BaseForm
                key={uuidv4()}
                formRef={formRef}
                className="form-add-work-item"
                handleSubmitFail={() => { }}
                handleSubmitSuccess={({ data: dataRes }) => {
                    const workDataRes = dataRes?._resp[0]?.data;
                    formRef?.current?.reset();
                    onCloseModal();
                    actionSuccessReporter({
                        action: 'create',
                        target: 'Work item',
                    });
                    onCreatedSuccess(workDataRes);
                }}
                command={CommandAPI.work.create()}
                schema={{
                    type: 'object',
                    title: 'Create work item',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            className: 'no-spacing-top',
                        },
                        description: { type: 'string' },
                        dashboard_id: { type: 'string' },
                        tags: {
                            title: 'Tags',
                        },
                        due_date: {
                            format: 'date-time',
                        },
                        assign_to: {
                            title: 'Assign Owner',
                        },
                        participants: {
                            title: 'Add Participants',
                        },
                        status: {
                            title: 'Status',
                            options: [
                                {
                                    label: 'New',
                                    value: WorkItemStatus.NEW,
                                },
                                {
                                    label: 'In Progress',
                                    value: WorkItemStatus.INPROGRESS,
                                },
                                {
                                    label: 'Done',
                                    value: WorkItemStatus.DONE,
                                },
                            ],
                        },
                        importance: {
                            title: 'Importance',
                            options: [
                                {
                                    label: 'Critical',
                                    value: WorkItemImportance.CRITICAL,
                                },
                                {
                                    label: 'High',
                                    value: WorkItemImportance.HIGH,
                                },
                                {
                                    label: 'Normal',
                                    value: WorkItemImportance.NORMAL,
                                },
                                {
                                    label: 'Low',
                                    value: WorkItemImportance.LOW,
                                },
                            ],
                        },
                    },
                }}
                modelTransform={(mode: string, model: any) => {
                    if (mode === 'submit') {
                        const { due_date } = model;
                        if (due_date) {
                            const _date_converted = moment(due_date).endOf('day');
                            return { ...model, due_date: _date_converted };
                        }
                    }
                    return model;
                }}
            >
                <HiddenField name="dashboard_id" value={dashboardId} />

                <Row gutter={[10, 0]}>
                    <Col span={24}>
                        <AutoField name="name" autoFocus />
                    </Col>

                    <Col span={24}>
                        <LongTextField name="description" />
                    </Col>

                    <Col span={24}>
                        <AutoField
                            name='due_date'
                            disabledDate={(currentDate) => currentDate && currentDate < moment().startOf('day')}
                        />
                    </Col>

                    <Col span={24}>
                        <AsyncSelectField
                            mode="multiple"
                            name="tags"
                            fetcher={TagsFetcher}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <RadioGroupField
                            name="status"
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <RadioGroupField
                            name="importance"
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Col>

                    <Col span={24}>
                        <SelectWithGuidanceField
                            name="assign_to"
                            searchProfile={searchAvailableAssignee}
                            optionLabelProp="label_compact"
                            className="assign-owner-select"
                            placeholder="Select or search owner..."
                            maxRecommend={10}
                            showArrow
                            showSearch
                        />
                    </Col>

                    <Col span={24}>
                        <MultipleSelectWithGuidanceField
                            searchProfile={searchAvailableAssignee}
                            optionLabelProp="label_compact"
                            // className="participants-select"
                            name="participants"
                            placeholder="Select or search participant..."
                            maxRecommend={10}
                            showArrow
                            showSearch
                        />
                    </Col>
                </Row>
                <ErrorsField />

                <ComposeHeader type='tertiary' className="footer">
                    <S8Button onClick={onCloseModal}>Cancel</S8Button>
                    <ComposeHeader.HeaderItem right>
                        <SubmitField />
                    </ComposeHeader.HeaderItem>
                </ComposeHeader>
            </BaseForm>
        </S8Modal>
    );
};
