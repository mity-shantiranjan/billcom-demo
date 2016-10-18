/* jshint ignore:start */
import Backbone from 'backbone';
import template from 'text!./simple-list.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./list.dojo.html';
import demoJS from './list';
import React from 'react';
import ReactDOM from 'react-dom';
import HAList from 'hui/react-components/HAList';

export default Backbone.View.extend({
      events: {
          'click ha-segmented-button.usage-tab-buttons': 'navigate'
      },

      navigate: function(evt) {
          this.$el.find('.panel').addClass('hidden');
          this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
      },

      render: function() {
          this.$el.html(template);
          this.renderJS(this.$el.find('#programmaticWay')[0], this.$el.find('#html')[0]);
          this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#html')[0]);
          this.renderReact(this.$('#reactWay')[0]);
          return this;
      },

      renderDojo: function(placeToAppend) {
          var list = domConstruct.toDom(demoTemplate),
              cloned = list.cloneNode(true);
          domConstruct.place(cloned, placeToAppend);
      },

      renderJS: function(placeToAppend) {
          demoJS.render(placeToAppend);
      },

      renderReact: function(placeToAppend) {
          var eventLog = function(e) {
              console.log(`${e.target.tagName} ${e.type} fired`);
          };

          var ExampleComponent = React.createClass({
              render: function() {
                  return (
				             <div>
                        <HAList titleText="Single select list">
                          <li>First list item</li>
                          <li>Second list item</li>
                          <li>Third list item</li>
                        </HAList>
                     </div>
                  );
              }
          });
          ReactDOM.render(<ExampleComponent/>, placeToAppend);
      }
  });
