import { AppModules, ModulePanels, PanelParams } from '@/constant';
import { ILayoutService } from '@gotecq/layout';
import { DashboardUtilsMenu } from '@/components/dashboard-utils';
import { Shortlink } from '@/access';
import { DashboardGroup, DashboardItem } from '@gotecq/model';

export const CommonSideNavMode = {
    SUMMARY: 'summary',
    FAVORITE: 'favorite',
    WORK_ITEM: 'work-item',
    HELP: 'help',
};

export const TechnologySideNavMode = {
    SUMMARY: CommonSideNavMode.SUMMARY,
    FAVORITE: CommonSideNavMode.FAVORITE,
    WORK_ITEM: CommonSideNavMode.WORK_ITEM,
    HELP: CommonSideNavMode.HELP,
};

export const ExperienceSideNavMode = {
    SUMMARY: CommonSideNavMode.SUMMARY,
    FAVORITE: CommonSideNavMode.FAVORITE,
    WORK_ITEM: CommonSideNavMode.WORK_ITEM,
    HELP: CommonSideNavMode.HELP,
};

export const CostSideNavMode = {
    SUMMARY: CommonSideNavMode.SUMMARY,
    FAVORITE: CommonSideNavMode.FAVORITE,
    WORK_ITEM: CommonSideNavMode.WORK_ITEM,
    HELP: CommonSideNavMode.HELP,
};

export const QualitySideNavMode = {
    SUMMARY: CommonSideNavMode.SUMMARY,
    FAVORITE: CommonSideNavMode.FAVORITE,
    WORK_ITEM: CommonSideNavMode.WORK_ITEM,
    HELP: CommonSideNavMode.HELP,
};

export enum AvailableExtraVariableMapKeys {
    USER_ID = 'user_id',
};

export const SummarySideNavMode = {
    [AppModules.DASHBOARDS]: TechnologySideNavMode.SUMMARY,
    [AppModules.EXPERIENCE]: ExperienceSideNavMode.SUMMARY,
    [AppModules.COST]: CostSideNavMode.SUMMARY,
    [AppModules.QUALITY]: QualitySideNavMode.SUMMARY,
};

export function getDashboardRedirectUrl(dashboardCode: string, defaultDashboardParam?: string) {
    return Shortlink.dashboard.single(dashboardCode, defaultDashboardParam);
};

export function redirectDashboard(
    aspectKey: string, group: DashboardGroup, localDashboard: DashboardItem, layoutService: ILayoutService,
    options?: { source: 'work-item' },
) {
    // if (group.isSummary) {
    //     layoutService
    //         .setLayout(aspectKey)
    //         .setPrimary(ModulePanels.common.summary, {
    //             [PanelParams.common.summary.aspectKey]: aspectKey
    //         })
    //         .setSecondary('-', {})
    //         .setExtension(ModulePanels.technology.sideNav, {
    //             [PanelParams.common.sideNav.menuMode]: SummarySideNavMode[aspectKey],
    //         })
    //         .go();
    // } else {
    //     layoutService
    //         .setLayout(aspectKey)
    //         .setPrimary(ModulePanels.common.detailDashboard, {
    //             [PanelParams.common.detailDashboard.dashboardCode]: localDashboard.code,
    //             // FOR NOW: we only use primary params to manage params easier
    //             ...(options?.source === 'work-item'
    //                 ? {
    //                     [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.WORK_ITEM
    //                 }
    //                 : {}
    //             )
    //         })
    //         .setSecondary(ModulePanels.common.dashboardUtils, {})
    //         .setExtension(ModulePanels.common.sideNav, {
    //             [PanelParams.common.sideNav.menuMode]: localDashboard.code,
    //         })
    //         .go();
    // }

    layoutService
        .setLayout(aspectKey)
        .setPrimary(ModulePanels.common.detailDashboard, {
            [PanelParams.common.detailDashboard.dashboardCode]: localDashboard.code,
            // FOR NOW: we only use primary params to manage params easier
            ...(options?.source === 'work-item'
                ? {
                    [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.WORK_ITEM,
                }
                : (localDashboard.isSummary
                    ? {
                        [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.DISCUSSION,
                    }
                    : {
                        [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.QUERY,
                    }
                )
            ),
        })
        .setSecondary(ModulePanels.common.dashboardUtils, {})
        .setExtension(ModulePanels.common.sideNav, {
            ...(localDashboard.isSummary
                ? {
                    [PanelParams.common.sideNav.menuMode]: SummarySideNavMode[aspectKey],
                }
                : {
                    [PanelParams.common.sideNav.menuMode]: TechnologySideNavMode.SUMMARY,
                    [PanelParams.common.sideNav.subMenuMode]: localDashboard.code,
                }
            ),
        })
        .go();
}
