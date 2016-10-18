import React from 'react';
import HAModal from 'hui/react-components/HAModal';
import HAFooter from 'hui/react-components/HAFooter';
import HASection from 'hui/react-components/HASection';
import HAAside from 'hui/react-components/HAAside';
import LargeExample from '../LargeExample.react';

export default class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            sectionContent: Math.random(),
            asideContent: Math.random()
        };
    }

    render() {
        return (
            <div>
                <HAModal
                    show={this.state.showModal}
                    type="endflow"
                    titleText="I AM A MODAL TITLE!!!!!"
                    dismissible={true}
                    size="large"
                    onShow={() => console.log('show was fired')}
                    onClose={() => console.log('close was fired')}
                    onDismiss={() => {
                      console.log('dismiss was fired');
                      this._closeModal();
                    }}>
                    <HASection>
                        <div>{this.state.sectionContent}</div>
                    </HASection>
                    <HAAside>
                        <div>{this.state.asideContent}</div>
                        <button
                            className="ha-button ha-button-primary"
                            onClick={() => this._closeModal()}>Close Modal</button>
                    </HAAside>
                    <HAFooter>
                        <button
                            className="ha-button ha-button-primary"
                            onClick={() => this._changeAsideContent()}>set side content</button>
                        <button
                            className="ha-button ha-button-primary"
                            onClick={() => this._changeContent()}>set all content</button>
                    </HAFooter>
                </HAModal>
                <button className="ha-button ha-button-primary" onClick={() => this._showModal()}>Show Modal</button>
            </div>
        );
    }

    _changeContent() {
        this.setState({sectionContent: Math.random(), asideContent: Math.random()});
    }

    _changeAsideContent() {
        this.setState({asideContent: Math.random()});
    }

    _showModal() {
        this.setState({showModal: true});
    }

    _closeModal() {
        this.setState({showModal: false});
    }
}
