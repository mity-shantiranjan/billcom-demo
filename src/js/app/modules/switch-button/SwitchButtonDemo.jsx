import React from 'react';
import HASwitchButton from 'hui/react-components/HASwitchbutton';

export default class SwitchButtonDemo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HASwitchButton checked={false} labelOn="on" labelOff="off" name="sendNotification" label="Send me notifications" /><br />
                <HASwitchButton checked={true} labelOn="on" labelOff="off" name="payMe" label="Pay me" /><br />
                <HASwitchButton labelOn="on" name="autoPayment" labelOff="Disable" span="false" label="Auto-Payment" /><br />
                <HASwitchButton labelOn="on" name="creditCardPayment" labelOff="Disable" checked={true} label="Credit card payment" /><br />
                <HASwitchButton name="runPayroll" checked={true} label="Run Payroll"/><br />
            </div>
        );
    }
}
