import React from "react";
import HACheckboxGroup from 'hui/react-components/HACheckboxGroup';
import HACheckbox from 'hui/react-components/HACheckbox';
import HAComboButton from 'hui/react-components/HAComboButton';
import HATabs from 'hui/react-components/HATabs';
import HATab from 'hui/react-components/HATab';

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
    })
  }

  render() {

    var eventLog = function(e) {
      console.log(`${e.target.tagName} ${e.type} fired`);
    };
    var onToggleCallback = this._onToggleCallback.bind(this);
    var items = this.state.showFruits
      ? this._fruits
      : this._vegetables;

    var rows = [], rowValues="";

    for (let item of items) {
      var itemValue = item + "Value";
      rows.push(
	<HACheckbox label={item} value={itemValue}></HACheckbox>
      )
      rowValues = rowValues + " " + item;
    }

    return (

      <div className="row bottom-separator">
	<div className="col-lg-12">
	  <h2>HATabs content changes dont work</h2>
	</div>
	<div className="col-lg-8">
	  <HATabs>
	    <HATab titleText="This Works">
	    <div>
	    <input type='text' value={rowValues}/>
	    </div>
	    </HATab>
	  </HATabs>
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
	  On change the content of the text field inside the tab should change. but it doesnt.
	  The ha-tabs children that were specified by the developer are moved into a sibling of ha-tabs and this causes failures
	  <br/>
	  See the browser console for errors as well. It throws an invariant violation
	</div>
	<div className="col-lg-12 issues">
	  <h4>Applies to</h4>
	  Tabs<br/>
	  <br/>
	</div>

      </div>

    );
  }

}
