import { FilterPanelProps } from '@gotecq/filter';
import { DashboardCode } from '../dashboard-meta';
import { DEFAULT_MEMBER_DASHBOARD_FILTER, MAIN_API, PLATFORM_API } from '../env';

export const DashboardFilterSchemas: Record<string,
(subPanel: any) => Pick<FilterPanelProps, 'context' | 'metaPath' | 'namespace' | 'defaultFields' | 'urlMap' | 'defaultFilterPayload' | 'useDefaultValueFromMeta'>> = {
    [DashboardCode.MEMBER_PANEL_SUMMARY]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.HIGH_COST_MEMBERS]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.COMPLICATED_CONDITIONS_MEMBER]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.POTENTIAL_HIGH_COST_MEMBERS]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.CHRONIC_RENAL_FAILURE_MEMBERS]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.HOME_HEALTH_EMERGENCY_ROOM_VISITS]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.MEMBERS_WITHOUT_OFFICE_VISIT]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.MEMBER_DISTRIBUTION_MAP]: () => ({
        context: 'member-filter',
        metaPath: 'gotecq.member-management/member/~meta',
        namespace: 'member-management',
        defaultFields: [
            'status:eq',
            'network_identifier:in',
            'address__city:in',
            'insurer_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'health_plan_id:in',
            'tags:ov',
            'gender:in',
            'age_group:range',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
            'user-management-api': MAIN_API,
            'ehr-management-api': MAIN_API,
            'provider-managemenet-api': MAIN_API,
        },
        defaultFilterPayload: DEFAULT_MEMBER_DASHBOARD_FILTER(),
        useDefaultValueFromMeta: false,
    }),
    [DashboardCode.QUALITY_MEASURE]: () => ({
        namespace: 'quality-management',
        context: 'program-summary-filter',
        metaPath: 'gotecq.quality-management/program-summary-meta/~meta',
        urlMap: {
            'member-management-api': MAIN_API,
            'quality-management-api': MAIN_API,
        },
        defaultFields: [
            'measure_id:in',
            'organization_id:in',
            'practitioner_id:in',
            'star_after_resolved:in',
        ],
    }),
    [DashboardCode.USER_MANAGEMENT]: () => ({
        context: 'company-browser',
        metaPath: 'gotecq.company/company/~meta',
        namespace: 'user-management',
        defaultFields: [
            'tag:ov',
        ],
        urlMap: {
            'user-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
        },
    }),
    [DashboardCode.PROVIDER_MANAGEMENT]: () => ({
        context: 'dashboard-filter',
        metaPath: 'gotecq.provider-management/dashboard-contract/~meta',
        namespace: 'provider-management',
        defaultFields: [
            'network:ov',
            'address__state:in',
            'origin:in',
            'categories:ov',
            'primary_taxonomy_code:in',
            'healthplan:ov',
            'provider_status:ov',
        ],
        urlMap: {
            'tecq-platform-api': PLATFORM_API,
            'provider-management-api': MAIN_API,
        },
    }),
    [DashboardCode.PROCESS_MANAGEMENT]: () => ({
        context: 'workflow-filter',
        metaPath: 'gotecq.process/workflow/~meta',
        namespace: 'workflow-management',
        defaultFields: [
            'network_id:in',
            'key:in',
            'status:in',
            'contract_entity:ov',
            'tag:in',
            'tag:ov',
        ],
        urlMap: {
            'contract-administration-api': MAIN_API,
            'contract-management-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
            'process-api': MAIN_API,
        },

    }),
    [DashboardCode.MAH_DASHBOARD]: () => ({
        context: 'mah-dashboard-filter',
        metaPath: '/gotecq.quality-management/mah-dashboard/entry/~meta',
        namespace: 'quality-management',
        defaultFields: [
            'organization_id:in',
            'practitioner_id:in',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'quality-management-api': MAIN_API,
        },

    }),
    [DashboardCode.INVENTORY_MANAGEMENT]: () => ({
        context: 'available-item-filter',
        metaPath: 'gotecq.inventory-management/available-item/~meta',
        namespace: 'inventory-management',
        defaultFields: [
            'category_id:in',
            'inventory_status:in',
            'item_status:in',
        ],
        urlMap: {
            'member-engagement-api': MAIN_API,
            'tecq-platform-api': PLATFORM_API,
        },

    }),
    [DashboardCode.ACTIVITY_SUMMARY]: (subPanel = 'provider') => ({
        context: 'activity-filter',
        metaPath: 'gotecq.quality-management/gap/~meta',
        namespace: 'quality-management',
        defaultFields: [
            'record_time:range',
            ...(subPanel === 'dashboard' ? ['measure_id:in'] : []),
            'organization_id:in',
            'practitioner_id:in',
            'uploader:in',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'quality-management-api': MAIN_API,
        },

    }),
    [DashboardCode.STAR_DASHBOARD]: () => ({
        context: 'star-dashboard-filter',
        metaPath: '/gotecq.quality-management/program-summary-meta/~meta',
        namespace: 'quality-management',
        defaultFields: [
            'network_identifier:in',
            'organization_id:in',
            'measure_id:in',
            'star_after_resolved:in',
        ],
        urlMap: {
            'member-management-api': MAIN_API,
            'quality-management-api': MAIN_API,
        },

    }),
};