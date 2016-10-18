import React from "react";
import HACheckboxGroup from "hui/react-components/HACheckboxGroup";
import HACheckbox from "hui/react-components/HACheckbox";
import HARadioButtonGroup from "hui/react-components/HARadioButtonGroup";
import HARadioButton from "hui/react-components/HARadioButton";

export default class ComboButtonExamples extends React.Component {

    static get displayName() {
        return "RadioButtonCheckboxGroupExamples";
    }

    constructor(props) {
        super(props);

        this.state = {
            showFruits: true
        };

        this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
        this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
    }

    _onToggleCallback() {
        this.setState({
            showFruits: !this.state.showFruits
        });
    }

    render() {
        let eventLog, onToggleCallback, items, checkboxRows, radioButtonRows;

        eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        onToggleCallback = this._onToggleCallback.bind(this);
        items = this.state.showFruits ? this._fruits : this._vegetables;

        checkboxRows = items.map((item, i)=> {
            let itemValue = item + "Value";
            return <HACheckbox label={item} value={itemValue}></HACheckbox>
        });

        radioButtonRows = items.map((item, i)=> {
            let itemValue = item + "Value";
            return <HARadioButton label={item} value={itemValue}></HARadioButton>
        });

        return (
            <div className="row bottom-separator">
                <div className="col-lg-12">
                    <h2>HACheckboxGroup and HARadioButtonGroup mutations don't work</h2>
                </div>
                <div className="col-lg-8">
                    <HACheckboxGroup name="Checkbox Group" label="Checkbox Group">
                        {checkboxRows}
                    </HACheckboxGroup>
                </div>
                <div className="col-lg-8">
                    <HARadioButtonGroup name="RadioButton Group" label="RadioButton Group">
                        {radioButtonRows}
                    </HARadioButtonGroup>
                </div>
                <div className="col-lg-4">
                    <div className="widget">
                        <button className="ha-button ha-button-primary" onClick={onToggleCallback}>Toggle Fruit & Vegetables</button>
                    </div>
                </div>
                <div className="col-lg-12 expectation">
                    The content of the checkboxes should change from fruits to vegetables.
                    <br/>
                </div>
                <div className="col-lg-12 issues">
                    <h4>Issues</h4>
                    new checkbox values are being set on render and on updates they dont sync with the changes<br/>
                    You can see that Kiwi should be deleted but it does not.
                    <br/>
                    See the browser console for errors as well
                </div>
                <div className="col-lg-12 issues">
                    <h4>Applies to</h4>
                    CheckboxGroup<br/>
                    RadioButtonGroup<br/>
                    <br/>
                </div>
            </div>
        );
    }
}
