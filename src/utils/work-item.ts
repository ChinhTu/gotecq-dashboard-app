export const WorkItemStatus = {
    NEW: 'NEW',
    INPROGRESS: 'INPROGRESS',
    DONE: 'DONE',
};

export const WorkItemImportance = {
    LOW: 'LOW',
    NORMAL: 'NORMAL',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL',
};

export function getWorkItemStatusName(status: any) {
    switch (status) {
        case WorkItemStatus.DONE:
        case WorkItemStatus.NEW:
            return status.slice(0, 1).toUpperCase() + status.slice(1, status.length).toLowerCase();
        case WorkItemStatus.INPROGRESS:
            return 'In Progress';
        default:
            return 'Unknown status';
    }
}