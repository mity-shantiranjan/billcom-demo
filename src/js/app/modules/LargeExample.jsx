import React from 'react';
import HAAside from 'hui/react-components/HAAside';
import HACardDiscoveryLarge from 'hui/react-components/HACardDiscoveryLarge';
import HACheckbox from 'hui/react-components/HACheckbox';
import HACheckboxGroup from 'hui/react-components/HACheckboxGroup';
import HAComboButton from 'hui/react-components/HAComboButton';
import HAComboLink from 'hui/react-components/HAComboLink';
import HAFlowConfirmation from 'hui/react-components/HAFlowConfirmation';
import HAFlowLanding from 'hui/react-components/HAFlowLanding';
import HAFlowStep from 'hui/react-components/HAFlowStep';
import HAInfoLink from 'hui/react-components/HAInfoLink';
import HAItem from 'hui/react-components/HAItem';
import HALabel from 'hui/react-components/HALabel';
import HAMenuButton from 'hui/react-components/HAMenuButton';
import HAMessage from 'hui/react-components/HAMessage';
import HAPageMessage from 'hui/react-components/HAPageMessage';
import HAPortal from 'hui/react-components/HAPortal';
import HARadioButton from 'hui/react-components/HARadioButton';
import HARadioButtonGroup from 'hui/react-components/HARadioButtonGroup';
import HASelect from 'hui/react-components/HASelect';
import HAStackedPageMessages from 'hui/react-components/HAStackedPageMessages';
import HAStage from 'hui/react-components/HAStage';
import HAStepFlow from 'hui/react-components/HAStepFlow';
import HATab from 'hui/react-components/HATab';
import HATabs from 'hui/react-components/HATabs';
import HAText from 'hui/react-components/HAText';
import HATextField from 'hui/react-components/HATextField';
import HATextarea from 'hui/react-components/HATextarea';
import HAToastMessage from 'hui/react-components/HAToastMessage';
import HATooltip from 'hui/react-components/HATooltip';
import HADrawerLarge from 'hui/react-components/HADrawerLarge';
import HAFooter from 'hui/react-components/HAFooter';
import HASection from 'hui/react-components/HASection';
import HATrowser from 'hui/react-components/HATrowser';
import HATrowserFooter from 'hui/react-components/HATrowserFooter';
import HAFooterRight from 'hui/react-components/HAFooterRight';
import HAFooterCenter from 'hui/react-components/HAFooterCenter';
import HAModal from 'hui/react-components/HAModal';

export default class LargeExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          drawerShow: false,
          trowserShow: false,
          modalShow: false,
          sectionContent: Math.random(),
          asideContent: Math.random()
        };
    }

    toggleDrawerLarge = () => {
      this.setState({drawerShow: !this.state.drawerShow});
    };

    toggleTrowser = () => {
      this.setState({trowserShow: !this.state.trowserShow});
    };

    toggleModal = () => {
      this.setState({modalShow: !this.state.modalShow});
    };

    generateSectionContent = () => {
      this.setState({sectionContent: Math.random()});
    };

    generateAsideContent = () => {
      this.setState({asideContent: Math.random()});
    };

    renderDrawerAndTrowser() {
      if (!this.props.drawerExample) {
        return (
          <span>
          <h3>Drawer Large</h3>
          <HADrawerLarge
              show={this.state.drawerShow}
              backdrop={true}
              titleText="I AM A DRAWER TITLE!!!!!"
              onShow={() => console.log("showing drawer")}
              onClose={() => console.log("closing drawer")}
              onDismiss={() => {
                console.log("dismissing drawer");
                this.toggleDrawerLarge();
              }}>
              <HASection>
              {this.state.sectionContent}
              <button className="ha-button" onClick={this.generateSectionContent}>ToggleRender2</button>

              </HASection>
              <HAFooter>
                  <button className="ha-button ha-button-primary" onClick={this.toggleDrawerLarge}>Close</button>
              </HAFooter>
          </HADrawerLarge>
          <button className="ha-button ha-button-primary" onClick={() => this.toggleDrawerLarge()}>Show Drawer Large Example</button>
          <h3>Trowser</h3>
          <HATrowser
              show={this.state.trowserShow}
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
                this.toggleTrowser();
              }}>
              <HASection>
                  {this.state.sectionContent}
              </HASection>
              <HATrowserFooter>
                  <HAFooterCenter>
                    <button className="ha-button" onClick={this.generateSectionContent}>ToggleRender2</button>
                  </HAFooterCenter>
                  <HAFooterRight>
                    <button className="ha-button ha-button-primary" onClick={() => this.toggleTrowser()}>Close</button>
                  </HAFooterRight>
              </HATrowserFooter>
          </HATrowser>
          <button className="ha-button ha-button-primary" onClick={() => this.toggleTrowser()}>Show Trowser Large Example</button>
          </span>
        );
      }
    }

    render() {
        return (
            <div>
              {this.renderDrawerAndTrowser()}
              <h3>Modal</h3>
              <HAModal
                  show={this.state.modalShow}
                  type="endflow"
                  titleText="I AM A MODAL TITLE!!!!!"
                  dismissible={true}
                  size="large"
                  onShow={() => console.log('show was fired')}
                  onClose={() => console.log('close was fired')}
                  onDismiss={() => {
                    console.log('dismiss was fired');
                    this.toggleModal();
                  }}>
                  <HASection>
                      <div>{this.state.sectionContent}</div>
                  </HASection>
                  <HAAside>
                      <div>{this.state.asideContent}</div>
                      <button
                          className="ha-button ha-button-primary"
                          onClick={() => this.toggleModal()}>Close Modal</button>
                  </HAAside>
                  <HAFooter>
                      <button
                          className="ha-button ha-button-primary"
                          onClick={() => this.generateAsideContent()}>set side content</button>
                      <button
                          className="ha-button ha-button-primary"
                          onClick={() => this.generateSectionContent()}>set all content</button>
                  </HAFooter>
              </HAModal>
              <button className="ha-button ha-button-primary" onClick={this.toggleModal}>Show Modal Large Example</button>
              <h3>Button</h3>
              <button className="ha-button ha-button-primary" action="primary">Primary Button</button>
              <h3>Checkbox</h3>
              <HACheckboxGroup name="Checkbox Group" label="Checkbox Group">
                  <HACheckbox label="Enabled Checkbox" checked></HACheckbox>
                  <HACheckbox disabled checked></HACheckbox>
                  <HACheckbox disabled></HACheckbox>
                  <HACheckbox readonly></HACheckbox>
              </HACheckboxGroup>
              <h3>Combo Button</h3>
              <HAComboButton className="ha-button-primary" label="Create New" action="primary">
                  <HAItem value="AppleValue">Apple</HAItem>
                  <HAItem value="BananaValue">Banana</HAItem>
                  <HAItem value="BalloonValue">Balloon</HAItem>
                  <HAItem value="MelonValue">Melon</HAItem>
              </HAComboButton>
              <h3>Combo Link</h3>
              <HAComboLink label="Create New" action="primary">
                  <HAItem value="AppleValue">Apple</HAItem>
                  <HAItem value="BananaValue">Banana</HAItem>
                  <HAItem value="BalloonValue">Balloon</HAItem>
              </HAComboLink>
              <h3>Date Picker</h3>
              <ha-date-picker label="Date"></ha-date-picker>
              <h3>Flyout</h3>
              <button className="global-header-button" type="button"><i className="hi hi-create-lg"></i></button>
              <ha-flyout className="declarative" titleText="Flyout title">
                  <section>
                      <div>
                          <span>Lorem ipsum dolor sit amet</span>
                      </div>
                  </section>
              </ha-flyout>
              <h3>Inline Message</h3>
              <HATextField label="First Name"></HATextField>
              <ha-inline-message targetSelector="_previousSibling" trigger="focus" autoClose>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ha-inline-message>
              <h3>Simple List</h3>
              <ha-list>
                  <li>One</li>
                  <li>Two</li>
                  <li>Three</li>
              </ha-list>
              <h3>Menu Button</h3>
              <HAMenuButton className="ha-button-primary" label="Create New" action="primary">
                  <HAItem value="AppleValue">Apple</HAItem>
                  <HAItem value="BananaValue">Banana</HAItem>
                  <HAItem value="BalloonValue" disabled>Balloon</HAItem>
                  <HAItem value="MelonValue">Melon</HAItem>
              </HAMenuButton>
              <h3>Money Bar</h3>
              <ha-money-bar>
                  <ha-money-bar-segment titleTextBold="50" titleText="Unbilled">
                      <ha-money-bar-cell className="mbDarkBlue" primaryText="$50.00" secondaryText="2 ESTIMATE"></ha-money-bar-cell>
                      <ha-money-bar-cell className="mbLightBlue" primaryText="$50.00" secondaryText="2 UNBILLED ACTIVITY"></ha-money-bar-cell>
                  </ha-money-bar-segment>
                  <ha-money-bar-segment titleTextBold="50" titleText="Unpaid">
                      <ha-money-bar-cell className="mbOrange outlay" primaryText="$50.00" secondaryText="2 OPEN INVOICES"></ha-money-bar-cell>
                      <ha-money-bar-cell className="mbRed inlay" primaryText="$50.00" secondaryText="2 OVERDUE"></ha-money-bar-cell>
                  </ha-money-bar-segment>
                  <ha-money-bar-segment titleTextBold="50" titleText="Paid" size="1">
                      <ha-money-bar-cell className="mbGreen" primaryText="$50.00" secondaryText="2 PAID LAST 30 DAYS"></ha-money-bar-cell>
                  </ha-money-bar-segment>
              </ha-money-bar>
              <h3>Page Message</h3>
              <HAPageMessage titleText="Alert Title" type="error" dismissible={false}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage titleText="Warn Title" type="warn" dismissible={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage titleText="Info Title" type="info" dismissible={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage titleText="Discovery Title" type="discovery" dismissible={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage type="info" dismissible={true}>
                  No titleText. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage type="info" dismissible={true}>
                  <span>Using html inside the message with <a>links</a> no titleText</span>
              </HAPageMessage>
              <HAPageMessage titleText="With Title" type="info" dismissible={true}>
                  <span>Using html inside the message with <a>links</a> with titleText</span>
              </HAPageMessage>
              <h3>Paginated Message</h3>
              <ha-paginated-messages dismissible={false}>
                  <ha-paginated-message titleText="Your trial expires in 7 days!" dismissible>
                      <span>Feel free to keep testing QuickBooks. <a href="#">Subscribe now and save 20%</a></span>
                  </ha-paginated-message>
                  <ha-paginated-message titleText="Your session is about to expire!" dismissible>
                      <span>Please refresh the page</span>
                  </ha-paginated-message>
                  <ha-paginated-message titleText="This is an alert" dismissible>
                      <span>This is an alert message</span>
                  </ha-paginated-message>
              </ha-paginated-messages>
              <h3>Radio Button</h3>
              <HARadioButtonGroup>
                  <HARadioButton label="Radio 1" value="1"></HARadioButton>
                  <HARadioButton label="Radio 2" value="2"></HARadioButton>
                  <HARadioButton label="Radio 3" value="3"></HARadioButton>
              </HARadioButtonGroup>
              <h3>Segmented Button</h3>
              <ha-segmented-button>
                  <button value="credit" title="Credit">Credit / Debit</button>
                  <button value="cash" title="Cash">Cash</button>
                  <button value="check" title="Check">Check</button>
              </ha-segmented-button>
              <h3>Select</h3>
              <HASelect label="Some Label" addNew="true" placeholder="Choose an item">
                  <HAItem value="AppleValue">Apple</HAItem>
                  <HAItem value="BananaValue">Banana</HAItem>
                  <HAItem value="BalloonValue">Balloon</HAItem>
                  <HAItem value="MelonValue">Melon</HAItem>
              </HASelect>
              <h3>Select Type Ahead</h3>
              <HASelect-type-ahead data-attach-point="trowserSelect" label="Some Label" placeholder="Choose an item">
              </HASelect-type-ahead>
              <h3>Stacked Page Message</h3>
              <HAStackedPageMessages>
                  <HAPageMessage titleText="Info Title" type="error" dismissible={false}>
                      The contents of this message should focus on what the user needs to do to fix the
                      error instead of just stating what went wrong. Fields related to this error should be highlighted and accomplanied by the appropiate inline error message.
                  </HAPageMessage>
                  <HAPageMessage titleText="Info Title" type="warn">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </HAPageMessage>
                  <HAPageMessage titleText="Info Title" type="info" dismissible>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </HAPageMessage>
              </HAStackedPageMessages>
              <h3>Status Badge</h3>
              <div className="separator">
                <i className="ha-badge ha-error" aria-label="error"></i>
              </div>
              <div className="separator">
                <i className="ha-badge ha-confirm" aria-label="confirm"></i>
              </div>
              <h3>Switch Button</h3>
              <ha-switch-button checked="true" name="payMe" label="Pay me"></ha-switch-button><br />
              <h3>Textarea</h3>
              <ha-textarea label="Name"></ha-textarea>
              <h3>Textfield</h3>
              <HATextField label="Name" data-attach-point="textfield"></HATextField>
              <ha-tooltip targetselector="[data-attach-point=textfield]" message="Tooltip Info"></ha-tooltip>
              <h3>Textfield Type Ahead</h3>
              <ha-textfield-type-ahead data-attach-point="trowserTypeAhead" placeholder="Choose an item" label="Some Label">
              </ha-textfield-type-ahead>
              <h3>Video</h3>
              <ha-video userId="harmony-gallery-test-user" url="https://www.youtube.com/embed/48QBRQdyRmU"></ha-video>
              <h3>Video Launcher</h3>
              <ha-video-launcher url="https://www.youtube.com/embed/48QBRQdyRmU"></ha-video-launcher>
            </div>
        );
    }
}
