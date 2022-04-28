function incrementCoutner () {
	let $incrementBtn = document.querySelector('.increment');
	let $counterNo = document.querySelector('.counter-no');

	$incrementBtn.addEventListener('click', function () {
		let count = parseInt($counterNo.innerText);
		$counterNo.innerText = count + 1;

	});
}

function decrementCoutner () {
	let $decrement = document.querySelector('.decrement');
	let $counterNo = document.querySelector('.counter-no');

	$decrement.addEventListener('click', function () {
		let count = parseInt($counterNo.innerText);

		if (count > 0) {
			$counterNo.innerText = count - 1;
		}
	});
}

function showAlert () {
	let $el = document.querySelector('.listening');

	$el.addEventListener('click', function() {
		navigator && navigator.vibrate(2000);
		alert ('Hello there');
	});
}

showAlert();
decrementCoutner();
incrementCoutner();

