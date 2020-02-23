// GET THE COMMENTS
var listOfTickers = [];
var countOfTickers = [];
var tickerRegex = '[ ][A-Z]{3,4}[ .!?]';
var wsb = {
    tickers: [],
    getTickers: () => {
        return $.ajax({
            dataType: "json",
            url: 'https://old.reddit.com/r/wallstreetbets/comments/f7hla8/weekend_discussion_thread_february_2123_2020/.json',
            success: (result) => {
                var comments = result[1].data.children;
                $.each(comments, (index) => {
                    var comment = comments[index].data.body;
                    if (comment) {
                        var match = comment.match(tickerRegex);
                        if (match && wsb.isValidTicker(match[0])) {
                            //If we dont have it yet, add it to the list
                            if ($.inArray(match[0],wsb.tickers) == -1) {
                                listOfTickers.push(match[0]);
                                wsb.tickers.push(match[0]);
                            }
                            //If we do have it, only update internal list
                            if ($.inArray(match[0],wsb.tickers) >= 0) {
                                wsb.tickers.push(match[0])
                            }
                        }
                    };
    
                });
            }
        });
    },
    getTickerCounts: () => {
        var ticketCounts = [];
        $.each(listOfTickers,(index,value) => {
            var numOccurences = $.grep(wsb.tickers, function (elem) {
                return elem === value;
            }).length;
            ticketCounts.push(numOccurences);
        })
        return ticketCounts;
    },
    isValidTicker: (tickerString) => {
        return (tickerString != ' WITH ')
    }
}