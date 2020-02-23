// GET THE COMMENTS
var listOfTickers = [];
var tickerRegex = '[ $][A-Z]{3,4}[ .!?]';
var wsb = {
    tickers: [],
    comment_ids: [],
    getTickers: (url) => {
        return $.ajax({
            dataType: "json",
            url: url,
            success: (result) => {
                var topLevelComments = result[1].data.children;
                var comments = [];
                $.each(topLevelComments, (i, tlc) => {
                    //Is it a new comment?
                    if ($.inArray(tlc.data.name, wsb.comment_ids) == -1) {
                        comments.push(tlc.data.body); //add top level comment
                        wsb.comment_ids.push(tlc.data.name); //add top level comment_id
                    }
                    if (tlc.data.replies) { //are there replies?
                        $.each(tlc.data.replies.data.children, (j, reply) => { //loop through replies
                            //Is it a new comment_reply
                            if ($.inArray(reply.data.name, wsb.comment_ids) == -1) {
                                if (reply.kind == "t1") {
                                    comments.push(reply.data.body);
                                    wsb.comment_ids.push(reply.data.name);
                                }
                            }
                        })
                    }
                })
                $.each(comments, (index) => {
                    var comment = comments[index];
                    if (comment) {
                        var match = comment.match(tickerRegex);
                        if (match) {
                            var ticker = match[0].trim().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''); //remove punctuation
                            if (wsb.isValidTicker(ticker)) {
                                //If we do have it, only update internal list
                                if ($.inArray(ticker, wsb.tickers) >= 0) {
                                    wsb.tickers.push(ticker)
                                }
                                //If we dont have it yet, add it to the list
                                if ($.inArray(ticker, wsb.tickers) == -1) {
                                    listOfTickers.push(ticker);
                                    wsb.tickers.push(ticker);
                                }
                            }
                        }
                    };
                });
            }
        });
    },
    getTickerCounts: () => {
        var ticketCounts = [];
        $.each(listOfTickers, (index, value) => {
            var numOccurences = $.grep(wsb.tickers, function (elem) {
                return elem === value;
            }).length;
            ticketCounts.push(numOccurences);
        })
        return ticketCounts;
    },
    isValidTicker: (tickerString) => {
        return (tickerString.trim() != 'WITH' &&
            tickerString.trim() != 'WSB' &&
            tickerString.trim() != 'FUCK' &&
            tickerString.trim() != 'SEC' &&
            tickerString.trim() != 'THIS' &&
            tickerString.trim() != 'CNN' &&
            tickerString.trim() != 'BUT' &&
            tickerString.trim() != 'BTFD' &&
            tickerString.trim() != 'CCP' &&
            tickerString.trim() != 'DONT' &&
            tickerString.trim() != 'NAZI')
    }
}