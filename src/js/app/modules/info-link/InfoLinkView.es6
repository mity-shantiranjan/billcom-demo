/* jshint ignore:start */
/* jscs:disable requireMultipleVarDecl */
import GalleryView from '../../GalleryView';
import demos from './demos';

export default class View extends GalleryView {
    render() {
        return super.render(demos);
    }
};
