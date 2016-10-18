define({
    /**
     * Get an ES date string for the 26th day of the month following the current month
     */
    getNextMonthDate: function() {
        var today = new Date(),
            month,
            year = today.getFullYear(),
            dateString;

        month = today.getMonth() + 2;
        if (month > 12) {
            month = 1;
            year += 1;
        }

        dateString = year + '-' + this.pad(month) + '-26';

        return dateString;
    },

    /**
     * Get an ES date string for the 6th day of the month preceding the current month
     */
    getPreviousMonthDate: function() {
        var today = new Date(),
            month,
            year = today.getFullYear(),
            dateString;

        month = today.getMonth();
        if (month < 1) {
            month = 12;
            year -= 1;
        }

        dateString = year + '-' + this.pad(month) + '-06';

        return dateString;
    },

    /**
     * Pad single-digit numbers with a leading '0'
     */
    pad: function(value) {
        var padded = String(value);

        if (padded.length < 2) {
            padded = '0' + padded;
        }

        return padded;
    }
});
