import './index.scss';
import React from 'react';
import { ComposeHeader, ComposePanel, NonDataPanel } from '@gotecq/s8-component';
import { DetailDashboardContent } from './detail-dashboard-content';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { DashboardCode, getDashboardByCode, getDashboardListByAspect, ModulePanels, PanelParams } from '@/constant';
import { mergeClass } from '@gotecq/utils';
import { LayoutPanelComponent } from '@gotecq/layout';
import { v4 as uuidv4 } from 'uuid';
import { DashboardDefaultParamSelector, DefaultParamSelectorTrigger } from './default-param-selector';
import { DashboardBacktop } from '../dashboard-backtop';
import { actionSuccessReporter, useRequest } from '@gotecq/access';
import { QueryAPI } from '@/access';
import { DetailDashboardHeader } from './header-title';
import { UtilsIcon } from '@/assets';
import { exportComponentAsPDF } from 'react-component-export-image';
import { hasAccess } from '@/config';
import { PageItemError403 } from '@gotecq/core';
import { TechnologySideNavMode, redirectDashboard } from '@/utils';
import { DashboardUtilsMenu } from '../dashboard-utils';
import { Dashboard } from '@gotecq/model';

type DetailDashboard = {
    filter: any;
    showUtils: any;
    isFullscreen: boolean;
    dashboardCode: string;
    onNavigateDashboard: (dashboardCode: string) => void;
    onToggleFullscreen: (aspectKey: string) => void;
    onToggleDisplayDashboardUtils: () => void;
    defaultDashboardParam: any;
} & LayoutPanelComponent;

export const DetailDashboard: React.ComponentType<DetailDashboard> = ({
    dashboardCode, isFullscreen, filter = [], showUtils,
    layoutService, defaultDashboardParam,
    onNavigateDashboard, onToggleFullscreen, onToggleDisplayDashboardUtils,
}) => {
    const [refreshDashboardKey, setRefreshDashboardKey] = React.useState('');
    const [{ data: [apiDashboard] = [] }] = useRequest<Dashboard[]>(dashboardCode ? QueryAPI.dashboard.singleByCode(dashboardCode) : undefined);
    const printRef = React.useRef<HTMLDivElement>(null);

    const localDashboardData = React.useMemo(() => {
        return getDashboardByCode(dashboardCode, true);
    }, [dashboardCode]);

    const aspectDashboardList = React.useMemo(() => {
        return !localDashboardData ? [] : getDashboardListByAspect(localDashboardData.aspect_key);
    }, [localDashboardData]);

    const refreshDashboard = () => {
        // change the key of the component will cause mounting a new component instance ~ REFRESH
        setRefreshDashboardKey(uuidv4());
    };

    const { prevDashboard, nextDashboard } = React.useMemo(() => {
        if (aspectDashboardList.length <= 1) {
            return {};
        }

        const index = aspectDashboardList.findIndex(dashboard => dashboard.code === dashboardCode);
        if (index < 0) {
            return {};
        }

        return {
            prevDashboard: aspectDashboardList?.[index - 1],
            nextDashboard: aspectDashboardList?.[index + 1],
        };
    }, [aspectDashboardList, dashboardCode]);

    const _handleChangeDefaultParam = (newDefaultParamValue: any) => {
        // TODO: move this function to panel later
        layoutService
            .addParam('primary', {
                [PanelParams.common.detailDashboard.defaultDashboardParam]: newDefaultParamValue,
            })
            // clear filter
            .removeParam('primary', [PanelParams.common.dashboardUtils.filter, PanelParams.common.dashboardUtils.currentFilterId])
            .go();
    };

    const currentModule = layoutService.getLayout();
    const paramsQ = layoutService.getParam('primary');
    const {
        [PanelParams.common.favoriteDashboard.searchText]: searchText = '',
    } = paramsQ;

    function handleSearch(searchText: string) {
        layoutService
            .addParam('primary', { [PanelParams.common.favoriteDashboard.searchText]: searchText })
            .go();
    }

    const exportDashboardAsPdf = () => {
        if (!printRef.current?.clientWidth || !printRef.current?.clientHeight) {
            actionSuccessReporter({
                type: 'error',
                message: 'Dashboard content not found. Please try again later!',
            });
            return;
        }

        const A4PaperRatioHeightOnWidth = 297 / 210;
        const A4PaperSize = {
            long: 297,
            short: 210,
        };
        const ActualDocumentRatioHeightOnWidth = printRef.current.clientHeight / printRef.current.clientWidth;
        const isPortrait = ActualDocumentRatioHeightOnWidth > 1;

        let calculatedWidth: number;
        let calculatedHeight: number;
        let startX: number;
        let startY: number;

        if (isPortrait) {
            if (ActualDocumentRatioHeightOnWidth > A4PaperRatioHeightOnWidth) {
                calculatedWidth = A4PaperSize.long / ActualDocumentRatioHeightOnWidth;
                calculatedHeight = A4PaperSize.long;
                startX = (A4PaperSize.short - calculatedWidth) / 2; // horizontial center align
                startY = 0;
            } else {
                calculatedWidth = A4PaperSize.short;
                calculatedHeight = A4PaperSize.short * ActualDocumentRatioHeightOnWidth;
                startX = 0;
                startY = (A4PaperSize.long - calculatedHeight) / 2; // vertical center align
            }
        } else {
            if ((1 / ActualDocumentRatioHeightOnWidth) > A4PaperRatioHeightOnWidth) {
                calculatedWidth = A4PaperSize.long;
                calculatedHeight = A4PaperSize.long / (1 / ActualDocumentRatioHeightOnWidth);
                startX = 0;
                startY = (A4PaperSize.short - calculatedHeight) / 2;  // vertical center align
            } else {
                calculatedWidth = A4PaperSize.short * (1 / ActualDocumentRatioHeightOnWidth);
                calculatedHeight = A4PaperSize.short;
                startX = (A4PaperSize.long - calculatedWidth) / 2;  // horizontial center align
                startY = 0;
            }
        }

        exportComponentAsPDF(printRef, {
            fileName: localDashboardData?.name,
            pdfOptions: {
                x: startX,
                y: startY,
                w: calculatedWidth,
                h: calculatedHeight,
            },
        });

        // exportComponentAsJPEG(printRef, {
        //     html2CanvasOptions: {
        //         // backgroundColor: 'white',
        //         width: printRef.current?.clientWidth,
        //         height: printRef.current?.clientHeight,
        //     }
        // });
    };

    const [forceRenderDashboardBacktop, setForceRenderDashboardBacktop] = React.useState('');
    React.useEffect(() => {
        setForceRenderDashboardBacktop(uuidv4());
    }, [dashboardCode, defaultDashboardParam]);

    const { dashboardState, dashboardDrilldownState, subPanel, order, viewLevel } = layoutService.getParam('primary');
    const handleDashboardStateChange = (newDashboardState: any) => {
        if (newDashboardState) {
            layoutService
                .addParam('primary', {
                    dashboardState: newDashboardState,
                })
                .go();
            return;
        }
        layoutService
            .removeParam('primary', ['dashboardState'])
            .go();
    };
    const handleDashboardDrilldownStateChange = (newDashboardDrilldownState: any) => {
        if (newDashboardDrilldownState) {
            layoutService
                .addParam('primary', {
                    dashboardDrilldownState: newDashboardDrilldownState,
                })
                .go();
            return;
        }
        layoutService
            .removeParam('primary', ['dashboardDrilldownState'])
            .go();
    };

    if (!localDashboardData || !apiDashboard) {
        return (
            <div className="detail-dashboard__no-data">
                <NonDataPanel />
            </div>
        );
    }

    if (!!localDashboardData.defaultParamKey && !localDashboardData.defaultParamValue && !defaultDashboardParam) {
        return (
            <div className="detail-dashboard__default-param-selector">
                <DashboardDefaultParamSelector
                    dashboardData={localDashboardData}
                    onChangeDefaultParam={_handleChangeDefaultParam}
                />
            </div>
        );
    }

    return (!localDashboardData.accessKey || hasAccess(localDashboardData.accessKey ?? '') ? (
        <ComposePanel className="detail-dashboard">
            <ComposeHeader id="dashboard-header" type="contrast" className={mergeClass('detail-dashboard__header', isFullscreen ? 'fullscreen' : '', showUtils ? 'detail-dashboard__trigger_header' : 'detail-dashboard__header')} wrap>
                <ComposeHeader.HeaderItem span>
                    <DetailDashboardHeader
                        hasFilter={filter && filter.length > 0}
                        apiDashboard={apiDashboard}
                        isFullscreen={isFullscreen}
                        localDashboardData={localDashboardData}
                        defaultDashboardParam={defaultDashboardParam}
                        onToggleFullscreen={onToggleFullscreen}
                        onRefreshDashboard={refreshDashboard}
                        onClickExportPdf={exportDashboardAsPdf}
                    />
                    {/* <div className="dashboard-sub-title">Latest Updated: 07/15/2022, 00:00</div> */}
                </ComposeHeader.HeaderItem>

                {localDashboardData.requiredDefaultParamSelector && (
                    <ComposeHeader.HeaderItem right>
                        <DefaultParamSelectorTrigger
                            dashboardData={localDashboardData}
                            onChange={_handleChangeDefaultParam}
                            defaultDashboardParam={defaultDashboardParam}
                        />
                    </ComposeHeader.HeaderItem>
                )}

                {!localDashboardData.isSummary && (
                    <ComposeHeader.HeaderItem right className="dashboard-nav">
                        {prevDashboard
                            ? (
                                <Tooltip title={prevDashboard.name}>
                                    <div
                                        className="common-action-btn nav-btn truncate"
                                        onClick={() => onNavigateDashboard(prevDashboard.code)}
                                    >
                                        <LeftOutlined className="nav-icon" />
                                        {/* <span className="truncate nav-btn__text">{prevDashboard.name}</span> */}
                                    </div>
                                </Tooltip>
                            )
                            : (
                                <div className="common-action-btn nav-btn truncate common-action-btn-disabled">
                                    <LeftOutlined className="nav-icon" />
                                    {/* <span className="truncate nav-btn__text">Top</span> */}
                                </div>
                            )
                        }

                        {/* <div className="nav-divider" /> */}

                        {nextDashboard
                            ? (
                                <Tooltip title={nextDashboard.name}>
                                    <div
                                        className="common-action-btn nav-btn truncate"
                                        onClick={() => onNavigateDashboard(nextDashboard.code)}
                                    >
                                        {/* <span className="truncate nav-btn__text">{nextDashboard.name}</span> */}
                                        <RightOutlined className="nav-icon" />
                                    </div>
                                </Tooltip>
                            )
                            : (
                                <div className="common-action-btn nav-btn truncate common-action-btn-disabled">
                                    {/* <span className="truncate nav-btn__text">End</span> */}
                                    <RightOutlined className="nav-icon" />
                                </div>
                            )
                        }
                    </ComposeHeader.HeaderItem>
                )}

                <ComposeHeader.HeaderItem right>
                    <Tooltip
                        // click the toggle button => dashboard panel size change, position of the toggle btn change
                        // but the mouse may not move, so the tooltip still appear (wrong UX)
                        // => use key to catch the change & re-render the tooltip => it will disappear 
                        key={showUtils}
                        title={`${showUtils ? 'Hide' : 'Open'} Menu`}
                    >
                        <div
                            onClick={onToggleDisplayDashboardUtils}
                            className={`common-action-btn btn-toggle-utils ${showUtils ? 'btn-toggle-utils-activated' : ''} ${showUtils ? 'btn-toggle-utils-activated' : ''}`}
                        >
                            <UtilsIcon />
                        </div>
                    </Tooltip>
                </ComposeHeader.HeaderItem>
            </ComposeHeader>

            <ComposePanel.Body
                id="dashboard-body"
                className={mergeClass(
                    'detail-dashboard__body',
                    isFullscreen ? 'fullscreen' : '',
                    showUtils ? 'detail-dashboard__trigger__body' : '',
                    `dashboard-${localDashboardData.code}`,
                )}
            >
                <ComposePanel.Section>
                    <ComposePanel.SectionBody>
                        <DetailDashboardContent
                            ref={printRef}
                            key={refreshDashboardKey}
                            dashboardData={localDashboardData}
                            filter={filter}
                            subPanel={subPanel}
                            viewLevel={viewLevel}
                            order={order}
                            aspectKey={currentModule}
                            searchText={searchText}
                            onSearch={handleSearch}
                            onClickDashboard={(aspectKey, group, localDashboard) => redirectDashboard(aspectKey, group, localDashboard, layoutService)}
                            defaultDashboardParam={defaultDashboardParam}
                            dashboardState={dashboardState}
                            onDashboardStateChange={handleDashboardStateChange}
                            dashboardDrilldownState={dashboardDrilldownState}
                            onDashboardDrilldownStateChange={handleDashboardDrilldownStateChange}
                        />
                    </ComposePanel.SectionBody>
                </ComposePanel.Section>
            </ComposePanel.Body>

            <DashboardBacktop
                key={forceRenderDashboardBacktop}
                targetId="dashboard-body"
                verticalOffsetWrapperId="dashboard-header"
            />
        </ComposePanel>
    ) : <PageItemError403
        className={showUtils ? 'detail-dashboard__trigger__body' : ''}
        onBack={() => {
            const routing = layoutService
                .setExtension(ModulePanels.common.sideNav, {
                    [PanelParams.common.sideNav.menuMode]: TechnologySideNavMode.SUMMARY,
                    [PanelParams.common.sideNav.subMenuMode]: '',
                });

            routing
                .setPrimary(ModulePanels.common.detailDashboard, {
                    [PanelParams.common.detailDashboard.dashboardCode]: DashboardCode.TECHNOLOGY_SUMMARY,
                    [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.DISCUSSION,
                })
                .setSecondary(ModulePanels.common.dashboardUtils, {})
                .go();
        }}
    />);
};
