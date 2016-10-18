import React from 'react';
import ReactDOM from 'react-dom';
import HAZeroStateUsageExample from './HAZeroStateUsageExample';

let usage =`
 <HAZeroState titleText="Add your products and services to save time creating your next invoice or receipt" subTitleText="Some temporary subtitle" buttonText="Add a product or service" onButtonClick={this.props.onAddItem} simulateViewport={true}>
    <HAHeader>
        <div className="prod-and-servcs-image"></div>
    </HAHeader>

    /* Optional HASection can be added here with additional content/form fields within it if required */

    <HAFooter>  
        <p>Get your products and services in an Excel or CSV file? <a className="import-file-link" href="javascript:void(0)" onClick={this.props.onImportBtn}>Import a file</a></p>
        <p className="footer-link">Go to <a className="p-and-s-link" onClick={this.props.onProductsAndServicesClick}>Products and Services</a> page</p>
    </HAFooter>
</HAZeroState>`

export default {
    id: 'react',
    label: 'React',
    usage: usage,
    render(el) {
        let ExampleComponent = HAZeroStateUsageExample;
        ReactDOM.render(<ExampleComponent/>, el);
    }
}
