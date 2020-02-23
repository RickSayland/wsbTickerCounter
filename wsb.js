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
                console.log(result[0].data); //post
                console.log(result[1].data); //comments
                var comments = result[1].data.children;
                $.each(comments, (i, v) => {
                    var comment = comments[i].data.body;
                    if (comment) {
                        var match = comment.match(tickerRegex);
                        if (match && wsb.isValidTicker(match[0])) {
                            console.log(match[0]);
                            listOfTickers.push(match[0]);
                        }
                    };
    
                });
                $.each(listOfTickers,(index,value) => {
                    var numOccurences = $.grep(listOfTickers, function (elem) {
                        return elem === value;
                    }).length;
                    countOfTickers.push(numOccurences);
                })
            }
        });
    },
    
    isValidTicker: (tickerString) => {
        return (tickerString != ' WITH ')
    }
}