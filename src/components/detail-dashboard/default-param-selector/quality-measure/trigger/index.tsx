import './index.scss';
import React, { useState } from 'react';
import { useRequest } from '@gotecq/access';
import { DatasetSelectBox, S8Modal } from '@gotecq/s8-component';
import { QLMDataset } from '@gotecq/model';
import { DefaultParamSelectorTriggerProps } from '../../constant';
import { QLMQueryAPI, QualityDatasetBoard } from '@gotecq/component.complex-component';

export const QualityMeasureDatasetSelectorTrigger: React.FC<DefaultParamSelectorTriggerProps> = ({ defaultDashboardParam, onChange = () => { }, dashboardData }) => {
    const [{ isLoading, data: listDataset }] = useRequest<QLMDataset[]>(QLMQueryAPI.QLMdataset.all());
    const [dataset, setDataset] = useState<QLMDataset>();
    const [modalVisible, setModalVisible] = useState(false);
    console.log("🚀 ~ file: index.tsx:13 ~ modalVisible:", modalVisible);

    const _handleSelectDataset = (datasetId: string) => {
        setDataset(listDataset?.find(item => item._id === datasetId));
        setModalVisible(false);
        onChange(datasetId);
    };

    React.useEffect(() => {
        setDataset(listDataset?.find(item => item._id === defaultDashboardParam));
    }, [defaultDashboardParam, listDataset]);

    return (
        <>
            <DatasetSelectBox
                loading={isLoading}
                datasetTitle={dataset?.title ?? 'No Dataset Selected'}
                onClick={() => setModalVisible(true)}
            />

            <S8Modal
                visible={modalVisible}
                className="select-dataset-modal"
                onCancel={() => setModalVisible(false)}
                closeIcon={null}
                nopadding
                width="90%"
            >
                <QualityDatasetBoard onItemSelected={_handleSelectDataset} />
            </S8Modal>
        </>
    );
};
