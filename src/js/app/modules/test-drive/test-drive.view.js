define([
        'backbone',
        'text!./test-drive.hbs',
        'hbs/handlebars'
    ],
    function(Backbone, pageTemplate, Handlebars) {
        'use strict';

        var ValidableDemoView = Backbone.View.extend({
            initialize: function() {

                var M = Backbone.Model.extend({
                    defaults: {}
                });

                this.dataModel = new M();
                this.templateModel = new M();
                this.templateModel.on('change', function() {
                    console.log('template changed');
                    this.renderOutput();
                }, this);

                this.dataModel.on('change', function() {
                    console.log('data changed');
                    this.renderOutput();
                }, this);
                this.ftu = true;
            },

            events: {
                'keyup textarea#code-input': 'updateTemplate',
                'keyup textarea#data-input': 'updateModel',
                'click .clear-logs': 'clearLogs',
                'click .meta>button': 'toggleTemplateSection',
                'change ha-segmented-button.templateChoices': 'updateTemplateChoice'
            },

            updateTemplateChoice: function() {
                //Set templates and models for each string.
                this.renderOutput();
            },

            updateTemplate: function() {
                var templateString = this.$el.find('#code-input').val();
                if (this.templateModel.get('templateString') !== templateString) {

                    this.templateModel.set('templateString', templateString);
                }
                //this.renderOutput();
            },

            updateEventLog: function(node, args) {
                var eventArgs = args[0],
                    eventName = eventArgs[0],
                    eventTarget,
                    outputText = '';
                outputText = new Date().toString() + '  Node=' + node.tagName + ',Event= ' + eventName;
                if (eventArgs.length > 1 && eventArgs[1] && eventArgs[1].target) {
                    eventTarget = eventArgs[1].target;
                    outputText = outputText + ',Target=' + eventTarget.tagName + '#' + eventTarget.id + ' with classes:' + eventTarget.className;
                }

                this.addToEventLog(outputText);
            },

            addToEventLog: function(message) {
                var $eventLogTextArea = this.$el.find('#event-logs');
                $eventLogTextArea.val($eventLogTextArea.val() + message + '\n');
            },

            clearLogs: function() {
                var $eventLogTextArea = this.$el.find('#event-logs');
                $eventLogTextArea.val('Interact with the output html on the right....\n');
            },

            updateModel: function() {
                try {
                    var data = JSON.parse(this.$el.find('#data-input').val().replace('\n', ''));
                    this.$el.find('#data-input').css('background-color', '#FFFFFF');
                    this.dataModel.set(data);
                } catch (e) {
                    this.$el.find('#data-input').css('background-color', '#FFCC00');
                }
            },

            toggleTemplateSection: function() {
                if (!this.templateHidden) {
                    this.templateHidden = true;
                    this.$el.find('.template-section').hide();
                    this.$el.find('.code-section').removeClass('half-width');
                    this.$el.find('.meta .output-toggle').text('Show Code');

                } else {
                    this.templateHidden = false;
                    this.$el.find('.template-section').show();
                    this.$el.find('.code-section').addClass('half-width');
                    this.$el.find('.meta .output-toggle').text('Show Output only');
                }

            },

            renderOutput: function() {

                if (this.ftu) {
                    this.updateModel();
                    this.updateTemplate();
                    this.ftu = false;
                }

                var $outputHtml = this.$el.find('#html'),
                    $outputHtmlContent,
                    dataModel = this.dataModel,
                    templateString = this.templateModel.get('templateString'),
                    View,
                    templateSystem = this.$el.find('ha-segmented-button.templateChoices [aria-pressed=true]').attr('value');
                console.log('template system:' + templateSystem);
                $outputHtml.empty();

                if (templateSystem === 'dojo') {
                    $outputHtml.text('Coming Soon');
                } else if (templateSystem === 'handlebars') {
                    $outputHtml.append('<div class=\'output-content\'></div>');
                    $outputHtmlContent = $outputHtml.find('div.output-content');
                    View = Backbone.View.extend({
                        el: $outputHtmlContent,
                        // Re-render the titles of the todo item.
                        render: function() {

                            var template = Handlebars.compile(templateString);
                            //this.template(dataModel.toJSON())
                            this.$el.html(template(dataModel.toJSON()));
                            return this;
                        }
                    });
                    new View({
                        'model': this.dataModel
                    }).render();

                } else if (templateSystem === 'react') {
                    this.$el.find('#html').text('React Support Coming Soon');
                }

                setTimeout(function() {
                    this._trapEvents($outputHtmlContent[0]);
                    this.clearLogs();
                    this.addToEventLog('Listening to events ......');
                }.bind(this), 30);

            },

            render: function() {

                this.$el.html(pageTemplate);
                this.renderOutput();
                return this;

            },
            /**
             * A simple breadth first traversal of the dom tree and then applies
             * a monitor to the emit even on the ha nodes only.
             *
             * @param  {[type]} node [description]
             * @return {[type]}      [description]
             */
            _trapEvents: function(node) {
                var i, that = this;
                if (node.tagName) {
                    if (node.tagName.startsWith('HA')) {
                        if (node.emit) {
                            this._wrapMethod(node, 'emit', function() {
                                that.updateEventLog(node, arguments);
                            }, false);
                        }
                    }
                }

                if (node.childNodes && node.childNodes.length) {

                    for (i = 0; i < node.childNodes.length; i++) {
                        this._trapEvents(node.childNodes[i]);
                    }

                }

            },

            _wrapMethod: function(object, methodName, callback, isLog) {
                if (typeof object === 'object' && object && typeof object[methodName] === 'function') {
                    var method = object[methodName],
                        slice = [].slice,
                        replacement;

                    if (callback) {
                        replacement = function() {
                            if (isLog) {
                                console.log(arguments);
                            }
                            callback(arguments);
                            return method.apply(this, slice.call(arguments));
                        };
                        object[methodName] = replacement;
                    }
                } else {
                    console.log('Illegal object or failed to find method.');
                }
            }

        });

        return ValidableDemoView;
    });
