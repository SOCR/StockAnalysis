$(document).ready(function() {
	$("#submitStock").click(function(event) {
		event.preventDefault();
		clickSubmit();
	});
});

function clickSubmit() {
	stock = $("#stockSymbol").val();
	date_start = $("#date_start").val();
	date_end = $("#date_end").val();
	var stockArray = new Array();
	var url = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol ="'+stock+'" and startDate="'+date_start+'" and endDate="'+date_end+'"&format=json&env=store://datatables.org/alltableswithkeys';
	console.log(url);
	$.ajax({
    	url: url,
    	dataType: 'json',
    	// cache: false,
    	success: function(data) {
    		var quotes = data.query.results.quote;
    		var opens = quotes.map(function(quote) {
    			return quote.Open;
    		});
    		var highs = quotes.map(function(quote) {
    			return quote.High;
    		});
    		var lows = quotes.map(function(quote) {
    			return quote.Low;
    		})
            var close = quotes.map(function(quote) {
                return quote.Close;
            })
            var volume = quotes.map(function(quote) {
                return quote.Volume;
            })
            var adj_close = quotes.map(function(quote) {
                return quote.Adj_Close;
            })
    		console.log(JSON.stringify(opens, null, "\t"));
    		console.log(JSON.stringify(highs, null, "\t"));
    		console.log(JSON.stringify(lows, null, "\t"));
            console.log(JSON.stringify(close, null, "\t"));
            console.log(JSON.stringify(volume, null, "\t"));
            console.log(JSON.stringify(adj_close, null, "\t"));
    		// Mean of Opens
            var opensTotal = 0;
    		for (var i = 0; i < opens.length; i++) {
    			opensTotal += opens[i] - 0;
    		}
    		var opensMean = opensTotal/opens.length;
    		document.getElementById("opensMean").innerHTML = "Opens Mean = " + opensMean.toFixed(2);
            // Mean of Highs
            var highsTotal = 0;
            for (var i = 0; i < highs.length; i++) {
                highsTotal += highs[i] - 0;
            }
            var highsMean = highsTotal/highs.length;
            document.getElementById("highsMean").innerHTML = "Highs Mean = " + highsMean.toFixed(2);
            // Mean of Lows
            var lowsTotal = 0;
            for (var i = 0; i < lows.length; i++) {
                lowsTotal += lows[i] - 0;
            }
            var lowsMean = lowsTotal/lows.length;
            document.getElementById("lowsMean").innerHTML = "Lows Mean = " + lowsMean.toFixed(2);
            // Mean of Volume
            var volumeTotal = 0;
            for (var i = 0; i < volume.length; i++) {
                volumeTotal += volume[i] - 0;
            }
            var volumeMean = volumeTotal/volume.length;
            document.getElementById("volumeMean").innerHTML = "Volume Mean = " + volumeMean.toFixed(0);
            // Mean of Adjusted Closes
            var adj_closeTotal = 0;
            var stockReturn = new Array();
            for (var i = 0; i < adj_close.length; i++) {
                adj_closeTotal += adj_close[i] - 0;
                if (i < (adj_close.length - 1)) {
                    stockReturn[i] = ((adj_close[i+1] - 0) - (adj_close[i] - 0))/(adj_close[i] - 0);
                }
            }
            var adj_closeMean = adj_closeTotal/adj_close.length;
            var sumReturn = 0;
            for (var i = 0; i < stockReturn.length; i++) {
                sumReturn += stockReturn[i] - 0;
            }
            var meanReturn = sumReturn/stockReturn.length;
            document.getElementById("adj_closeMean").innerHTML = "Adjusted Close Mean = " + adj_closeMean.toFixed(2);
            document.getElementById("meanReturn").innerHTML = "Mean Return = " + meanReturn;
    		// this.setState({data: data});
    	},
    	error: function(xhr, status, err) {
    		console.error(url, status, err.toString());
    	}

    });
}