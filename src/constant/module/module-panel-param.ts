export const CommonPanelParams = {
    boilerplate: {
        search: 'search' as const,
    },
    common: {
        // sideNav
        menuMode: 'menu_mode' as const,

        // summary dashboard
        aspect_key: 'aspect_key' as const,

        // detail dashboard
        dashboardCode: 'dashboard_code' as const,
        defaultDashboardParam: 'default_dashboard_param' as const,

        // dashboard filter
        filter: 'filter' as const,
        currentFilterId: 'current_filter_id' as const,
    },
};

export const PanelParams = {
    boilerplate: {
        list: {
            search: CommonPanelParams.boilerplate.search,
        },
    },
    common: {
        sideNav: {
            menuMode: CommonPanelParams.common.menuMode,
            subMenuMode: 'sub-menu-mode' as const,
            workItemFilter: 'work-item-filter' as const,
            currentWorkItemFilterId: 'current-work-item-filter-id' as const,
        },
        summary: {
            aspectKey: CommonPanelParams.common.aspect_key,
        },
        detailDashboard: {
            dashboardCode: CommonPanelParams.common.dashboardCode,
            defaultDashboardParam: CommonPanelParams.common.defaultDashboardParam,
        },
        dashboardUtils: {
            dashboardCode: CommonPanelParams.common.dashboardCode,
            filter: CommonPanelParams.common.filter,
            currentFilterId: CommonPanelParams.common.currentFilterId,
            activeMenu: 'active-menu' as const,
            showUtils: 'show-utils' as const,
        },
        favoriteDashboard: {
            searchText: 'search-txt' as const,
        },
        workItemOverview: {
            searchText: 'search-txt' as const,
        },
        help: {
            searchText: 'search-txt' as const,
        },
    },
    technology: {
    },
    experience: {
    },
    cost: {
    },
    quality: {
    },
};
