import React from 'react';
import HATrowser from 'hui/react-components/HATrowser';
import HATrowserFooter from 'hui/react-components/HATrowserFooter';
import HAFooterCenter from 'hui/react-components/HAFooterCenter';
import HAFooterRight from 'hui/react-components/HAFooterRight';
import HASection from 'hui/react-components/HASection';
import LargeExample from '../LargeExample.react';

export default class TrowserExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTrowser: false,
            showTrowserLargeExample: false,
            sectionContent: Math.random(),
            asideContent: Math.random()
        };
    }

    render() {
        return (
            <div>
                <HATrowser
                    show={this.state.showTrowser}
                    infoText="endflow"
                    titleText="I AM A TROWSER TITLE!!!!!"
                    settings={true}
                    help={true}
                    history={true}
                    dismissible={true}
                    autofocus={true}
                    onShow={() => console.log('show was fired')}
                    onClose={() => console.log('close was fired')}
                    onDismiss={() => {
                      console.log('dismiss was fired');
                      this._closeTrowser();
                    }}>
                      <HASection>
                          <div>{this.state.sectionContent}</div>
                      </HASection>
                      <HATrowserFooter>
                          <HAFooterCenter>
                            <button className="ha-button ha-button-primary" onClick={() => this._changeContent()} >set all content</button>
                          </HAFooterCenter>
                          <HAFooterRight>
                            <button className="ha-button ha-button-primary" onClick={() => this._closeTrowser()}>Close</button>
                          </HAFooterRight>
                      </HATrowserFooter>
                </HATrowser>
                <HATrowser
                    show={this.state.showTrowserLargeExample}
                    infoText="endflow"
                    titleText="I AM A TROWSER TITLE!!!!!"
                    settings={true}
                    help={true}
                    history={false}
                    dismissible={true}
                    autofocus={true}
                    onShow={() => console.log('show was fired')}
                    onClose={() => console.log('close was fired')}
                    onDismiss={() => {
                      console.log('dismiss was fired');
                      this._toggleTrowserLargeExample();
                    }}>
                      <HASection>
                          <LargeExample />
                      </HASection>
                      <HATrowserFooter>
                          <HAFooterRight>
                            <button className="ha-button ha-button-primary" onClick={() => this._toggleTrowserLargeExample()}>Close</button>
                          </HAFooterRight>
                      </HATrowserFooter>
                </HATrowser>
                <button className="ha-button ha-button-primary" onClick={() => this._toggleTrowserLargeExample()}>Show Trowser Large Example</button>
                <button className="ha-button ha-button-primary" onClick={() => this._showTrowser()}>Show Trowser</button>
            </div>
        );
    }

    _changeContent() {
        this.setState({
            sectionContent: Math.random(),
            asideContent: Math.random()
        });
    }

    _changeAsideContent() {
        this.setState({
            asideContent: Math.random()
        });
    }

    _showTrowser() {
        this.setState({
            showTrowser: true
        });
    }

    _closeTrowser() {
        this.setState({
            showTrowser: false
        });
    }

    _toggleTrowserLargeExample() {
        this.setState({
            showTrowserLargeExample: !this.state.showTrowserLargeExample
        });
    }
}
