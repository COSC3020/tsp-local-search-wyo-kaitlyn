function tsp_ls(distance_matrix) {
  let bestRoute = true;

  let route = Object.keys(distance_matrix);
  route = shuffle(route);

  // repeats until no improvement is made
  while (bestRoute) {
    bestRoute = false;

    for (let i = 0; i < distance_matrix.length - 1; i++) {
        for (let k = i + 1; k < distance_matrix.length; k++) {
            let newRoute = twoOptSwap(route, i , k);
            let newDist = routeLength(distance_matrix, newRoute);
            let dist = routeLength(distance_matrix, route);

            if (newDist < dist) {
              // saves the better route to loop through again
              route = newRoute;
              bestRoute = true;
            }
        }
    }
  }

  return routeLength(distance_matrix, route); 
}

// calculates the length of the route
function routeLength(distance_matrix, route) {
  let total = 0;

  for (let i = 0; i < distance_matrix.length - 1; i++) {
    total += distance_matrix[route[i]][route[i+1]];
  }

  return total;
}
  

// swaps cities i to k
function twoOptSwap(route, i, k) {
  let firstPart = [];
  let reversed = [];
  let lastPart = [];

  for (let j = 0; j < route.length; j++) {
    // cities 1 to i-1 stay in the order they are
    if (j <= i - 1 && j > 0) {
      firstPart.push(route[j]);
    }
    // cities k + 1 to n stay in the order they are
    else if (j >= k+1) {
      lastPart.push(route[j]);
    }
    // cities i to k are reversed
    else {
      reversed.push(route[j]);
    }
  }

  // reverses the middle part
  let newRoute = reversed.reverse();
  // combines all arrays together
  newRoute = firstPart.concat(newRoute, lastPart);

  return newRoute;
}

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle (arr) {
  let index = arr.length;

  while (index > 0) {
    randomIndex = Math.floor(Math.random() * index);
    index--;

    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
  }

  return arr;
}
