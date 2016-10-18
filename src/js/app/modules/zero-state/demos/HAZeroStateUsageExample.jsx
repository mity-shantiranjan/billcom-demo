import React from 'react';
import HAZeroState from 'hui/react-components/HAZeroState';
import HAHeader from 'hui/react-components/HAHeader';
import HASection from 'hui/react-components/HASection';
import HAFooter from 'hui/react-components/HAFooter';

export default class ItemZeroStateComponent extends React.Component {
    static propTypes = {
        sandbox: React.PropTypes.object,
        onAddItem: React.PropTypes.func,
        onImportBtn: React.PropTypes.func,
        onProductsAndServicesClick: React.PropTypes.func
    };

    render() {
        return (
            // Now there is an optional simulateViewport={true} property which can be passed in to hack the viewport for responsive views, This will be removed 
            <HAZeroState titleText="Add your products and services to save time creating your next invoice or receipt" subTitleText="Some temporary subtitle" buttonText="Add a product or service" onButtonClick={this.props.onAddItem} simulateViewport={true}>
                <HAHeader>
                    <div className="prod-and-servcs-image"></div>
                </HAHeader>
                /* Optional HASection can be added here with additional content/form fields within it if required */
                <HASection></HASection>
                <HAFooter>
                    <p>Get your products and services in an Excel or CSV file? <a className="import-file-link" href="javascript:void(0)" onClick={this.props.onImportBtn}>Import a file</a></p>
                    <p className="footer-link">Go to <a className="p-and-s-link" onClick={this.props.onProductsAndServicesClick}>Products and Services</a> page</p>
                </HAFooter>
            </HAZeroState>
        );

    }
}
