/* jshint ignore:start */
/* jscs:disable requireMultipleVarDecl */
import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./template.hbs';
import domConstruct from 'dojo/dom-construct';

let renderDojo = (template, el) => {
    var component = domConstruct.toDom(template),
        cloned = component.cloneNode(true);
    domConstruct.place(cloned, el);
}

let fromString = (text) => {
    return text.replace(/ /g, '&nbsp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
}

export default class GalleryView extends Backbone.View {
    render(args) {
        this.el.addEventListener('click', (evt) => {
            if (evt.target.localName === 'ha-segmented-button' && evt.target.classList.contains('usage-tab-buttons')) {
                this.navigate(evt.target.value);
            }
        });

        // process the examples[].usage
        if (args && Array.isArray(args.examples)) {
            // the first one is selected
            args.examples[0].selected = true;

            args.examples.forEach((item) => {
                if (item.usage) {
                    item.usage = fromString(item.usage);
                }
                if (!item.dojo) {
                    item.demoTemplate = item.template;
                }
            })
        }

        let compiled = handlebars.compile(template),
            html = compiled(args);

        this.$el.html(html);

        // process on the html dom for dojoTemplate and render option
        if (args && Array.isArray(args.examples)) {
            args.examples.forEach((item) => {
                let exampleNode = this.el.querySelector(`#${item.id}-example`);

                // if dojo template provided, render by cloning
                if (item.dojo) {
                    renderDojo(item.template, exampleNode)
                }
                // if we have render function provided, allow it to run
                if (item.render) {
                    item.render(exampleNode);
                }
            }, this);
        }

        return this;
    }

    navigate(id) {
        // hide every panel first
        let nodes = this.el.querySelectorAll('.panel');
        Array.prototype.forEach.call(nodes, (el) => el.classList.add('hidden'));

        // show the example panel
        this.el.querySelector(`#${id}`).classList.remove('hidden');
    }
};
