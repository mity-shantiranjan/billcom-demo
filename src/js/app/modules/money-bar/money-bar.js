define([
    'hui/money-bar'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var moneyBarComponent = document.createElement('ha-money-bar'),
                mbSeg1 = document.createElement('ha-money-bar-segment'),
                mbSeg2 = document.createElement('ha-money-bar-segment'),
                mbSeg3 = document.createElement('ha-money-bar-segment'),
                mbcell1 = document.createElement('ha-money-bar-cell'),
                mbcell2 = document.createElement('ha-money-bar-cell'),
                mbcell3 = document.createElement('ha-money-bar-cell'),
                mbcell4 = document.createElement('ha-money-bar-cell'),
                mbcell5 = document.createElement('ha-money-bar-cell');

            mbcell1.primaryText = '$50.00';
            mbcell1.secondaryText = '2 ESTIMATES';
            mbcell1.classList.add('mbDarkBlue');

            mbcell2.primaryText = '$500.00';
            mbcell2.secondaryText = '20 UNBILLED ACTIVITY';
            mbcell2.classList.add('mbLightBlue');

            mbcell3.primaryText = '$100.00';
            mbcell3.secondaryText = '40 OPEN INVOICES';
            mbcell3.classList.add('mbOrange');
            mbcell3.classList.add('outlay');

            mbcell4.primaryText = '$500.00';
            mbcell4.secondaryText = '2 OVERDUE INVOICES';
            mbcell4.classList.add('mbRed');
            mbcell4.classList.add('inlay');

            mbcell5.primaryText = '$150.00';
            mbcell5.secondaryText = '2 PAID LAST 30 DAYS';
            mbcell5.classList.add('mbGreen');

            mbSeg1.titleTextBold = '22';
            mbSeg1.titleText = 'Unbilled';
            mbSeg1.cells = [mbcell1, mbcell2];

            mbSeg2.titleTextBold = '42';
            mbSeg2.titleText = 'Unpaid';
            mbSeg2.cells = [mbcell3, mbcell4];

            mbSeg3.titleTextBold = '2';
            mbSeg3.titleText = 'Paid';
            mbSeg3.cells = [mbcell5];
            mbSeg3.size = '1';

            moneyBarComponent.segments = [mbSeg1, mbSeg2, mbSeg3];

            placeToAppend.appendChild(moneyBarComponent);
        }
    };
});
