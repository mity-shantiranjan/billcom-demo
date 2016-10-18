import React from "react";
import InlineMessage from "hui/inline-message"

export default class ComboButtonExamples extends React.Component {

    static get displayName() {
        return "InlineMessageExamples";
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
            return <li>{item}</li>;
        });

        return (
            <div className="row bottom-separator">
                <div className="col-lg-12">
                    <h2>HAInlineMessage HTML content structure mutations don't work</h2>
                </div>
                <div className="col-lg-8">
                    <ha-inline-message><div className="message-content">  {rows} </div></ha-inline-message>
                </div>
                <div className="col-lg-4">
                    <div className="widget">
                        <button className="ha-button ha-button-primary" onClick={onToggleCallback}>Toggle Fruit & Vegetables</button>
                    </div>
                </div>
                <div className="col-lg-12 expectation">
                    The list items in the inline message should be update.
                    <br/>
                </div>
                <div className="col-lg-12 issues">
                    <h4>Issues</h4>
                    Since the content is being moved and recreated. This leads to React's invariant violation as the parent and subing structures have changed.
                    <br/>
                    See the browser console for error details
                </div>
                <div className="col-lg-12 issues">
                    <h4>Applies to</h4>
                    HAInlineMessage<br/>
                    HAPageMessage<br/>
                    HAPaginatedMessages<br/>
                    HAInfoLink<br/>
                    <br/>
                </div>
            </div>
        );
    }
}
