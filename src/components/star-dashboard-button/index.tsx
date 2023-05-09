import './index.scss';
import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { actionSuccessReporter } from '@gotecq/access';
import { CommandAPI, QueryAPI, Requestor } from '@/access';
import { mergeClass } from '@gotecq/utils';
import { ActionStar } from '@gotecq/s8-component';
import { Dashboard, Favorite } from '@gotecq/model';

type StarDashboardButton = {
    apiDashboard: Dashboard;
    tooltipPlacement?: React.ComponentProps<typeof Tooltip>['placement'];
    onUpdateSuccess?: () => void;
    customRender?: (isStarred: boolean) => React.ReactNode;
} & Pick<React.HTMLAttributes<HTMLSpanElement>, 'className'>;
export const StarDashboardButton: React.ComponentType<StarDashboardButton> = ({ className, apiDashboard, tooltipPlacement, onUpdateSuccess = () => { }, customRender }) => {
    const [isSubmittingStar, setSubmittingStar] = useState(false);

    const removeFavoriteFromDashboard = async (dashboard_id: string) => {
        try {
            setSubmittingStar(true);
            const favoriteItemList = await Requestor.request.get<Favorite[]>(QueryAPI.dashboard.favorite.single(dashboard_id));

            if (!favoriteItemList?.length) {
                actionSuccessReporter({
                    message: 'Wrong favorite data. Please try again later!',
                    type: 'error',
                });
                setSubmittingStar(false);
                return;
            }

            await Requestor.request({
                url: CommandAPI.dashboard.favorite.delete(favoriteItemList[0]._id),
                method: 'POST',
            });
            onUpdateSuccess();
        } catch (error) { } finally {
            setSubmittingStar(false);
        }
    };

    const addFavoriteToDashboard = async (dashboard_id: string) => {
        try {
            setSubmittingStar(true);
            await Requestor.request({
                url: CommandAPI.dashboard.favorite.create(),
                method: 'POST',
                data: {
                    resource: 'dashboard',
                    resource_id: dashboard_id,
                },
            });
            onUpdateSuccess();
        } catch (error) { } finally {
            setSubmittingStar(false);
        }
    };

    if (!apiDashboard) {
        return null;
    }

    return (
        <span
            className={mergeClass('btn-star-dashboard', className)}
            onClick={!isSubmittingStar
                ? apiDashboard.is_favorite
                    ? () => removeFavoriteFromDashboard(apiDashboard._id)
                    : () => addFavoriteToDashboard(apiDashboard._id)
                : undefined
            }
        >
            {customRender
                ? (
                    <Tooltip
                        title={apiDashboard.is_favorite
                            ? 'Remove from Favorites'
                            : 'Add to Favorites'
                        }
                        placement={tooltipPlacement}
                    >
                        {customRender(!!apiDashboard.is_favorite)}
                    </Tooltip>
                )
                : (
                    <ActionStar
                        className="star-icon"
                        theme="yellow"
                        isStarred={!!apiDashboard.is_favorite}
                        loading={isSubmittingStar}
                        tooltip={apiDashboard.is_favorite
                            ? 'Remove from Favorites'
                            : 'Add to Favorites'
                        }
                        tooltipProps={{
                            placement: tooltipPlacement,
                        }}
                    />
                )
            }
        </span>
    );
};
