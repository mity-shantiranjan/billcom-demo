import React from "react";

// This class is used in the ColumnEditChoice.jsx example
export default class EditColumnPopover extends React.Component {
    static get displayName() {
        return "EditColumnPopover";
    }

    static get propTypes() {
        return {
            onSelect: React.PropTypes.func.isRequired,
            targetSelector: React.PropTypes.string.isRequired
        };
    }

    // React component lifecycle
    //   @see https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
    componentDidMount() {
        // Namespace for API methods to expose on this instance.
        //   @see https://facebook.github.io/react/tips/expose-component-functions.html
        this.api = this.exposeApi();
    }

    // Expose a subset of the API methods from the underlying HATable instance for consumers to call directly
    // through the ref of this component
    //   E.G. tableRef.api.resize();
    exposeApi() {
        const apiToExpose = [
                "show",
                "close"
            ],
            that = this,
            api = {};

        apiToExpose.forEach((key) => {
            api[key] = function() {
                // Proxy the call on this component to the API method on the underlying instance
                return that.popover[key].apply(that.popover, arguments);  //eslint-disable-line prefer-spread
            };
        });

        return api;
    }

    handleWrapperRef(popover) {
        this.popover = popover;
    }

    handleClick(event) {
        const name = event.target.value;
        this.props.onSelect(name);
    }

    render() {
        const handleRef = this.handleWrapperRef.bind(this),
            handleClk = this.handleClick.bind(this);

        return (
            <ha-popover ref={handleRef} targetSelector={this.props.targetSelector}>
                <div>
                    <ha-menu-item value="first" onClick={handleClk}>First Name</ha-menu-item>
                    <ha-menu-item value="last" onClick={handleClk}>Last Name</ha-menu-item>
                </div>
            </ha-popover>
        );
    }
}
