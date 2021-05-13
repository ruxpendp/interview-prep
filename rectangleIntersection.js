/*
* Find the intersection of two rectangles. The rectangles are "straight" and never "diagonal",
* meaning each side is parallel with either the x or y axis.
*
* For example, given two rectangles:
* { leftX: 1, bottomY: 1, width: 6, height: 3 }
* { leftX: 5, bottomY: 2, width: 3, height: 6 }
*
* return the intersection rectangle:
* { leftX: 5, bottomY: 2, width: 2, height: 2 }
*/

/*--------------------------*/

const findRangeOverlap = (point1, length1, point2, length2) => {
  const lowPoint = Math.max(point1, point2);
  const highPoint = Math.min(point1 + length1, point2 + length2);
  const length = highPoint - lowPoint;

  return length >= 0 ? { point: lowPoint, length } : { point: null, length: null };
};

const findIntersection = (rect1, rect2) => {
  const {
    point: xPoint,
    length: xLength
  } = findRangeOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
  const {
    point: yPoint,
    length: yLength
  } = findRangeOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

  if (!xPoint || !yPoint) return { leftX: null, bottomY: null, width: null, height: null };
  return { leftX: xPoint, bottomY: yPoint, width: xLength, height: yLength };
};

/*--------------------------*/

// tests
console.log(findIntersection(
  { leftX: 1, bottomY: 1, width: 6, height: 3 },
  { leftX: 5, bottomY: 2, width: 3, height: 6 }
));
console.log(findIntersection(
  { leftX: 1, bottomY: 1, width: 4, height: 4 },
  { leftX: 2, bottomY: 2, width: 2, height: 2 }
));
console.log(findIntersection(
  { leftX: 2, bottomY: 2, width: 4, height: 4 },
  { leftX: 0, bottomY: 0, width: 1, height: 1 }
));
console.log(findIntersection(
  { leftX: 2, bottomY: 2, width: 4, height: 4 },
  { leftX: 0, bottomY: 0, width: 2, height: 2 }
));

/*--------------------------*/

/*
* Commentary:
*
* Break the problem into finding overlaps on the x axis and the y axis separately. Consider how
* ranges on a line can overlap. Then combine. Helps to draw!
*/
