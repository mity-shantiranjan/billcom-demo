define([
    'hui/flyout'
], function() {
    'use strict';

    return {
        createStructure: function(h3, flyout, placeToAppend) {
            var h3Elem = document.createElement('h3'),
                nav = document.createElement('nav'),
                ul = document.createElement('ul'),
                li1 = document.createElement('li'),
                li2 = document.createElement('li'),
                li3 = document.createElement('li'),
                button1 = document.createElement('button'),
                button2 = document.createElement('button'),
                button3 = document.createElement('button');
            h3Elem = document.createElement('h3');
            h3Elem.appendChild(document.createTextNode(h3));
            placeToAppend.appendChild(h3Elem);

            nav.className = 'global-header';

            ul.className = 'list-unstyled';
            nav.appendChild(ul);

            button1.className = 'global-header-button';
            li1.appendChild(button1);
            ul.appendChild(li1);

            button2.className = 'global-header-button';
            li2.appendChild(button2);
            li2.appendChild(flyout);
            ul.appendChild(li2);

            button3.className = 'global-header-button';
            li3.appendChild(button3);
            ul.appendChild(li3);

            placeToAppend.appendChild(nav);
        },

        render: function(placeToAppend) {
            var resFlyout = document.createElement('ha-flyout'),
                nonResFlyout = document.createElement('ha-flyout'),
                sPFlyout = document.createElement('ha-flyout'),
                div = document.createElement('div'),
                sPDiv1 = document.createElement('div'),
                sPDiv2 = document.createElement('div'),
                lessDiv = document.createElement('div'),
                moreDiv = document.createElement('div'),
                button1 = document.createElement('button'),
                button2 = document.createElement('button'),
                button3 = document.createElement('button'),
                menu1 = document.createElement('ha-menu'),
                menu2 = document.createElement('ha-menu'),
                menu3 = document.createElement('ha-menu'),
                menu4 = document.createElement('ha-menu'),
                menu5 = document.createElement('ha-menu'),
                menuSP1 = document.createElement('ha-menu'),
                menuSP2 = document.createElement('ha-menu'),
                menuSP3 = document.createElement('ha-menu'),
                menuItem11 = document.createElement('ha-menu-item'),
                menuItem12 = document.createElement('ha-menu-item'),
                menuItem21 = document.createElement('ha-menu-item'),
                menuItem22 = document.createElement('ha-menu-item'),
                menuItem23 = document.createElement('ha-menu-item'),
                menuItem24 = document.createElement('ha-menu-item'),
                menuItem25 = document.createElement('ha-menu-item'),
                menuItem26 = document.createElement('ha-menu-item'),
                menuItem27 = document.createElement('ha-menu-item'),
                menuItem28 = document.createElement('ha-menu-item'),
                menuItem31 = document.createElement('ha-menu-item'),
                menuItem32 = document.createElement('ha-menu-item'),
                menuItem33 = document.createElement('ha-menu-item'),
                menuItem34 = document.createElement('ha-menu-item'),
                menuItem35 = document.createElement('ha-menu-item'),
                menuItem36 = document.createElement('ha-menu-item'),
                menuItem37 = document.createElement('ha-menu-item'),
                menuItem38 = document.createElement('ha-menu-item'),
                menuItem41 = document.createElement('ha-menu-item'),
                menuItem42 = document.createElement('ha-menu-item'),
                menuItem43 = document.createElement('ha-menu-item'),
                menuItem51 = document.createElement('ha-menu-item'),
                menuItem52 = document.createElement('ha-menu-item'),
                menuItem53 = document.createElement('ha-menu-item'),
                menuItem54 = document.createElement('ha-menu-item'),
                menuItemSP1 = document.createElement('ha-menu-item'),
                menuItemSP2 = document.createElement('ha-menu-item'),
                menuItemSP3 = document.createElement('ha-menu-item'),
                menuItemSP4 = document.createElement('ha-menu-item'),
                menuItemSP5 = document.createElement('ha-menu-item'),
                menuItemSP6 = document.createElement('ha-menu-item'),
                table = document.createElement('table'),
                sPTable1 = document.createElement('table'),
                sPTable2 = document.createElement('table'),
                sPTbody1 = document.createElement('tbody'),
                sPTbody2 = document.createElement('tbody'),
                tbody = document.createElement('tbody'),
                tr1 = document.createElement('tr'),
                tr2 = document.createElement('tr'),
                sPtr1 = document.createElement('tr'),
                sPtr2 = document.createElement('tr'),
                sPtr3 = document.createElement('tr'),
                sPtr4 = document.createElement('tr'),
                th1 = document.createElement('th'),
                th2 = document.createElement('th'),
                th3 = document.createElement('th'),
                th4 = document.createElement('th'),
                sPth1 = document.createElement('th'),
                sPth2 = document.createElement('th'),
                sPth3 = document.createElement('th'),
                td1 = document.createElement('td'),
                td2 = document.createElement('td'),
                td3 = document.createElement('td'),
                td4 = document.createElement('td'),
                sPtd1 = document.createElement('td'),
                sPtd2 = document.createElement('td'),
                sPtd3 = document.createElement('td'),
                span;

            button1.classList.add('global-header-button');
            button2.classList.add('global-header-button');
            button3.classList.add('global-header-button');

            button1.classList.add('global-header-button-js');
            button2.classList.add('global-header-button-js');
            button3.classList.add('global-header-button-js');

            //Non menu Flyout
            span = document.createElement('span');
            span.innerHTML = 'Lorem impsum dolor sit amet';
            div.appendChild(span);
            nonResFlyout.titleText = 'Flyout Title';
            nonResFlyout.section = div;

            this.createStructure('Non Menu Flyout', nonResFlyout, placeToAppend);

            //Resizable menu Flyout
            menuItem11.label = 'Invoice';
            menu1.add(menuItem11);

            menuItem12.label = 'Expense';
            menu1.add(menuItem12);
            lessDiv.appendChild(menu1);

            // Configure, populate, and append lessDiv
            lessDiv.classList.add('flyout-less');

            // Configure, populate, and append moreDiv
            menuItem21.label = 'Invoice';
            menuItem22.label = 'Receive Payment';
            menuItem23.label = 'Estimate';
            menuItem24.label = 'Credit Memo';
            menuItem25.label = 'Sales Receipt';
            menuItem26.label = 'Refund Receipt';
            menuItem27.label = 'Delayed Credit';
            menuItem28.label = 'Delayed Carge';

            menuItem31.label = 'Expense';
            menuItem32.label = 'Check';
            menuItem33.label = 'Bill';
            menuItem34.label = 'Pay Bills';
            menuItem35.label = 'Purchase Order';
            menuItem36.label = 'Vendor Credit';
            menuItem37.label = 'Credit Card Credit';
            menuItem38.label = 'Print Checks';

            menuItem41.label = 'Payroll';
            menuItem42.label = 'Single Time Activity';
            menuItem43.label = 'Weekly Timesheet';

            menuItem51.label = 'Bank Deposit';
            menuItem52.label = 'Transfer';
            menuItem53.label = 'Journal Entry';
            menuItem54.label = 'Statement';

            menu2.add(menuItem21);
            menu2.add(menuItem22);
            menu2.add(menuItem23);
            menu2.add(menuItem24);
            menu2.add(menuItem25);
            menu2.add(menuItem26);
            menu2.add(menuItem27);
            menu2.add(menuItem28);

            menu3.add(menuItem31);
            menu3.add(menuItem32);
            menu3.add(menuItem33);
            menu3.add(menuItem34);
            menu3.add(menuItem35);
            menu3.add(menuItem36);
            menu3.add(menuItem37);
            menu3.add(menuItem38);

            menu4.add(menuItem41);
            menu4.add(menuItem42);
            menu4.add(menuItem43);

            menu5.add(menuItem51);
            menu5.add(menuItem52);
            menu5.add(menuItem53);
            menu5.add(menuItem54);

            th1.appendChild(document.createTextNode('Customers'));
            th2.appendChild(document.createTextNode('Vendors'));
            th3.appendChild(document.createTextNode('Employees'));
            th4.appendChild(document.createTextNode('Other'));
            tr1.appendChild(th1);
            tr1.appendChild(th2);
            tr1.appendChild(th3);
            tr1.appendChild(th4);
            td1.appendChild(menu2);
            td2.appendChild(menu3);
            td3.appendChild(menu4);
            td4.appendChild(menu5);
            tr2.appendChild(td1);
            tr2.appendChild(td2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            tbody.appendChild(tr1);
            tbody.appendChild(tr2);
            table.appendChild(tbody);
            moreDiv.appendChild(table);
            moreDiv.classList.add('flyout-more');

            resFlyout.titleText = 'JS Flyout';
            resFlyout.section = [lessDiv, moreDiv];
            resFlyout.moreText = 'show more';
            resFlyout.lessText = 'show less';

            this.createStructure('Resizable Menu Flyout', resFlyout, placeToAppend);

            //Side Panel Flyout
            sPDiv1.classList.add('flyout-side-panel');
            sPth1.appendChild(document.createTextNode('Accountant'));
            sPtr1.appendChild(sPth1);
            menuItemSP1.label = 'Reclassify Transactions';
            menuItemSP2.label = 'Write Off Invoices';
            menuSP1.add(menuItemSP1);
            menuSP1.add(menuItemSP2);
            sPtd1.appendChild(menuSP1);
            sPtr2.appendChild(sPtd1);
            sPTbody1.appendChild(sPtr1);
            sPTbody1.appendChild(sPtr2);
            sPTable1.appendChild(sPTbody1);
            sPDiv1.appendChild(sPTable1);

            sPth2.appendChild(document.createTextNode('Settings'));
            sPth3.appendChild(document.createTextNode('Tools'));
            sPtr3.appendChild(sPth2);
            sPtr3.appendChild(sPth3);

            menuItemSP3.label = 'Customer Settings';
            menuItemSP4.label = 'Write Off Invoices';
            menuSP2.add(menuItemSP3);
            menuSP2.add(menuItemSP4);
            sPtd2.appendChild(menuSP2);

            menuItemSP5.label = 'Import Data';
            menuItemSP6.label = 'Export Data';
            menuSP3.add(menuItemSP5);
            menuSP3.add(menuItemSP6);
            sPtd3.appendChild(menuSP3);

            sPtr4.appendChild(sPtd2);
            sPtr4.appendChild(sPtd3);

            sPTbody2.appendChild(sPtr3);
            sPTbody2.appendChild(sPtr4);
            sPTable2.appendChild(sPTbody2);

            sPDiv2.appendChild(sPTable2);

            sPFlyout.titleText = 'Side Panel';
            sPFlyout.section = [sPDiv1, sPDiv2];

            this.createStructure('Side Panel Flyout', sPFlyout, placeToAppend);
        }
    };
});
