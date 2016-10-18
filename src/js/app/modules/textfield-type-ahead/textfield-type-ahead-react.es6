import React from 'react';
import ReactDOM from 'react-dom';
import HATextFieldTypeAhead from 'hui/react-components/HATextFieldTypeAhead';
import loremIpsum from '../util/loremIpsum';

const data = [{
        label: "Apple",
        value: "Apple"
    }, {
        label: "Banana",
        value: "Banana"
    }, {
        label: "Balloon",
        value: "Balloon"
    }, {
        label: 'Melon',
        value: 'Melon'
    }, {
        label: 'Orange',
        value: 'Orange'
    }, {
        label: 'Lemon',
        value: 'Lemon'
    }, {
        label: 'Pear',
        value: 'Pear'
    }, {
        label: 'Mango',
        value: 'Mango'
    }, {
        label: 'Grape',
        value: 'Grape'
    }, {
        label: 'Peach',
        value: 'Peach'
    }, {
        label: 'Strawberry',
        value: 'Strawberry'
    }, {
        label: 'Papaya',
        value: 'Papaya'
    }],
    dataWrapping = data.concat([
        {label: loremIpsum(), value: loremIpsum()}
    ]);

function TypeAheadReactGallery() {
    return (
        <div>
            <h3>Default</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={data} />

            <h3>Preselected Value</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={data} value='Balloon'/>

            <h3>Disabled</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={data} disabled={true} />

            <h3>Required</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={data} required={true} />

            <h3>With Required Validation No Indicator</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={data} required={true} noRequiredIndicator={true} />

            <h3>With Icon</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' icon='hi-filter' data={data} />

            <h3>With Wrapping Items</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={dataWrapping} />

            <h3>autoComplete Off</h3>
            <HATextFieldTypeAhead label='Some Label' placeholder='Choose an item' data={data} autoComplete="off"/>
        </div>
    );
}

export function renderReact(placeToAppend) {
    ReactDOM.render(<TypeAheadReactGallery />, placeToAppend);
}
