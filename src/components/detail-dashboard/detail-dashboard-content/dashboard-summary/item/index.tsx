import './index.scss';
import React from 'react';
import { Image, Card } from 'antd';
import { DashboardThumbnailMapping } from '@/constant/dashboard-meta/dashboard-tooltip/dashboard-thumbnail';
import { FALLBACK_IMAGE } from '@/constant';
import { StarDashboardButton } from '@/components/star-dashboard-button';
import { Dashboard, DashboardItem } from '@gotecq/model';

type DashboardSummaryCard = {
    localDashboard: DashboardItem;
    apiDashboard: Dashboard;
    onClick?: () => void;
    onRemoveFavoriteSuccess?: () => void;
};
export const DashboardSummaryCard: React.ComponentType<DashboardSummaryCard> = ({
    apiDashboard, localDashboard,
    onClick, onRemoveFavoriteSuccess = () => { },
}) => {
    return (
        <Card
            hoverable
            onClick={onClick}
            cover={(
                <div className="cover-content-wrapper">
                    <Image
                        width="100%"
                        height="100%"
                        preview={false}
                        src={DashboardThumbnailMapping[localDashboard.code]}
                        fallback={FALLBACK_IMAGE}
                    />
                </div>
            )}
            className="favorite-dashboard-card"
        >
            <Card.Meta
                title={(
                    <div className='text-truncate-custom'>
                        <div className="truncate">{localDashboard.name}</div>
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <StarDashboardButton
                                apiDashboard={apiDashboard}
                                onUpdateSuccess={() => {
                                    onRemoveFavoriteSuccess();
                                }}
                            />
                        </span>
                    </div>
                )}
                description={localDashboard.tooltipDescription}
            />
        </Card>
    );
};
