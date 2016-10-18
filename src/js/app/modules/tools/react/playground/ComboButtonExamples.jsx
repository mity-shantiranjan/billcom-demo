import React from "react";
import HAItem from "hui/react-components/HAItem";
import HAComboButton from "hui/react-components/HAComboButton";
import HAComboLink from "hui/react-components/HAComboLink";
import HAMenuButton from "hui/react-components/HAMenuButton";
import HASelect from "hui/react-components/HASelect";

export default class ComboButtonExamples extends React.Component {

    static get displayName() {
        return "ComboButtonExamples";
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
        let eventLog, onToggleCallback, items, rows;

        eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        onToggleCallback = this._onToggleCallback.bind(this);
        items = this.state.showFruits ? this._fruits : this._vegetables;

        rows = items.map((item, i)=> {
            let itemValue = item + "Value";
            return <HAItem value={itemValue}>{item}</HAItem>
        });

        return (
            <div className="row bottom-separator">
                <div className="col-lg-12">
                    <h2>HAComboButton data updates don't work</h2>
                </div>
                <div className="col-lg-8">
                    <HAComboButton placeholder="Choose a method" label="Create New" className="ha-button-primary" onClick={eventLog} onSelect={eventLog} onItemsShow={eventLog} onItemsClose={eventLog}>
                        {rows}
                    </HAComboButton>
                </div>
                <div className="col-lg-8">
                    <HAComboLink placeholder="Choose a method" label="Create New" onClick={eventLog} onSelect={eventLog} onItemsShow={eventLog} onItemsClose={eventLog}>
                        {rows}
                    </HAComboLink>
                </div>
                <div className="col-lg-8">
                    <HAMenuButton placeholder="Choose a method" label="Create New" className="ha-button-primary" onClick={eventLog} onSelect={eventLog} onItemsShow={eventLog} onItemsClose={eventLog}>
                        {rows}
                    </HAMenuButton>
                </div>
                <div className="col-lg-8">
                    <HASelect placeholder="Choose a method" label="Create New" className="ha-button-primary" onClick={eventLog} onSelect={eventLog} onItemsShow={eventLog} onItemsClose={eventLog}>
                        {rows}
                    </HASelect>
                </div>
                <div className="col-lg-4">
                    <div className="widget">
                        <button className="ha-button ha-button-primary" onClick={onToggleCallback}>Toggle Fruit & Vegetables</button>
                    </div>
                </div>
                <div className="col-lg-12 expectation">
                  The content of the dropdown should change from fruits to vegetables.
                  <br/>
                </div>
                <div className="col-lg-12 issues">
                    <h4>Issues</h4>
                    ha-item labels are being set on render and on updates they dont sync with the changes<br/>
                    pop over menu that shows the items are not getting updates when the items get updated
                    <br/>
                    When using React Select, in HAItem always specify the label attribute
                </div>
                <div className="col-lg-12 issues">
                    <h4>Applies to</h4>
                    Combo Button<br/>
                    Combo Link<br/>
                    Select <br/>
                    SelectTypeAhead <br/>
                    <br/>
                </div>
            </div>
        );
    }
}
