class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.sort();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().item;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}


function bellmanFord(graph, source) {
  // Inisialisasi jarak awal
  let distance = {};
  let predecessor = {};
  for (let node in graph) {
    distance[node] = Infinity;
    predecessor[node] = null;
  }
  distance[source] = 0;

  // Proses relaksasi pada setiap edge
  for (let i = 0; i < Object.keys(graph).length - 1; i++) {
    for (let u in graph) {
      for (let v in graph[u]) {
        let weight = graph[u][v];
        let newDistance = distance[u] + weight;
        if (newDistance < distance[v]) {
          distance[v] = newDistance;
          predecessor[v] = u;
        }
      }
    }
  }

  // Deteksi siklus negatif
  for (let u in graph) {
    for (let v in graph[u]) {
      let weight = graph[u][v];
      let newDistance = distance[u] + weight;
      if (newDistance < distance[v]) {
        throw new Error("Terdapat siklus negatif pada graf");
      }
    }
  }

  return { distance, predecessor };
}


function dijkstra(graph, source) {
  // Inisialisasi jarak awal
  let distance = {};
  let predecessor = {};
  for (let node in graph) {
    distance[node] = Infinity;
    predecessor[node] = null;
  }
  distance[source] = 0;

  // Inisialisasi visited
  let visited = {};

  // Inisialisasi priority queue
  let queue = new PriorityQueue();
  queue.enqueue(source, 0);

  // Proses pencarian jalur terpendek
  while (!queue.isEmpty()) {
    let u = queue.dequeue();
    if (visited[u]) {
      continue;
    }
    visited[u] = true;
    for (let v in graph[u]) {
      let weight = graph[u][v];
      let newDistance = distance[u] + weight;
      if (newDistance < distance[v]) {
        distance[v] = newDistance;
        predecessor[v] = u;
        queue.enqueue(v, newDistance);
      }
    }
  }

  return { distance, predecessor };
}

// Fungsi untuk mendapatkan jalur dari simpul sumber ke simpul tujuan
function getPath(predecessor, destination) {
  const path = [];
  const visitedNodes = [];
  let current = destination;

  while (current !== null) {
    path.unshift(current);
    visitedNodes.unshift(current);
    current = predecessor[current];
  }

  return { path, visitedNodes };
}

// Fungsi untuk menjalankan algoritma Bellman-Ford
function runBellmanFord() {
  const sourceNode = document.getElementById("source-node-bf").value;
  const graphInput = document.getElementById("graph-input-bf").value;

  const graph = JSON.parse(graphInput);

  try {
    const { distance, predecessor } = bellmanFord(graph, sourceNode);
    const outputElement = document.getElementById("output-bf");

    let outputHTML = "<pre>";
    for (let node in distance) {
      const { path, visitedNodes } = getPath(predecessor, node);
      outputHTML += `Path to node ${node}: ${path.join(" -> ")}<br>`;
      outputHTML += `Visited nodes: ${visitedNodes.join(", ")}<br>`;
      outputHTML += `Distance: ${distance[node]}<br><br>`;
    }
    outputHTML += "</pre>";

    outputElement.innerHTML = outputHTML;
  } catch (error) {
    document.getElementById("output-bf").innerHTML = "Error: " + error.message;
  }
}

// Fungsi untuk menjalankan algoritma Dijkstra
function runDijkstra() {
  const sourceNode = document.getElementById("source-node-dijkstra").value;
  const graphInput = document.getElementById("graph-input-dijkstra").value;

  const graph = JSON.parse(graphInput);

  try {
    const { distance, predecessor } = dijkstra(graph, sourceNode);
    const outputElement = document.getElementById("output-dijkstra");

    let outputHTML = "<pre>";
    for (let node in distance) {
      const { path, visitedNodes } = getPath(predecessor, node);
      outputHTML += `Path to node ${node}: ${path.join(" -> ")}<br>`;
      outputHTML += `Visited nodes: ${visitedNodes.join(", ")}<br>`;
      outputHTML += `Distance: ${distance[node]}<br><br>`;
    }
    outputHTML += "</pre>";

    outputElement.innerHTML = outputHTML;
  } catch (error) {
    document.getElementById("output-dijkstra").innerHTML = "Error: " + error.message;
  }
}