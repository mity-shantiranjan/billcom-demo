import React from "react";

import HAItem from 'hui/react-components/HAItem';
import HAComboButton from 'hui/react-components/HAComboButton';
import ComboButtonExamples from './ComboButtonExamples'
import OptionsExamples from './OptionsExamples'
import InlineMessageExamples from './InlineMessageExamples'
import TabsExamples from './TabsExamples'

import Test from './Test'
export default class GalleryPage extends React.Component {

    static get displayName() {
        return "GalleryPage";
    }

    constructor(props) {
        super(props);
    }


    render() {

	return (
	    <div className="playground-examples">
	<Test/>
	<ComboButtonExamples/>
	<OptionsExamples />
	<InlineMessageExamples />
  <TabsExamples />
	    </div>
	);
    }

}
