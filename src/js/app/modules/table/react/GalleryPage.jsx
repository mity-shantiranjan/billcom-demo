import React from "react";
import ExampleChooser from "./ExampleChooser";

export default class GalleryPage extends React.Component {

    static get displayName() {
        return "GalleryPage";
    }

    static get propTypes() {
        return {
            config: React.PropTypes.shape({
                id: React.PropTypes.string.isRequired,
                title: React.PropTypes.string.isRequired,
                designDocLink: React.PropTypes.string,
                defaultExample: React.PropTypes.string.isRequired,
                examples: React.PropTypes.object.isRequired
            }).isRequired
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedExampleKey: this.props.config.defaultExample,
            selectedExample: this.props.config.examples[this.props.config.defaultExample]
        };
    }

    switchExample(key) {
        this.setState({
            selectedExampleKey: key,
            selectedExample: this.props.config.examples[key]
        });
    }

    render() {
        const example = this.state.selectedExample,
            Module = example.module,
            switchExample = this.switchExample.bind(this),
            config = this.props.config,
            className = `galleryPage ${config.id}`;
        let designDoc;

        if (config.designDocLink) {
            designDoc = (
                <div className="design-document">
                    <a href={config.designDocLink} target="_blank">Design &amp; API Document</a>
                </div>
            );
        }

        return (
            <div className={className}>
                <section className="post box clearfix">
                    <h1 className="entry-title">{config.title}</h1>
                    <ExampleChooser examples={config.examples} value={this.state.selectedExampleKey} switchExample={switchExample} />
                    {designDoc}
                </section>

                <Module gitUrl={example.gitUrl} />
            </div>
        );
    }

}
