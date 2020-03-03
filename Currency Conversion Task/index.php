<!doctype html>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script>
		
			var formatter = new Intl.NumberFormat('en-GB', {
			  style: 'currency',
			  currency: 'USD',
			})

			async function rates() {
				const res = await(fetch('https://api.exchangeratesapi.io/latest?base=GBP').then(res => res.json()))
				$('#rates').children('p').text("Conversion rate: " + res.rates.USD)
				return res
			}
			
			async function convert(number) {
				let res = await rates()
				let usd = res.rates.USD
				let output =  number * usd
				$('#convert').children('p').text("Converted amount from GBP to USD: " + formatter.format(output.toFixed(2)))
			}
		</script>
	</head>
	<body>
		<div>
			<div id="rates">
				<h2>Conversion from GBP to USD</h2>
				<button type="button" class="button1" onclick="rates();">Fetch Rates</button>
				<p></p>
			</div>
			<div id="convert">
				<label for="number">Input an amount to convert:</label>
				<input id="number" type="number" name="number">
				<button type="button" class="button1"  onclick="convert(document.getElementById('number').value)">Convert</button>
				<p></p>
			</div>
		</div>
	</body>
</html>
