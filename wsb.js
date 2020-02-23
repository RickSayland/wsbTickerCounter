// GET THE COMMENTS
var listOfTickers = [];
var countOfTickers = [];
var tickerRegex = '[ ][A-Z]{3,4}[ .!?]';
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
                $.each(topLevelComments,(i) => {
                    //Is it a new comment?
                    if ($.inArray(topLevelComments[i].data.name, wsb.comment_ids) == -1) {
                        comments.push(topLevelComments[i].data.body); //add top level comment
                        wsb.comment_ids.push(topLevelComments[i].data.name); //add top level comment_id
                        if(topLevelComments[i].data.replies) { //are there replies?
                            $.each(topLevelComments[i].data.replies.data.children, (j) => { //loop through replies
                                //Is it a new comment_reply
                                if ($.inArray(topLevelComments[i].data.replies.data.children[j].data.name, wsb.comment_ids) == -1){
                                    if (topLevelComments[i].data.replies.data.children[j].kind == "t1") {
                                        comments.push(topLevelComments[i].data.replies.data.children[j].data.body);
                                        wsb.comment_ids.push(topLevelComments[i].data.replies.data.children[j].data.name);
                                    }
                                }
                                if ($.inArray(topLevelComments[i].data.replies.data.children, wsb.comment_ids) >= 0){
                                    //FORGET ABOUT IT
                                }
                            })
                        }
                    }
                    //old comment
                    if ($.inArray(topLevelComments[i].name, wsb.comment_ids) >= 0) {
                        //FORGET ABOUT IT
                    }
                })

                $.each(comments, (index) => {
                    var comment = comments[index];
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
    // getTickers: (url) => {
    //     return $.ajax({
    //         dataType: "json",
    //         url: url,
    //         success: (result) => {
    //             var comments = result[1].data.children;
    //             $.each(comments, (index) => {
    //                 var comment = comments[index].data.body;
    //                 if (comment) {
    //                     var match = comment.match(tickerRegex);
    //                     if (match && wsb.isValidTicker(match[0])) {
    //                         //If we dont have it yet, add it to the list
    //                         if ($.inArray(match[0],wsb.tickers) == -1) {
    //                             listOfTickers.push(match[0]);
    //                             wsb.tickers.push(match[0]);
    //                         }
    //                         //If we do have it, only update internal list
    //                         if ($.inArray(match[0],wsb.tickers) >= 0) {
    //                             wsb.tickers.push(match[0])
    //                         }
    //                     }
    //                 };
    
    //             });
    //         }
    //     });
    // },
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
        return (tickerString.trim() != 'WITH' &&
                tickerString.trim() != 'WSB' &&
                tickerString.trim() != 'FUCK' &&
                tickerString.trim() != 'CNN' &&
                tickerString.trim() != 'NAZI')
    }
}