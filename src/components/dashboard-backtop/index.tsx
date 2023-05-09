import './index.scss';
import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { MouseDownIcon, MouseUpIcon } from './icon';
import { useEventListener } from '@/utils';

type DashboardBacktop = {
    targetId: string;
    verticalOffsetWrapperId: string;
};
export const DashboardBacktop: React.ComponentType<DashboardBacktop> = ({
    targetId, verticalOffsetWrapperId,
}) => {
    const [positionScroll, setPositionScroll] = useState({ isScroll: false, isTop: true, isBottom: true });
    const [offsetHeight, setOffsetHeight] = useState(0);

    const detectScroll = () => {
        const rootCanvas = document.getElementById(targetId);
        const isBottom = Number(rootCanvas?.offsetHeight) + Number(rootCanvas?.scrollTop) >= Number(rootCanvas?.scrollHeight);
        const isTop = Number(rootCanvas?.scrollTop) === 0;
        const isScroll = !(isTop && isBottom);
        if (isBottom !== positionScroll.isBottom || isTop !== positionScroll.isTop || isScroll !== positionScroll.isScroll) {
            setPositionScroll({ isScroll: !(isTop && isBottom), isTop: isTop, isBottom: isBottom });
        }
    };

    const scrollToTop = () => {
        const rootCanvas = document.getElementById(targetId);
        rootCanvas?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        const rootCanvas = document.getElementById(targetId);
        rootCanvas?.scrollTo({ top: Number(rootCanvas?.scrollHeight), behavior: 'smooth' });
    };

    const handleScroll = React.useCallback(() => {
        detectScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setOffsetHeight(document.getElementById(verticalOffsetWrapperId)?.getBoundingClientRect().height ?? 0);
        handleScroll();
    }, [handleScroll, verticalOffsetWrapperId]);

    React.useEffect(() => {
        // INITIAL RENDERS
        // cannot know when the dashboard content finish render
        // => wait for a specific time passed then calculate the scroll position
        const detectScrollTimeout = setTimeout(() => {
            handleScroll();
        }, 2000);
        return () => {
            clearTimeout(detectScrollTimeout);
        };
    }, [handleScroll]);

    useEventListener('scroll', handleScroll, document.getElementById(targetId));

    return (
        <>
            <div
                style={{ top: `calc(var(--spacing-xs) + ${offsetHeight}px)` }}
                className={`position-indicator top-indicator ${positionScroll.isTop ? 'hidden' : 'display'}`}
                onClick={scrollToTop}
            >
                <Tooltip title='Back to top' placement='left'>
                    <div>
                        <MouseUpIcon />
                    </div>
                </Tooltip>
            </div>
            <div className={`position-indicator bottom-indicator ${positionScroll.isBottom ? 'hidden' : 'display'}`} onClick={scrollToBottom}>
                <Tooltip title='End of page' placement='left'>
                    <div>
                        <MouseDownIcon />
                    </div>
                </Tooltip>
            </div>
        </>
    );
};
