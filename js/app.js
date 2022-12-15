function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

let canvas = document.getElementById('canvas1');
canvas.width = 600;
canvas.height = 350;

let context = canvas.getContext('2d');

let minNumber = 1;
let maxNumber = 100;

// let minSize = 200;
let minSize = 10;
let maxSize = 1000;

let count2 = 0;

// let timerGraph = setInterval(function () {
// 	context.fillRect(count2 * 2.5, 350 - Math.pow(count2 / 10, 2), 5, 5);
// 	count2++;
// 	if (count2 >= 10000) {
// 		clearInterval(timerGraph);
// 	}
// }, 0);

let count = 0;

function drawField(x, y, xp, yp, size) {
	context.beginPath();
	yd = 10;
	// context.fillRect(x * 50 - 3, 350 - (y / yd + 3), 5, 5);
	// context.fillText(size, x * 50 + 10, 350 - y / yd + 10);
	context.fillRect(x / 2 - 3, 350 - (y / yd + 3), 10, 10);
	context.fillText(size, x / 2 + 10, 350 - y / yd + 10);
	// if (yp !== 0) {
	// 	context.lineWidth = 2;
	// 	context.moveTo(xp * 50, 350 - yp / yd);
	// 	context.lineTo(x * 50, 350 - y / yd);
	// }
	context.stroke();
}

document.getElementById('buttonToEnterNumOfSteps').onclick = (event) => {	
	let numberOfExecutionTimes = 100;
	let numberOfSteps = Number(document.getElementById('numOfSteps').value);

	let size = [];

	for (let i = 0; i < numberOfSteps; i++) {
		size.push(randomNumber(minSize, maxSize));
	}

	let sumOfNumbersAboveTheDiagonal = 0;

	let count = 0;

	let endPrev = 0;
	let spentTime = 0;

	let timer = setInterval(function () {
		let endTime = performance.now();
		let startTime = performance.now();
		
		for (let t = 0; t < numberOfExecutionTimes; t++) { // повторение алгоритма большое количество раз раз
			arr = [[]];
			for (let i = 0; i < size[count]; i++) {
				arr.push([]);
				for (let j = 0; j < size[count]; j++) {
					arr[i].push(randomNumber(minNumber, maxNumber));
					if (j > i) {
						sumOfNumbersAboveTheDiagonal += arr[i][j];
					}
				}
			}
			sumOfNumbersAboveTheDiagonal = 0;
		}

		endTime = performance.now();
		
		endPrev = spentTime;
		spentTime = endTime - startTime;
		console.log('Итерация ' + count + ': размер = ' + size[count] + '; время: ' + spentTime);
		if (count === 0) {
			drawField(size[count], spentTime, 0, 0, size[count]);
		} else {
			drawField(size[count], spentTime, count - 1, endPrev, size[count]);
		}
		count++;		
		if (count >= numberOfSteps) {
			clearInterval(timer);
		}
	}, 0);
}