import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";
import CustomRowExpansionContent from "./common/CustomRowExpansionContent";
import HALabel from "hui/react-components/HALabel";

export default class RowExpansion extends Example {
    static get displayName() {
        return "RowExpansion";
    }

    constructor(props) {
        super(props);

        this.state = {
            options: {
                rowsPerPage: 50,
                //Settings for custom row expansion
                //Provide an array of render modes, and allow the table to use a specific one
                renderModes: [{
                    renderMode: "defaultExpandableRow",
                    renderer: this.getDefaultRowExpansionArgs()
                }],
                //The current render mode to use
                renderMode: "defaultExpandableRow"
            }
        };
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import RequestMemory from "dstore/RequestMemory";
// Load data from remote JSON file
// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
const collection = new RequestMemory({
        target: "js/app/modules/table/hof-batting.json"
    }),
    columns = {
      let onRenderCell = () => {
          // Return a React Element to add to the cell
          return (
              <div className="control">
                <button className="no-button hi hi-settings" aria-label="Show row expansion"></button>
              </div>
          );
        };

        // To keep the React debugging tools happy in dev mode
        onRenderCell.displayName = "ActionButton";

        return {
            first: {
                label: 'First Name',
                sortable: false
            },
            last: 'Last Name',
            height: 'Height',
            action: {                      // Derived column
                  label: "Action",
                  onRenderCell: onRenderCell, // Custom renderer
                  sortable: false             // It's custom so no sorting
              }
          };
    },

    //row render arguments for default render mode
    getDefaultRowExpansionArgs() {
        return {
            //optional css selector
            activatorSelector: ".control .hi-settings",
            //optional expansion height property
            expansionHeight: 80
        };
    },

    //row render arguments for custom render mode
    getCustomRowExpansionArgs() {
      let onRenderRowExpansionContent = (props) => {
        // Return a React Element to add to the row expansion
        // You can fill in any kind of JSX you want here.
        // @see CustomRowExpansionContent.jsx
        return <CustomRowExpansionContent object={props.object} hideExpansion={props.hideExpansion} />;
      };

      //To keep the React debugging tools happy in dev mode
      onRenderRowExpansionContent.displayName = "CustomRowExpansionContent";

      //Row expansion content contract
      onRenderRowExpansionContent.propTypes = {
          object: React.PropTypes.object, //data object of the row
          hideExpansion: React.PropTypes.func //callback for hiding the expansion
      };

      return {
        //optional css selector
        activatorSelector: ".control .hi-settings",
        //function that renders the content of the expanded section
        onRenderRowExpansionContent: onRenderRowExpansionContent
      };
    },

    //handle addition of a custom render mode
    onCustomRenderModeAdd() {
        let newOptions = Object.assign({}, this.state.options),
            newRenderModes = newOptions.renderModes.concat({
                renderMode: "customExpandableRow",
                renderer: this.getCustomRowExpansionArgs()
            });
        newOptions.renderModes = newRenderModes;
        //switch the render mode to custom
        newOptions.currentRenderMode = "customExpandableRow";
        this.setState({options: newOptions});
    },

    //handle removal of a custom render mode
    onCustomRenderModeRemove() {
        let newOptions = Object.assign({}, this.state.options),
            newRenderModes = null;
        if (newOptions.renderModes) {
            newRenderModes = newOptions.renderModes.filter(renderModeItem => {
                return renderModeItem.renderMode !== "customExpandableRow";
            });
        }
        newOptions.renderModes = newRenderModes;
        //switch the render mode to default
        newOptions.currentRenderMode = "defaultExpandableRow";
        this.setState({options: newOptions});
    },

    // State is being used for these options. See the full example for the constructor.
    options = {
        rowsPerPage: 50,
        //Settings for custom row expansion
        //Provide an array of render modes, and allow the table to use a specific one
        renderModes: [{
            renderMode: "defaultExpandableRow",
            renderer: this.getDefaultRowExpansionArgs()
        }],
        //The current render mode to use
        currentRenderMode: "defaultExpandableRow"
    }
};

ReactDOM.render(<div>
  <div>
    <HALabel>Current render mode is:{this.state.options.currentRenderMode}</HALabel>
  </div>
  <div>
    <button className="ha-button" onClick={onCustomRenderModeAdd}>Add custom render mode</button>
    <button className="ha-button" onClick={onCustomRenderModeRemove}>Remove custom render mode</button>
  </div>
  <Table collection={collection} columns={columns} options={options} />
</div>, document.body);`;
    }

    getCollection() {
        return new RequestMemory({
            target: "js/app/modules/table/hof-batting.json"
        });
    }

    getColumns() {
        const onRenderCell = () => {
            // Return a React Element to add to the cell
            return (
                <div className="control">
                    <button className="no-button hi hi-settings" aria-label="Show row expansion"></button>
                </div>
            );
        };

        // To keep the React debugging tools happy in dev mode
        onRenderCell.displayName = "ActionButton";

        return {
            first: {
                label: "First Name",
                sortable: false
            },
            last: "Last Name",
            height: "Height",
            action: {                      // Derived column
                label: "Action",
                onRenderCell: onRenderCell, // Custom renderer
                sortable: false             // It's custom so no sorting
            }
        };
    }

    //row render arguments for default render mode
    getDefaultRowExpansionArgs() {
        return {
            //optional css selector
            activatorSelector: ".control .hi-settings",
            //optional expansion height property
            expansionHeight: 80
        };
    }

    //row render arguments for custom render mode
    getCustomRowExpansionArgs() {
        const onRenderRowExpansionContent = (props) => {
            // Return a React Element to add to the row expansion
            // You can fill in any kind of JSX you want here.
            // @see CustomRowExpansionContent.jsx
            return <CustomRowExpansionContent object={props.object} hideExpansion={props.hideExpansion} />;
        };

        //To keep the React debugging tools happy in dev mode
        onRenderRowExpansionContent.displayName = "CustomRowExpansionContent";

        //Row expansion content contract
        onRenderRowExpansionContent.propTypes = {
            object: React.PropTypes.object, //data object of the row
            hideExpansion: React.PropTypes.func //callback for hiding the expansion
        };

        return {
            //optional css selector
            activatorSelector: ".control .hi-settings",
            //function that renders the content of the expanded section
            onRenderRowExpansionContent: onRenderRowExpansionContent
        };
    }

    //handle addition of a custom render mode
    onCustomRenderModeAdd() {
        const newOptions = Object.assign({}, this.state.options),
            newRenderModes = newOptions.renderModes.concat({
                renderMode: "customExpandableRow",
                renderer: this.getCustomRowExpansionArgs()
            });
        newOptions.renderModes = newRenderModes;
        //switch the render mode to custom
        newOptions.renderMode = "customExpandableRow";
        this.setState({options: newOptions});
    }

    //handle removal of a custom render mode
    onCustomRenderModeRemove() {
        const newOptions = Object.assign({}, this.state.options);
        let   newRenderModes = null;
        if (newOptions.renderModes) {
            newRenderModes = newOptions.renderModes.filter(renderModeItem => {
                return renderModeItem.renderMode !== "customExpandableRow";
            });
        }
        newOptions.renderModes = newRenderModes;
        //switch the render mode to default
        newOptions.renderMode = "defaultExpandableRow";
        this.setState({options: newOptions});
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.state.options,
            onCustomRenderModeAdd = this.onCustomRenderModeAdd.bind(this),
            onCustomRenderModeRemove = this.onCustomRenderModeRemove.bind(this);

        return (
            <div>
                <div>
                    <HALabel>Current render mode is:  {this.state.options.renderMode}</HALabel>
                </div>
                <div>
                    <button className="ha-button" onClick={onCustomRenderModeAdd}>Add custom render mode</button>
                    <button className="ha-button" onClick={onCustomRenderModeRemove}>Remove custom render mode</button>
                </div>
                <Table collection={collection} columns={columns} options={options} />
            </div>
        );
    }
}
