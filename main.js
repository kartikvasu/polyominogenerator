/**----------------------------------------------------------
				MODEL ELEMENT CONSTRUCTORS
------------------------------------------------------------*/
/** Object factory that creates a point and returns it.
*/
var Point = function(x, y) {
	return {
		x: x,
		y: y
	};
}

/** Object factory that creates a list of points that when
together represent a piece. It returns a point array which is 
an array of points. 
*/
var Piece = function() {

	var i;

	//a piece has an array of points.
	var pointArray = [];

	for(i = 0; i < arguments.length; i += 2) {
		pointArray[i/2] = Point(arguments[i], arguments[i+1]); 
	}

	return {
		pointArray: pointArray
	};
}

 var PieceSpecial = function(array) {

 	var pointArray = [];

 	for(var i = 0; i < array.length; i += 2) {
 		pointArray.push(Point(array[i], array[i+1]));
 	}

 	return {
 		pointArray: pointArray
 	};

 }

/*------------------------------------------------------------
					ALGORITHMIC OPERATIONS
------------------------------------------------------------*/
/** This is the main function that is called
at the highest level. It calls several of the helper
functions in the program in order to generate the desired
array of Hexominos.
*/
var returnPolyominos = function (num) {

	if(typeof num != "number") {
		console.log("For some reason what you entered is not a number.");
		return;
	}

	return generatePolyominos(num);
}

/** This is the actual function that calls around everything. 
It is the "powerhouse of the cell" lol.
It returns an array of pieces. 
*/
var generatePolyominos = function(num) {

	if(num === 0) {

		var pieceArray = [];
		pieceArray[0] = Piece(0, 0);
		return pieceArray; 
	}

	var newPolyominos = [];
		prevPolyominos = generatePolyominos(num - 1); //recursive call here!!


	for(var i = 0; i < prevPolyominos.length; i++) {
		var polycopy = copyPolyomino(prevPolyominos[i]);
		for(var j = 0; j < polycopy.pointArray.length; j++) {
			for(var k = 0 ; k < 2; k++) {
				if(k === 0) {
					var newpoint = Point(polycopy.pointArray[j].x + 1, polycopy.pointArray[j].y);
					if(pointArrayContains(newpoint, polycopy.pointArray)) continue;
					var newPointArray = copyPointArray(polycopy.pointArray);
					newPointArray.push(newpoint);
					var newPiece = {
						pointArray: newPointArray
					};
					if(!PieceContains(newPiece, newPolyominos)) {
						newPolyominos.push(newPiece);
					}
				} else {
					var newpoint = Point(polycopy.pointArray[j].x, polycopy.pointArray[j].y + 1);
					if(pointArrayContains(newpoint, polycopy.pointArray)) continue;
					var newPointArray = copyPointArray(polycopy.pointArray);
					newPointArray.push(newpoint);
					var newPiece = {
						pointArray: newPointArray
					};
					if(!PieceContains(newPiece, newPolyominos)) {
						newPolyominos.push(newPiece);
					}
				}
			}
		}
	}

	return newPolyominos;
}

/*------------------------------------------------------
                   PIECE MUTATORS
--------------------------------------------------------
*/
/** Takes a list of points that represent a polyomino and 
returns the array after performing a matrix rotation on the 
set of points that are passed in. 
*/
var rotatePointsClockWise = function(piece) {

	var i;

	for(i = 0; i < piece.pointArray.length; i++) {
		piece.pointArray[i] = Point(piece.pointArray[i].y, -piece.pointArray[i].x);
	}

	return piece;
}

/** Takes a list of points that represent a polyomino. Performs
the matrix vertical flip operation on each one of the points and 
returns an array of points. 
*/
var flipPointsVertically = function(piece) {
	
	var i;

	for(i = 0; i < piece.pointArray.length; i++) {
		piece.pointArray[i] = Point(-piece.pointArray[i].x, piece.pointArray[i].y);
	}

	return piece;
}

/** Takes a list of points that represent a polyomino. Performs
the matrix horizontal flip operation on each one of the poitns and
returns an array of points. 
*/
var flipPointsHorizontally = function(piece) {

	var i;

	for(i = 0; i < piece.pointArray.length; i++) {
		piece.pointArray[i] = Point(piece.pointArray[i].x, -piece.pointArray[i].y);
	}

	return piece;
}

/** 
Returns a boolean indicating whether two pieces are equal.
At this point (! lol, I'm hilarious), it only checks if both 
the arrays contain the same set of points. IE, both pieces' 
point sets must have the same elements. It unforunately does
NOT do the rotation and everything to check for equality. What
a bummer!
*/
var pieceEquals = function(pieceA, pieceB) {

	var pointArrayA = pieceA.pointArray,
	pointArrayB = pieceB.pointArray;

	//they can't be equal if they are different sizes!
	if (pointArrayA.length !== pointArrayB.length) {
		alert("You stupid! The pieces aren't even the same kind!")
		return false;
	}

	for(var i = 0; i < pointArrayA.length; i++) {
		if(!pointArrayContains(pointArrayA[i], pointArrayB)) {
			return false;
		}
	}

	return true;

}

//determines if a point array contains the point.
var pointArrayContains = function (point, pointArray) {
	for(var i = 0; i < pointArray.length; i++) {
		if(pointsEqual(point, pointArray[i])) {
			return true;
		}
	}

	return false;
}

//determines if two points are equal.
var pointsEqual = function(pointA, pointB) {
	return pointA.x === pointB.x && pointA.y === pointB.y;
}

//create a new copy of the polyomino
var copyPolyomino = function(polyomino) {
	var array = copyPointArray(polyomino.pointArray);
	var numArray = [];

	for(var i = 0; i < array.length; i++) {
		numArray.push(array[i].x);
		numArray.push(array[i].y);
	}

	var copiedPiece = PieceSpecial(numArray);

	return copiedPiece;
}

//create a new copy of the point array
var copyPointArray = function(pointArray) {
	var newArray = [];
	for(var i = 0; i < pointArray.length; i++) {
		newArray.push(Point(pointArray[i].x, pointArray[i].y));
	}

	return newArray;
}

//determines if piece array contains the given piece.
var PieceContains = function(Piece, pieceArray) {
	for(var i = 0; i < pieceArray.length; i++) {
		if(pieceEquals(Piece, pieceArray[i])) {
			return true;
		}
	}

	return false;
}