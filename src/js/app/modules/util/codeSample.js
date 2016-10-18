define({
    fromString: function(text) {
        return text.replace(/ /g, '&nbsp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');
    }
});
