// GET THE COMMENTS
var listOfTickers = [];
var tickerRegex = '[ $][A-Z]{2,4}[ .!?]';
var putsRegex = "\\bputs\\b";
var callsRegex = "\\bcalls\\b"
var wsb = {
    tickers: [],
    comment_ids: [],
    puts: 0,
    calls: 0,
    getTickers: (url) => {
        return $.ajax({
            dataType: "json",
            url: url + ".json",
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
                            if (reply.data.replies) { //are there replies to the reply?
                                $.each(reply.data.replies.data.children, (k, replyreply) => { //loop through replies-replies
                                    //Is it a new comment_reply
                                    if ($.inArray(replyreply.data.name, wsb.comment_ids) == -1) {
                                        if (replyreply.kind == "t1") {
                                            comments.push(replyreply.data.body);
                                            wsb.comment_ids.push(replyreply.data.name);
                                        }
                                    }

                                    if (replyreply.data.replies) { //are there replies to the replyreply?
                                        $.each(replyreply.data.replies.data.children, (l, replycubed) => { //loop through replies^3
                                            //Is it a new comment_reply
                                            if ($.inArray(replycubed.data.name, wsb.comment_ids) == -1) {
                                                if (replycubed.kind == "t1") {
                                                    comments.push(replycubed.data.body);
                                                    wsb.comment_ids.push(replycubed.data.name);
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                $.each(comments, (index) => {
                    var comment = comments[index];
                    if (comment) {
                        var match = comment.match(tickerRegex);
                        var puts = comment.match(putsRegex);
                        var calls = comment.match(callsRegex);
                        if (match) {
                            var ticker = match[0].trim().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''); //remove punctuation
                            if (wsb.validateTicker(ticker)) {
                                //If we do have it, only update internal list
                                if ($.inArray(ticker, wsb.tickers) >= 0) {
                                    wsb.tickers.push(ticker)
                                }
                                //If we dont have it yet, add it to the list
                                if ($.inArray(ticker, wsb.tickers) == -1) {
                                    listOfTickers.push(ticker);
                                    listOfTickers.sort();
                                    wsb.tickers.push(ticker);
                                }
                            }
                        }
                        if (puts) {
                            wsb.puts += 1;
                        }
                        if (calls) {
                            wsb.calls += 1;
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
    validateTicker: (symbol) => {
        return ($.inArray(symbol, all_tickers) >= 0)
    },
    makeChart: () => {
        //Make the chart
        var ctx = document.getElementById('myChart');
        ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: listOfTickers,
                datasets: [{
                    label: 'Count (' + wsb.comment_ids.length + ' comments parsed)',
                    backgroundColor: some_colors,
                    data: wsb.getTickerCounts(),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            precision: 0,
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 0
                }
            }
        });

    }
}
var utilityFunctions = {
    getRandomColorHex: (howMany) => {
        var hex = "0123456789ABCDEF";
        var colors = [];
        for (var j = 1; j <= howMany; j++) {
            color = "#";
            for (var i = 1; i <= 6; i++) {
                color += hex[Math.floor(Math.random() * 16)];
            }
            colors.push(color);
        }
        return colors;
    }
}