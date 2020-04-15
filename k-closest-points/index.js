function Point(x, y) {
  this.x = x;
  this.y = y;
  return this;
}

//find k closest points around the origin, return those points
//heap question.  not great for js

function findKClosestPoints(points, origin, k) {
  if (!points) {
    return [];
  }
  
  if (k >= points.length) {
    return points;
  }
  
  const hash = {};
  points.forEach(point => {
    const curDistance = distance(point, origin);
    hash[curDistance] = hash[curDistance] || [];
    hash[curDistance].push(point); 
  });

  const answer = [];
  const sortedDistances = Object.keys(hash).sort((a, b) => a - b);
  while(answer.length < k) {
    const nextMinDistances = hash[sortedDistances.shift()];
    if (answer.length < k && nextMinDistances.length) {
      answer.push(nextMinDistances.shift());
    }
  }

  return answer;
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

points = [new Point(0, 1), new Point(1, -3), new Point(2, 4), new Point(1, 1), new Point(13, -2)];
origin = new Point(1, 1);
const k = 2;
console.log(findKClosestPoints(points, origin, k));