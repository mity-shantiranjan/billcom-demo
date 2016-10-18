import React from "react";
import HACheckboxGroup from 'hui/react-components/HACheckboxGroup';
import HACheckbox from 'hui/react-components/HACheckbox';
import HAComboButton from 'hui/react-components/HAComboButton';
import InlineMessage from 'hui/inline-message'
import Label from 'hui/label'

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

    var rows = [], rowText = [];


    for (let item of items) {
      var itemValue = item + "Value";
      rows.push(
	<li>{item}</li>
      )
      if(Math.random()<.5) {
	rowText.push(
	  <strong>{item}</strong>
	)
      } else {
	rowText.push(
	  <span>{item}</span>
	)
      }

    }

    return (

      <div className="row bottom-separator">
	<div className="col-lg-12">
	  <h2>HACHeckboxGroup checkbox mutations dont work</h2>
	</div>
	<div className="col-lg-8">
	<ha-label> {rowText} </ha-label>
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
