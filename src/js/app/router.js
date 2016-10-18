define([
    'backbone',
    './modules/button/button.view',
    './modules/typography/typography.view',
    './modules/segmented-button/segmented-button.view',
    './modules/card-discovery-large/card-discovery-large.view',
    './modules/checkbox/checkbox.view',
    './modules/switch-button/switch-button.view',
    './modules/tooltips/tooltips.view',
    './modules/radiobutton/radiobutton.view',
    './modules/popover/popover.view',
    './modules/drawer-large/drawer-large.view',
    './modules/drawer-small/drawer-small.view',
    './modules/textarea/textarea.view',
    './modules/textfield/textfield.view',
    './modules/toast-message/toast-message.view',
    './modules/page-message/page-message.view',
    './modules/stacked-page-messages/stacked-page-messages.view',
    './modules/paginated-messages/paginated-messages.view',
    './modules/modal/modal.view',
    './modules/money-bar/money-bar.view',
    './modules/trowser/trowser.view',
    './modules/tabs/tabs.view',
    './modules/menu-button/menu-button.view',
    './modules/combo-button/combo-button.view',
    './modules/combo-link/combo-link.view',
    './modules/validable/ValidableView',
    './modules/label/label.view',
    './modules/list/simple-list.view',
    './modules/flyout/flyout.view',
    './modules/select-type-ahead/select-type-ahead.view',
    './modules/select/select.view',
    './modules/single-step/single-step.view',
    './modules/test-drive/test-drive.view',
    './modules/icons/icons.view',
    './modules/numeric-badge/numeric-badge.view',
    './modules/status-badges/status-badges.view',
    './modules/inline-message/inline-message.view',
    './modules/grid/grid.view',
    './modules/textfield-type-ahead/textfield-type-ahead.view',
    './modules/table/table.view',
    './modules/table/react/table.view',
    './modules/tools/react/playground/playground.view',
    './modules/step-flow/step-flow.view',
    './modules/stage/stage.view',
    './modules/date-picker/date-picker.view',
    './modules/date-range-picker/date-range-picker.view',
    './modules/video/video.view',
    './modules/video-launcher/video-launcher.view',
    './modules/info-link/InfoLinkView',
    './modules/zero-state/ZeroStateView'
], function(Backbone, ButtonView, TypographyView, SegmentedView, CardDiscoveryLargeView,
    CheckboxView,
    SwitchView, TooltipView, RadioView, PopoverView, DrawerLargeView,
    DrawerSmallView, TextareaView, TextFieldView, ToastMessageView,
    PageMessageView, StackedPageMessagesView, PaginatedMessagesView,
    ModalView, MoneyBarView, TrowserView,
    HorizontalTabView, MenuButtonView, ComboButtonView, ComboLinkView,
    ValidableView, LabelView,
    SimpleListView, FlyoutView, SelectTypeAheadView, SelectView,
    SingleStepView, TestDriveView, IconsView, NumericBadgesView,
    StatusBadgesView, InlineMessageView, GridSystemView,
    TextfieldTypeAheadView, TableView, ReactTableView, ReactPlaygroundView, StepFlowView, StageView,
    DatePickerView, DateRangePickerView,
    VideoView, VideoLauncherView, InfoLinkView, ZeroStateView) {

    var Router = Backbone.Router.extend({

        routes: {
            'button': 'showButtonView',
            'card-discovery-large': 'showCardDiscoveryLargeView',
            'typography': 'showTypographyView',
            'icons': 'showIconsView',
            'segmented': 'showSegmentedView',
            'radio': 'showRadioView',
            'checkbox': 'showCheckboxView',
            'switch': 'showSwitchView',
            'tooltips': 'showTooltipView',
            'popovers': 'showPopoverView',
            'drawer-large': 'showDrawerLargeView',
            'drawer-small': 'showDrawerSmallView',
            'textarea': 'showTextareaView',
            'textfield': 'showTextFieldView',
            'modal': 'showModalView',
            'money-bar': 'showMoneyBarView',
            'trowser': 'showTrowserView',
            'toast-message': 'showToastMessageView',
            'page-message': 'showPageMessageView',
            'stacked-page-messages': 'showStackedPageMessagesView',
            'paginated-messages': 'showPaginatedMessagesView',
            'horizontal-tab': 'showHorizontalTabView',
            'menu-button': 'showMenuButtonView',
            'combo-button': 'showComboButtonView',
            'combo-link': 'showComboLink',
            'label': 'showLabelView',
            'simple-list': 'showSimpleListView',
            'flyout': 'showFlyoutView',
            'validable': 'showValidableView',
            'select-type-ahead': 'showSelectTypeAheadView',
            'select': 'showSelectView',
            'single-step': 'showSingleStepView',
            'test-drive': 'showTestDriveView',
            'numeric-badges': 'showNumericBadgesView',
            'status-badges': 'showStatusBadgesView',
            'inline-message': 'showInlineMessageView',
            'grid-system': 'showGridSystemView',
            'textfield-type-ahead': 'showTextfieldTypeAheadView',
            'stage': 'showStageView',
            'date-picker': 'showDatePickerView',
            'date-range-picker': 'showDateRangePickerView',
            'table': 'showTable',
            'react-table': 'showReactTable',
            'react-playground': 'showReactPlayground',
            'step-flow': 'showStepFlowView',
            'video': 'showVideoView',
            'video-launcher': 'showVideoLauncherView',
            'info-link': 'showInfoLinkView',
            'zero-state': 'showZeroStateView'
        },

        currentView: null,

        initialize: function() {
            Backbone.history.start();
        },

        changeView: function(view) {
            if (this.currentView) {
                this.currentView.remove();
                this.currentView.unbind();
                if (this.currentView.onClose) {
                    this.currentView.onClose();
                }
            }

            this.currentView = view;
            $('#content').empty();
            $('#content').append(this.currentView.render().el);

            /*$('pre').each(function(i, block) {
                hljs.highlightBlock(block);
            });*/
        },

        /*handleDefaultRoute: function(path) {
            var galleryView = new GalleryView();
            this.changeView(galleryView);
        },*/

        showButtonView: function() {
            var buttonView = new ButtonView();
            this.changeView(buttonView);
        },

        showTypographyView: function() {
            var typoView = new TypographyView();
            this.changeView(typoView);
        },

        showIconsView: function() {
            var iconsView = new IconsView();
            this.changeView(iconsView);
        },

        showSegmentedView: function() {
            var segmentedView = new SegmentedView();
            this.changeView(segmentedView);
        },

        showSingleStepView: function() {
            var singleStepView = new SingleStepView.default();
            this.changeView(singleStepView);
        },

        showCheckboxView: function() {
            var checkView = new CheckboxView.default();
            this.changeView(checkView);
        },

        showRadioView: function() {
            var radioView = new RadioView.default();
            this.changeView(radioView);
        },

        showSwitchView: function() {
            var switchView = new SwitchView.default();
            this.changeView(switchView);
        },

        showTooltipView: function() {
            var toolView = new TooltipView.default();
            this.changeView(toolView);
        },

        showPopoverView: function() {
            var popView = new PopoverView();
            this.changeView(popView);
        },

        showDrawerLargeView: function() {
            var drawerLargeView = new DrawerLargeView.default();
            this.changeView(drawerLargeView);
        },

        showDrawerSmallView: function() {
            var drawerSmallView = new DrawerSmallView.default();
            this.changeView(drawerSmallView);
        },

        showTextareaView: function() {
            var textareaView = new TextareaView.default();
            this.changeView(textareaView);
        },

        showTextFieldView: function() {
            var textView = new TextFieldView.default();
            this.changeView(textView);
        },

        showToastMessageView: function() {
            var toastView = new ToastMessageView.default();
            this.changeView(toastView);
        },

        showPageMessageView: function() {
            var pageMessageView = new PageMessageView.default();
            this.changeView(pageMessageView);
        },

        showStackedPageMessagesView: function() {
            var stackedPageMessagesView = new StackedPageMessagesView.default();
            this.changeView(stackedPageMessagesView);
        },

        showPaginatedMessagesView: function() {
            var paginatedMessagesView = new PaginatedMessagesView();
            this.changeView(paginatedMessagesView);
        },

        showModalView: function() {
            var modalView = new ModalView.default();
            this.changeView(modalView);
        },

        showMoneyBarView: function() {
            var moneyBarView = new MoneyBarView();
            this.changeView(moneyBarView);
        },

        showTrowserView: function() {
            var trowserView = new TrowserView.default();
            this.changeView(trowserView);
        },

        showMenuButtonView: function() {
            var menuButtonView = new MenuButtonView.default();
            this.changeView(menuButtonView);
        },

        showComboButtonView: function() {
            var comboButtonView = new ComboButtonView.default();
            this.changeView(comboButtonView);
        },

        showHorizontalTabView: function() {
            var horizontalTab = new HorizontalTabView.default();
            this.changeView(horizontalTab);
        },

        showComboLink: function() {
            var comboLink = new ComboLinkView.default();
            this.changeView(comboLink);
        },

        showLabelView: function() {
            var labelView = new LabelView.default();
            this.changeView(labelView);
        },

        showSimpleListView: function() {
            var simpleListView = new SimpleListView.default();
            this.changeView(simpleListView);
        },

        showValidableView: function() {
            var validable = new ValidableView.default();
            this.changeView(validable);
        },

        showSelectTypeAheadView: function() {
            var selectTypeAheadView = new SelectTypeAheadView();
            this.changeView(selectTypeAheadView);
        },

        showSelectView: function() {
            var selectView = new SelectView.default();
            this.changeView(selectView);
        },

        showFlyoutView: function() {
            var flyoutView = new FlyoutView();
            this.changeView(flyoutView);
        },

        showTestDriveView: function() {
            var testDrive = new TestDriveView();
            this.changeView(testDrive);
        },
        showNumericBadgesView: function() {
            var numericBadgesView = new NumericBadgesView();
            this.changeView(numericBadgesView);
        },
        showStatusBadgesView: function() {
            var statusBadgesView = new StatusBadgesView();
            this.changeView(statusBadgesView);
        },

        showInlineMessageView: function() {
            var inlineMessageView = new InlineMessageView();
            this.changeView(inlineMessageView);
        },

        showGridSystemView: function() {
            var gridSystem = new GridSystemView();
            this.changeView(gridSystem);
        },

        showTextfieldTypeAheadView: function() {
            var textfieldTypeAheadView = new TextfieldTypeAheadView();
            this.changeView(textfieldTypeAheadView);
        },

        showStepFlowView: function() {
            var stepFlowView = new StepFlowView.default();
            this.changeView(stepFlowView);
        },

        showStageView: function() {
            var stageView = new StageView.default();
            this.changeView(stageView);
        },

        showDatePickerView: function() {
            var datePickerView = new DatePickerView.default();
            this.changeView(datePickerView);
        },

        showDateRangePickerView: function() {
            var dateRangePickerView = new DateRangePickerView();
            this.changeView(dateRangePickerView);
        },

        showTable: function() {
            var tableView = new TableView();
            this.changeView(tableView);
        },

        showReactTable: function() {
            var tableView = new ReactTableView.default();
            this.changeView(tableView);
        },

        showReactPlayground: function() {
            var tableView = new ReactPlaygroundView.default();
            this.changeView(tableView);
        },

        showVideoView: function() {
            var videoView = new VideoView();
            this.changeView(videoView);
        },

        showVideoLauncherView: function() {
            var videoLauncherView = new VideoLauncherView();
            this.changeView(videoLauncherView);
        },

        showCardDiscoveryLargeView: function() {
            var cardDiscoveryLargeView = new CardDiscoveryLargeView.default();
            this.changeView(cardDiscoveryLargeView);
        },

        showInfoLinkView: function() {
            var infoLinkView = new InfoLinkView.default();
            this.changeView(infoLinkView);
        },

        showZeroStateView: function() {
            var view = new ZeroStateView.default();
            this.changeView(view);
        }
    });

    return Router;
});
