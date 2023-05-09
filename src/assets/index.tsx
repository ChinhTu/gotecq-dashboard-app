import React from 'react';
import { CustomIcon } from '@gotecq/s8-component';

export type CustomIconType = Partial<CustomIcon>;

export const TechnologyIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 18 18"
            fill="currentColor"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.546 8.182H18v1.636h-2.454V8.182ZM0 8.182h2.455v1.636H0V8.182ZM9.818 0v2.455H8.182V0h1.636Zm-6.61 2.045L4.95 3.796 3.788 4.95 2.045 3.215l1.162-1.17Zm9.842 1.743 1.734-1.743 1.17 1.17-1.742 1.735-1.162-1.162ZM9 4.091a4.91 4.91 0 0 1 2.454 9.163v1.473a.818.818 0 0 1-.818.819H7.364a.818.818 0 0 1-.819-.819v-1.473A4.92 4.92 0 0 1 4.091 9 4.91 4.91 0 0 1 9 4.09Zm1.636 12.273v.818a.818.818 0 0 1-.818.818H8.182a.818.818 0 0 1-.818-.818v-.818h3.272Zm-2.454-2.455h1.636v-1.743A3.273 3.273 0 1 0 5.728 9a3.266 3.266 0 0 0 2.454 3.166v1.743Z"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    )}
/>;

export const WorkItemIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 18 14"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.5 6.25h-1.25v-5H6.875V0h9.375a1.251 1.251 0 0 1 1.25 1.25v5Z"
                fill="none"
                stroke="currentColor"
            />
            <path
                d="M14.375 9.375h-1.25v-5H3.75v-1.25h9.375a1.251 1.251 0 0 1 1.25 1.25v5Z"
                fill="none"
                stroke="currentColor"
            />
            <path
                d="M10 13.75H1.25A1.25 1.25 0 0 1 0 12.5v-5a1.251 1.251 0 0 1 1.25-1.25H10a1.251 1.251 0 0 1 1.25 1.25v5A1.25 1.25 0 0 1 10 13.75ZM1.25 7.5v5H10v-5H1.25Z"
                fill="none"
                stroke="currentColor"
            />
        </svg>
    )}
/>;

export const ExportIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.5 0C.667 0 0 .72 0 1.6v12.8c0 .424.158.831.44 1.131.28.3.662.469 1.06.469h9c.398 0 .78-.169 1.06-.469.282-.3.44-.707.44-1.131V4.8L7.5 0h-6Zm5.25 1.2 4.125 4.4H6.75V1.2ZM3.697 8.176H9v5.656l-1.59-1.696L5.287 14.4l-2.122-2.264L5.287 9.88"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const FullscreenIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m6.5 10.09 1.41 1.41-4.5 4.5H7v2H0v-7h2v3.59l4.5-4.5ZM7.91 6.5 6.5 7.91 2 3.41V7H0V0h7v2H3.41l4.5 4.5Zm3.59 3.59 4.5 4.5V11h2v7h-7v-2h3.59l-4.5-4.5 1.41-1.41ZM10.09 6.5l4.5-4.5H11V0h7v7h-2V3.41l-4.5 4.5-1.41-1.41Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const NormalscreenIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.41.5 11.91 5V1.41h-2v7h7v-2h-3.59l4.5-4.5L16.41.5ZM.91 10.41v2H4.5L0 16.91l1.41 1.41 4.5-4.5v3.59h2v-7h-7Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const MoreIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM10 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const AppMenuIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M.875 1.696h10.363v5.619L18.57 0l7.319 7.315-7.32 7.328h5.623V25H13.829V14.643h4.74l-7.33-7.328v4.738H.874V1.696Zm0 12.947h10.363V25H.875V14.643Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const CarbonIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m1 12.199 7.5 3.733 7.5-3.733M1 8.466l7.5 3.733L16 8.466M8.5 1 1 4.733l7.5 3.733L16 4.733 8.5 1Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )}
/>;

export const QualityIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.4 0C.623 0 0 .609 0 1.368v6.843c0 .362.147.71.41.967s.619.4.99.4H7v3.422l2.1-2.053L11.2 13V9.579h1.4c.371 0 .727-.144.99-.4.262-.257.41-.606.41-.968V1.368c0-.363-.148-.71-.41-.967A1.416 1.416 0 0 0 12.6 0H1.4ZM7 1.368l2.1 1.369 2.1-1.369v2.395l2.1 1.026-2.1 1.027V8.21L9.1 6.842 7 8.211V5.816L4.9 4.789 7 3.763V1.368Zm-5.6 0h3.5v1.369H1.4V1.368Zm0 2.737h2.1v1.369H1.4V4.105Zm0 2.737h3.5v1.369H1.4V6.842Z"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    )}
/>;

export const SyncIcon = (props: CustomIconType) => <CustomIcon
    Comp={() => (
        <svg width="1em" height="1em" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.94186 5.59997C7.8876 5.59997 6.13372 6.22497 4.68023 7.47497C3.22674 8.72497 2.5 10.2333 2.5 12C2.5 13.0666 2.7907 14.0666 3.37209 15L1.51163 16.55C0.503876 15.15 0 13.6333 0 12C0 9.6333 0.968992 7.61664 2.90698 5.94997C4.84496 4.2833 7.18992 3.44997 9.94186 3.44997V0.249969L14.8837 4.54997L9.94186 8.79997V5.59997ZM18.314 7.44997C19.3217 8.84997 19.8256 10.3666 19.8256 12C19.8256 14.3666 18.8566 16.3833 16.9186 18.05C14.9806 19.7166 12.655 20.55 9.94186 20.55V23.75L4.94186 19.45L9.94186 15.2V18.4C11.9961 18.4 13.75 17.775 15.2035 16.525C16.657 15.275 17.3837 13.7666 17.3837 12C17.3837 10.9666 17.093 9.96664 16.5116 8.99997L18.314 7.44997Z" fill="currentColor" stroke='none' />
        </svg>
    )}
    {...props}
/>;

export const ArchiveIcon = (props: CustomIconType) => <CustomIcon
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.71 6.355v14.451H3.163V6.355M22.775 1.194H1.098v5.16h21.677v-5.16ZM9.648 11h4.572"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )}
    {...props}
/>;

export const NavigateIcon = (props: CustomIconType) => <CustomIcon
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m13.542 15.388 3.166-3.166H4.888V9.778h11.82l-3.166-3.166 1.736-1.723L21.388 11l-6.11 6.111-1.736-1.723ZM19.556 0A2.444 2.444 0 0 1 22 2.444v5.708L20.167 5.5V1.833H1.833v18.334h18.334V16.5L22 13.848v5.708A2.444 2.444 0 0 1 19.556 22H2.444A2.444 2.444 0 0 1 0 19.556V2.444A2.436 2.436 0 0 1 2.444 0h17.112Z"
                fill="currentColor"
            />
        </svg>
    )}
    {...props}
/>;

export const UserCheckIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1.1rem"
            height="1rem"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 12s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10Zm-9.995-.944v-.002.002ZM1.022 11h9.956l.014-.002.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 8.68 8.289 8 6 8c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664l.022.004Zm9.974.056v-.002.002ZM6 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.854.146a.5.5 0 0 1 0 .708l-3 3a.499.499 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 5.793l2.646-2.647a.499.499 0 0 1 .708 0Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const UtilsIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 18.667h10.5V21h2.333v-2.333H21v-2.334h-8.167V14H10.5v2.333H0v2.334Zm0-7h5.833V14h2.334v-2.333H21V9.333H8.167V7H5.833v2.333H0v2.334Zm0-7h12.833V7h2.334V4.667H21V2.333h-5.833V0h-2.334v2.333H0"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const CloseCircleFilledIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 0c5.53 0 10 4.47 10 10s-4.47 10-10 10S0 15.53 0 10 4.47 0 10 0Zm3.59 5L10 8.59 6.41 5 5 6.41 8.59 10 5 13.59 6.41 15 10 11.41 13.59 15 15 13.59 11.41 10 15 6.41 13.59 5Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;

export const ExpandIcon = (props: CustomIconType) => <CustomIcon
    {...props}
    Comp={() => (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m6.5 10.09 1.41 1.41-4.5 4.5H6v2H0v-6h2v2.59l4.5-4.5ZM7.91 6.5 6.5 7.91 2 3.41V6H0V0h6v2H3.41l4.5 4.5Zm3.59 3.59 4.5 4.5V12h2v6h-6v-2h2.59l-4.5-4.5 1.41-1.41ZM10.09 6.5l4.5-4.5H12V0h6v6h-2V3.41l-4.5 4.5-1.41-1.41Z"
                fill="currentColor"
            />
        </svg>
    )}
/>;
