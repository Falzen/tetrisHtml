

var brickTest = {
	isActive: true,
	color: '1',
	coords: [
		{
			x: 3,
			y: 0
		},
		{
			x: 4,
			y: 0
		},
		{
			x: 5,
			y: 0
		},
		{
			x: 6,
			y: 0
		}
	]
}
var bricks = [brickTest];
var activeBrick = null;
var brickTickerSpeed = 1.5;




function drawBricks() {
	// clean up
	$('li').removeClass('is-brick-1 is-brick-2');

	// draw bricks
	for (var i = bricks.length - 1; i >= 0; i--) {
		let onePiece = bricks[i];

		for(var j=0; j < onePiece.coords.length; j++) {
			let coords = onePiece.coords[j];
			$('#' + coords.y + '-' + coords.x).addClass('is-brick-'+onePiece.color);
		}
	}
}


function makeGrid() {
	let output = '';
	for (var i = 0; i<20; i++) {
		output += '<ul>';
		for (var j = 0; j < 10; j++) {
			output += '<li id="' + i + '-' + j + '">';
			output += '</li>';
		}
		output += '</ul>';
	}
	return output;
}

function init() {
	$('#gridContainer').html(makeGrid());
	brickTicker();
	//gameloop();
}

function brickTicker() {
	$('body').toggleClass('test');
	moveActivePieceDown();
	setTimeout(function() {
		brickTicker();
	}, 1000/brickTickerSpeed);
}

function moveActivePieceDown() {
	for (var i = 0; i < activeBrick.coords.length; i++) {
		// check FIRST if most downward brick isn't at zero
		// OR touching a non active piece
		if(activeBrick.coords[i].y == 19) {
			break;
		}
		activeBrick.coords[i].y += 1;
	}
	drawBricks();
}




// function gameloop() {
	
// 	setTimeout(function() {
// 		gameloop();
// 	}, 1000/60);
// }


$(document).ready(function() {
	//TODO do better
	activeBrick = bricks[0];
	init();
	drawBricks();
})

$(document).on('keydown', function(ev) {
	handleKeyDownByKeyCode(ev.keyCode);
});
$(document).on('keyup', function(ev) {
	handleKeyUpByKeyCode(ev.keyCode);
});

function handleKeyDownByKeyCode(kcode) {
	
     switch(kcode) {
     	case 37: // left
     		for (var i = 0; i < activeBrick.coords.length; i++) {
     			// check FIRST if first brick on the left is against wall
     			if(i == 0 && activeBrick.coords[i].x == 0) {
     				break;
     			}
     			activeBrick.coords[i].x -= 1;
     		}
     	break;
     	case 38: // up
     		alert('doto: rotate O_o');
     	break;
     	case 39: // right
     		for (var i = 0; i < activeBrick.coords.length; i++) {
     			// check FIRST if last brick on the right is against wall
     			if(i == 0 && activeBrick.coords[activeBrick.coords.length-1].x == 9) {
     				break;
     			}
     			activeBrick.coords[i].x += 1;
     		}
     	break;
     	case 40: // down
     		brickTickerSpeed = 10;
     	break;
     }

	drawBricks();
}
function handleKeyUpByKeyCode(kcode) {
     switch(kcode) {
     	case 40:
     		brickTickerSpeed = 1.5;
     	break;
     }
}