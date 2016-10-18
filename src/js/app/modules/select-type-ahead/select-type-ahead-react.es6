import React from "react";
import ReactDOM from "react-dom";
import HASelectTypeAhead from "hui/react-components/HASelectTypeAhead";
import loremIpsum from "../util/loremIpsum";

const data = [{
        label: "Apple",
        value: "1"
    }, {
        label: "Banana",
        value: "2"
    }, {
        label: "Balloon",
        value: "3"
    }, {
        label: 'Melon',
        value: '4'
    }, {
        label: 'Orange',
        value: '5'
    }, {
        label: 'Lemon',
        value: '6'
    }, {
        label: 'Pear',
        value: '7'
    }, {
        label: 'Mango',
        value: '8'
    }, {
        label: 'Grape',
        value: '9'
    }, {
        label: 'Peach',
        value: '10'
    }, {
        label: 'Strawberry',
        value: '11'
    }, {
        label: 'Papaya',
        value: '12'
    }],
    dataWrapping = data.concat([
        {label: loremIpsum(), value: loremIpsum()}
    ]);

function TypeAheadReactGallery() {
    return (
        <div>
            <h3>Default</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" data={data} />

            <h3>Preselected Value</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" data={data} value="2"/>

            <h3>Disabled</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" data={data} disabled={true} />

            <h3>Required</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" data={data} required={true} />

            <h3>With Required Validation No Indicator</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" data={data} required={true} noRequiredIndicator={true} />

            <h3>With Icon</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" icon="hi-filter" data={data} />

            <h3>With Wrapping Items</h3>
            <HASelectTypeAhead label="Some Label" placeholder="Choose an item" data={dataWrapping} />
        </div>
    );
}

export function renderReact(placeToAppend) {
    ReactDOM.render(<TypeAheadReactGallery />, placeToAppend);
}
