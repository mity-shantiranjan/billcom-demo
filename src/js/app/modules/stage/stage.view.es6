
/* jshint ignore:start */

import Backbone from 'backbone';
import template from 'text!./stage.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./stage.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HAStage from 'hui/react-components/HAStage';
import HAHeader from 'hui/react-components/HAHeader';
import HASection from 'hui/react-components/HASection';
import HAMenuButton  from 'hui/react-components/HAMenuButton';
import HAItem from 'hui/react-components/HAItem';
import * as demoJS from './stage';
import handlebars from 'hbs/handlebars';

export default Backbone.View.extend({

	events: {
		'click ha-segmented-button.usage-tab-buttons': 'navigate'
	},

	navigate: function(evt) {
		this.$el.find('.panel').addClass('hidden');
		this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
	},

	render: function() {
		this.renderHTML(template, demoTemplate);
		this.renderJS(this.$el.find('#programmaticWay')[0]);
		this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
		this.renderReact(this.$el.find('#reactWay')[0]);
		return this;
	},

	renderHTML: function(template, demoTemplate) {
		var compiled = handlebars.compile(template),
		html = compiled({componentDemoTemplate: demoTemplate});
		this.$el.html(html);
	},

	renderDojo: function(placeToAppend) {
		var stage = domConstruct.toDom(demoTemplate),
		cloned = stage.cloneNode(true);
		domConstruct.place(cloned, placeToAppend);
	},

	renderJS: function(placeToAppend) {
		demoJS.render(placeToAppend);
	},
	
	renderReact: function(placeToAppend) {
	
        class ExampleStageComponent extends React.Component {
            constructor(props) {
                super(props); 					
            }

            render() {
                return (
                    <div>
                        <h3 className="subtitle">Collapsible Stage Component with Link navigation</h3>
						<HAStage collapsible={true}>
							<HAHeader>
								<span className="header-left">
									<div className="ha-back-links">
										<a href="#">Back to employee list</a>
									</div>
									<h2>Employees</h2>
								</span>
								<span className="header-right">
									<HAMenuButton  label="Create New">
										<HAItem value="Apple">Apple</HAItem>
										<HAItem value="Banana">Banana</HAItem>
										<HAItem value="Cherry">Cherry</HAItem>
									</HAMenuButton >
								</span>
							</HAHeader>
							<HASection>
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
							</HASection>
						</HAStage>
						<h3 className="subtitle">Collapsible Stage Component with open Stage</h3>
						<HAStage collapsible={true} open={true}>
							<HAHeader>
								<span className="header-left">
									<h2>Employees</h2>
									<h3>Profit and loss</h3>
								</span>
								<span className="header-right">
									<HAMenuButton  label="Create New">
										<HAItem value="Apple">Apple</HAItem>
										<HAItem value="Banana">Banana</HAItem>
										<HAItem value="Cherry">Cherry</HAItem>
									</HAMenuButton >
								</span>
							</HAHeader>
							<HASection>
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
							</HASection>
						</HAStage>
						<h3 className="subtitle">Collapsible Stage Component</h3>
						<HAStage collapsible={true}>
							<HAHeader>
								<span className="header-left">
									<h2>Employees</h2>
									<h3>Profit and loss</h3>
								</span>
								<span className="header-right">
									<HAMenuButton  label="Create New">
										<HAItem value="Apple">Apple</HAItem>
										<HAItem value="Banana">Banana</HAItem>
										<HAItem value="Cherry">Cherry</HAItem>
									</HAMenuButton >
								</span>
							</HAHeader>
							<HASection>
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
							</HASection>
						</HAStage>
						<h3 className="subtitle">Non Collapsable Stage Component (Default)</h3>
						<HAStage>
							<HAHeader>
								<span className="header-left">
									<h2>Employees</h2>
									<h3>Profit and loss</h3>
								</span>
								<span className="header-right">
									<HAMenuButton  label="Create New">
										<HAItem value="Apple">Apple</HAItem>
										<HAItem value="Banana">Banana</HAItem>
										<HAItem value="Cherry">Cherry</HAItem>
									</HAMenuButton >
								</span>
							</HAHeader>
							<HASection>
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
							</HASection>
						</HAStage>
						<h3 className="subtitle">Non Collapsible Stage Component without header</h3>
						<HAStage>
							<HASection>
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
							</HASection>
						</HAStage>
                    </div>
                );
            }
        }
		
        ReactDOM.render(<ExampleStageComponent/>, placeToAppend);
    }
	
});

/* jshint ignore:end */
