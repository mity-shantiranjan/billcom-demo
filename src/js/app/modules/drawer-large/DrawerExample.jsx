import React from 'react';
import HADrawerLarge from 'hui/react-components/HADrawerLarge';
import HAFooter from 'hui/react-components/HAFooter';
import HASection from 'hui/react-components/HASection';
import HAAside from 'hui/react-components/HAAside';
import HATextField from 'hui/react-components/HATextField';
import HATextarea from 'hui/react-components/HATextarea';
import LargeExample from '../LargeExample.react';

export default class DrawerExample extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            showDrawerBackdrop: false,
            showDrawerWithoutBackdrop: false,
            showDrawerBackdropLarge: false,
            changeFieldSecond: true,
            changeFieldFirst: true
        };
    }

    render() {
        return (
            <div>
                <HADrawerLarge
                    show={this.state.showDrawerBackdrop}
                    backdrop={true}
                    titleText="I AM A DRAWER TITLE!!!!!"
                    onShow={() => console.log("showing drawer")}
                    onClose={() => console.log("closing drawer")}
                    onDismiss={() => {
                      console.log("dismissing drawer");
                      this._toggleDrawerLarge();
                    }}>
                    <HASection>
                    {
                        (this.state.changeFieldFirst == true) ?
                        <HATextField
                        label="If Condition"
                        placeholder="Your name">
                        </HATextField>
                        : <HATextField
                        label="If Condition"
                        placeholder="Your name toggled">
                        </HATextField>
                    }
                    <button className="ha-button" onClick={this.onToggleDrawerRenderFirst}>ToggleRender2</button>

                    {
                        (this.state.changeFieldSecond == true) ?
                        <HATextField
                        label="If Condition"
                        placeholder="Your name">
                        </HATextField>
                        : <HATextarea label="Name" placeholder="Your Name"></HATextarea>
                    }

                    <button className="ha-button" onClick={this.onToggleDrawerRenderSecond}>ToggleRender2</button>

                    </HASection>
                    <HAFooter>
                        <button className="ha-button ha-button-primary" onClick={this._toggleDrawerLarge}>Close</button>
                    </HAFooter>
                </HADrawerLarge>
                <HADrawerLarge
                    show={this.state.showDrawerWithoutBackdrop}
                    backdrop={false}
                    titleText="I AM A DRAWER TITLE!!!!!"
                    onShow={() => console.log("showing drawer")}
                    onClose={() => console.log("closing drawer")}
                    onDismiss={() => {
                      console.log("dismissing drawer");
                      this._toggleDrawerLargeWithoutBackdrop();
                    }}>
                    <HASection>
                    {
                        (this.state.changeFieldFirst == true) ?
                        <HATextField
                        label="If Condition"
                        placeholder="Your name">
                        </HATextField>
                        : <HATextField
                        label="If Condition"
                        placeholder="Your name toggled">
                        </HATextField>
                    }
                    <button className="ha-button" onClick={this.onToggleDrawerRenderFirst}>ToggleRender2</button>

                    {
                        (this.state.changeFieldSecond == true) ?
                        <HATextField
                        label="If Condition"
                        placeholder="Your name">
                        </HATextField>
                        : <HATextarea label="Name" placeholder="Your Name"></HATextarea>
                    }

                    <button className="ha-button" onClick={this.onToggleDrawerRenderSecond}>ToggleRender2</button>

                    </HASection>
                    <HAFooter>
                        <button className="ha-button ha-button-primary" onClick={this._toggleDrawerLargeWithoutBackdrop}>Close</button>
                    </HAFooter>
                </HADrawerLarge>
                <HADrawerLarge
                    show={this.state.showDrawerBackdropLarge}
                    backdrop={true}
                    titleText="I AM A DRAWER TITLE!!!!!"
                    onShow={() => console.log("showing drawer")}
                    onClose={() => console.log("closing drawer")}
                    onDismiss={() => {
                      console.log("dismissing drawer");
                      this._toggleDrawerLargeExample();
                    }}>
                    <HASection>
                      <LargeExample drawerExample={true}/>
                    </HASection>
                    <HAFooter>
                        <button className="ha-button ha-button-primary" onClick={this._toggleDrawerLargeExample}>Close</button>
                    </HAFooter>
                </HADrawerLarge>
                <button className="ha-button" onClick={this._toggleDrawerLargeExample}>Show Drawer Large Examples</button>
                <button className="ha-button" onClick={this._toggleDrawerLarge}>Show Drawer Large</button>
                <button className="ha-button" onClick={this._toggleDrawerLargeWithoutBackdrop}>Show Drawer Large Without Overlay</button>
            </div>
        );
    }

    _toggleDrawerLarge = () => {
        this.setState({showDrawerBackdrop: !this.state.showDrawerBackdrop});
    };

    _toggleDrawerLargeWithoutBackdrop = () => {
        this.setState({showDrawerWithoutBackdrop: !this.state.showDrawerWithoutBackdrop});
    };

    _toggleDrawerLargeExample = () => {
        this.setState({showDrawerBackdropLarge: !this.state.showDrawerBackdropLarge});
    };

    onToggleDrawerRenderSecond = () => {
        this.setState({changeFieldSecond: !this.state.changeFieldSecond});
    };

    onToggleDrawerRenderFirst = () => {
        this.setState({changeFieldFirst: !this.state.changeFieldFirst});
    };
}
