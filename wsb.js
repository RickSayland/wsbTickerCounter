// GET THE COMMENTS
var listOfTickers = [];
var countOfTickers = [];
var tickerRegex = '[ ][A-Z]{3,4}[ .!?]';
var wsb = {
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
                            console.log(match[0]);
                            listOfTickers.push(match[0]);
                        }
                    };
    
                });
            }
        });
    },
    getTickerCounts: (tickerArray) => {
        var ticketCounts = [];
        $.each(tickerArray,(index,value) => {
            var numOccurences = $.grep(tickerArray, function (elem) {
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