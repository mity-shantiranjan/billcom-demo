import Backbone from 'backbone';
import template from 'text!./page-message.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./pagemessage.dojo.html';
import demoJS from './page-message';
import React from 'react';
import ReactDOM from 'react-dom';
import HAPageMessage from 'hui/react-components/HAPageMessage';

export default Backbone.View.extend({

  events: {
    'click ha-segmented-button.usage-tab-buttons': 'navigate'
  },

  navigate: function( evt ) {
    this.$el.find( '.panel' ).addClass( 'hidden' );
    this.$el.find( '#' + evt.currentTarget.value ).removeClass( 'hidden' );
  },

  render: function( ) {
    this.$el.html( template );
    this.renderJS( this.$el.find( '#programmaticWay' )[ 0 ]);
    this.renderDojo( this.$el.find( '#dojoProgrammaticWay' )[ 0 ]);
    this.renderReact( this.$( '#reactWay' )[ 0 ]);
    return this;
  },

  renderDojo: function( placeToAppend ) {
    var pageMessage = domConstruct.toDom( demoTemplate );
    var cloned = pageMessage.cloneNode( true );
    domConstruct.place( cloned, placeToAppend );
  },

  renderJS: function( placeToAppend ) {
    demoJS.render( placeToAppend );
  },

  renderReact: function( placeToAppend ) {
    class EmployeeListPageAssetId extends React.Component {
      render( ) {
        return (
          <div>
            <div className="declarative-wrapper">
              <HAPageMessage titleText='Alert Title' type='error' dismissible={false}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage titleText='Warn Title' dismissible={true} type='warn'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage titleText='Info Title' dismissible={true} type='info'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage titleText='Discovery Title' dismissible={true} type='discovery'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage dismissible={true} type='info'>
                No titleText. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </HAPageMessage>
              <HAPageMessage type='info' dismissible={true}>
                  <span>Using html inside the message with <a>links</a> no titleText</span>
              </HAPageMessage>
              <HAPageMessage  titleText='With Title' type='info' dismissible={true}>
                  <span>Using html inside the message with <a>links</a> with titleText</span>
              </HAPageMessage>
            </div>
          </div>
        );
      }
    }
    ReactDOM.render(<EmployeeListPageAssetId/>, placeToAppend);

  },
});
