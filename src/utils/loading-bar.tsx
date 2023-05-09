import React from 'react';
import LoadingBar from 'react-top-loading-bar';

type AppLoadingBarProps = {
    loading: boolean
}
export class AppLoadingBar extends React.Component<AppLoadingBarProps> {
    loadingRef: React.RefObject<any>;

    constructor(props: AppLoadingBarProps) {
        super(props);
        this.loadingRef = React.createRef();
    }

    componentDidMount() {
        this.loadingRef.current.continuousStart();
    }

    componentDidUpdate(prevProps: AppLoadingBarProps) {
        if (prevProps.loading !== this.props.loading) {
            if (this.props.loading) {
                this.loadingRef.current.continuousStart();
            } else {
                this.loadingRef.current.complete();
            }
        }
    }

    render() {
        return (
            <LoadingBar
                ref={this.loadingRef}
                color="rgba(0, 113, 255, 1)"
            />
        );
    }
}
