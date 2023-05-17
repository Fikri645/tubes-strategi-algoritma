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
    for (let node in graph) {
      distance[node] = Infinity;
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
  
    return distance;
  }

  function dijkstra(graph, source) {
    // Inisialisasi jarak awal
    let distance = {};
    for (let node in graph) {
      distance[node] = Infinity;
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
          queue.enqueue(v, newDistance);
        }
      }
    }
  
    return distance;
  }

  const graph = {
    A: { B: 4, C: 2 },
    B: { D: 5 },
    C: { B: 1, D: 8 },
    D: { E: 3 },
    E: {}
  };

const bellmanFordResult = bellmanFord(graph, "A");
console.log(bellmanFordResult);

const dijkstraResult = dijkstra(graph, "A");
console.log(dijkstraResult);
