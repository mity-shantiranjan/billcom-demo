import React from "react";
import HATextField from  "hui/react-components/HATextField";
import HALabel from "hui/react-components/HALabel";

export default class CustomRowExpansionContent extends React.Component {

    static get displayName() {
        return "CustomRowExpansionContent";
    }

    //Row expansion content contract
    static get propTypes() {
        return {
            object: React.PropTypes.object.isRequired, //data object of the row
            hideExpansion: React.PropTypes.func //callback for hiding the expansion
        };
    }

    render() {
        return (
            <div>
                <div>
                    <HATextField label="First Name" value={this.props.object.first}/>
                </div>
                <div>
                    <HALabel>Last Name:{this.props.object.last}</HALabel>
                </div>
                <div>
                    <HALabel>Height:{this.props.object.height}</HALabel>
                </div>
            </div>
        );
    }
}
