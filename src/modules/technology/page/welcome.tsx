import React from 'react';
import { Redirect } from 'react-router-dom';
import { TechnologySideNavMode } from '@/utils';
import { DashboardUtilsMenu } from '@/components/dashboard-utils';
import { AppModules, DashboardCode, ModulePanels, PanelParams } from '@/constant';
import { getDashboardByCode } from '@gotecq/component.complex-component';

export function RedirectWelcome() {
    const { code, getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};

    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${code}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${code}"}`,
            }}
        />
    );
};

export function MemberDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.MEMBER_PANEL_SUMMARY}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.MEMBER_PANEL_SUMMARY}"}`,
            }}
        />
    );
};

export function QualityDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.QUALITY_MEASURE}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.QUALITY_MEASURE}"}`,
            }}
        />
    );
};

export function ActivityDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.ACTIVITY_SUMMARY}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.ACTIVITY_SUMMARY}"}`,
            }}
        />
    );
};

export function MAHDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.MAH_DASHBOARD}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.MAH_DASHBOARD}"}`,
            }}
        />
    );
};

export function StarDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.STAR_DASHBOARD}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.STAR_DASHBOARD}"}`,
            }}
        />
    );
};

export function UserDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.USER_MANAGEMENT}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.USER_MANAGEMENT}"}`,
            }}
        />
    );
};

export function ProviderDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.PROVIDER_MANAGEMENT}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.PROVIDER_MANAGEMENT}"}`,
            }}
        />
    );
};

export function ProcessDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.PROCESS_MANAGEMENT}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.PROCESS_MANAGEMENT}"}`,
            }}
        />
    );
};

export function InventoryDashboardRedirect() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.INVENTORY_MANAGEMENT}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.INVENTORY_MANAGEMENT}"}`,
            }}
        />
    );
};

export function HighCostMembersRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.HIGH_COST_MEMBERS}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.HIGH_COST_MEMBERS}"}`,
            }}
        />
    );
};

export function ComplicatedConditionsMemberRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.COMPLICATED_CONDITIONS_MEMBER}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.COMPLICATED_CONDITIONS_MEMBER}"}`,
            }}
        />
    );
};

export function ChronicRenalMembersRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.CHRONIC_RENAL_FAILURE_MEMBERS}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.CHRONIC_RENAL_FAILURE_MEMBERS}"}`,
            }}
        />
    );
};

export function HomeHealthVisitsRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.HOME_HEALTH_EMERGENCY_ROOM_VISITS}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.HOME_HEALTH_EMERGENCY_ROOM_VISITS}"}`,
            }}
        />
    );
};

export function NoOfficeVisitRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.MEMBERS_WITHOUT_OFFICE_VISIT}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.MEMBERS_WITHOUT_OFFICE_VISIT}"}`,
            }}
        />
    );
};

export function MemberDistributionMapRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.MEMBER_DISTRIBUTION_MAP}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.MEMBER_DISTRIBUTION_MAP}"}`,
            }}
        />
    );
};

export function PotentialHighCostMembersRedirect() {
    const { getDefaultFilter } = getDashboardByCode(DashboardCode.MEMBER_PANEL_SUMMARY, true) ?? {};
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.detailDashboard}/${ModulePanels.dashboards.dashboardUtils}/${ModulePanels.dashboards.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.POTENTIAL_HIGH_COST_MEMBERS}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}","filter":${getDefaultFilter?.() ?? '[]'}}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${DashboardCode.POTENTIAL_HIGH_COST_MEMBERS}"}`,
            }}
        />
    );
};


