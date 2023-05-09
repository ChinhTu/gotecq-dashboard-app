import './index.scss';
import React, { useMemo, useState } from 'react';
import { ComposeHeader, S8MenuItemList, ScrollBarObserver, ScrollBarObserverData } from '@gotecq/s8-component';
import { DashboardSearch } from './dashboard-search';
import { DashboardMenu } from './dashboard-menu';
import { getSideNavMenuConfig } from './method';
import { CommonSideNavMode } from '@/utils';
import { WorkItemFilter } from './work-item-filter';
import debounce from 'lodash.debounce';
import { searchDashboard } from '@gotecq/component.complex-component';
import { DashboardOption } from '@gotecq/model';


type Props = {
    menuMode: string;
    subMenuMode: string,
    workItemFilterValue: any;
    currentModule: any;
    currentWorkItemFilterId: any;
    onClickMenuItem: (itemKey: string) => void;
    onSelectSearchItem: (selectedDashboard: DashboardOption) => void;
    onClearWorkItemFilter?: () => void;
    onSavedWorkItemFilterChange?: (savedId: string) => void;
    onWorkItemFilterValueChange?: (payload: any, payloadTree: any) => void;
};

const onResize = debounce((target: Element | null, data: ScrollBarObserverData) => {
    if (target) {
        if (data.hasVerticalScroll) target.setAttribute('style', 'padding-right: var(--spacing); transition: all 0.5s ease');
        else target.setAttribute('style', '');
    }
}, 100);

export const SideNav: React.FC<Props> = ({
    menuMode = '', subMenuMode = '', currentModule, workItemFilterValue, currentWorkItemFilterId,
    onClickMenuItem, onSelectSearchItem,
    onClearWorkItemFilter, onSavedWorkItemFilterChange, onWorkItemFilterValueChange,
}) => {
    const { data: menuData, schema: menuSchema } = useMemo(() => {
        return getSideNavMenuConfig(currentModule);
    }, [currentModule]);

    const [dashboardList, setDashboardList] = useState<DashboardOption[]>(() => {
        return searchDashboard('', '');
    });

    const getFilterDashboardList = (_dashboardList: DashboardOption[]) => {
        setDashboardList([..._dashboardList]);
    };

    return (
        <div className="side-nav">
            <div className="side-nav__menu">
                <ComposeHeader type="transparent">
                    <ComposeHeader.HeaderTitle title="MENU" />
                </ComposeHeader>
                <S8MenuItemList
                    data={menuData}
                    currentTab={menuMode}
                    onMenuItemClick={onClickMenuItem}
                    schema={menuSchema}
                />
            </div>

            {![CommonSideNavMode.FAVORITE, CommonSideNavMode.WORK_ITEM, CommonSideNavMode.HELP].includes(menuMode) && (
                <div className="side-nav__dashboard-browser">
                    <ComposeHeader type="transparent" className="side-nav__dashboard-browser__title">
                        <ComposeHeader.HeaderTitle title="DASHBOARD BROWSER" />
                    </ComposeHeader>

                    <div className="side-nav__dashboard-browser__content">
                        <div className="side-nav__dashboard-browser__content__search">
                            <DashboardSearch
                                currentModule={currentModule}
                                onSelectSearchItem={onSelectSearchItem}
                                getFilterDashboardList={getFilterDashboardList}
                            />
                        </div>

                        <div className="side-nav__dashboard-browser__content__dashboard-menu">
                            <ScrollBarObserver onScrollBarChange={onResize}>
                                <DashboardMenu
                                    menuMode={subMenuMode}
                                    currentModule={currentModule}
                                    onSelectItem={onSelectSearchItem}
                                    filterDashboardList={dashboardList}
                                />
                            </ScrollBarObserver>
                        </div>
                    </div>
                </div>
            )}

            {menuMode === CommonSideNavMode.WORK_ITEM && (
                <div className="side-nav__work-item-filter">
                    <WorkItemFilter
                        filterValue={workItemFilterValue}
                        currentFilterId={currentWorkItemFilterId}
                        onClear={onClearWorkItemFilter}
                        onFilterValueChange={onWorkItemFilterValueChange}
                        onSavedFilterChange={onSavedWorkItemFilterChange}
                    />
                </div>
            )}
        </div>
    );
};
