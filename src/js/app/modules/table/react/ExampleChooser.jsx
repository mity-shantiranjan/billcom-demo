import React from "react";
import HASelect from "hui/react-components/HASelect";
import HAItem from "hui/react-components/HAItem";

export default class ExampleChooser extends React.Component {
    static get displayName() {
        return "ExampleChooser";
    }

    static get propTypes() {
        return {
            value: React.PropTypes.string.isRequired,
            examples: React.PropTypes.object.isRequired,
            switchExample: React.PropTypes.func.isRequired
        };
    }

    switchExample(evt) {
        const value = evt.target.selectedItem.value;

        this.props.switchExample(value);
    }

    getItems() {
        let example;
        const items = [];

        Object.keys(this.props.examples).forEach((key) => {
            example = this.props.examples[key];

            items.push(<HAItem key={key} value={key}>{example.name}</HAItem>);
        });

        return items;
    }

    render() {
        const onChange = this.switchExample.bind(this),
            items = this.getItems();

        return (
            <HASelect label="Example" onChange={onChange} value={this.props.value}>
                {items}
            </HASelect>
        );
    }

}
