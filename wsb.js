// GET THE COMMENTS
var listOfTickers = [];
var countOfTickers = [];
var tickerRegex3 = '[ ][A-Z]{3}[ .!?]';
var tickerRegex4 = '[ ][A-Z]{4}[ .!?]';
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
                        if (comment.match(tickerRegex3)) {
                            console.log(comment.match(tickerRegex3)[0]);
                            listOfTickers.push(comment.match(tickerRegex3)[0]);
                        }
                        if (comment.match(tickerRegex4)) {
                            console.log(comment.match(tickerRegex4)[0]);
                            listOfTickers.push(comment.match(tickerRegex4)[0]);
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
    }
}