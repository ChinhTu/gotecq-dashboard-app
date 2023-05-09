// import './index.scss';
// import React from 'react';
// import { MainLayout } from '@gotecq/layout';
// import { AppLoadingBar } from '@/utils/loading-bar';
// import { AppModules } from '@/constant';

// export class QualityMainLayout extends MainLayout {
//     module = AppModules.TECHNOLOGY;

//     panelParam = {
//         primary: {},
//         secondary: {},
//         extension: {},
//     }

//     state = {
//         loading: false,
//     }

//     setLoadingState = (status: boolean) => this.setState({ loading: status });

//     render() {
//         const { loading } = this.state;
//         return (
//             <>
//                 <div className="quality-main-layout">
//                     {this.extensionPanel()}
//                     {this.primaryPanel()}
//                     {this.secondaryPanel()}
//                 </div>
//                 {loading && <AppLoadingBar loading={loading} />}
//             </>
//         );
//     }
// }
