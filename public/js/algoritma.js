function bellmanFord(graph, source) {
  // Inisialisasi jarak awal
  let distances = {};
  let predecessor = {};
  for (let node in graph) {
    distances[node] = Infinity;
    predecessor[node] = null;
  }
  distances[source] = 0;

  for (let i = 0; i < Object.keys(graph).length - 1; i++) {
    for (let u in graph) {
      for (let v in graph[u]) {
        let weight = graph[u][v];
        let newDistances = distances[u] + weight;
        if (newDistances < distances[v]) {
          distances[v] = newDistances;
          predecessor[v] = u;
        }
      }
    }
  }

  // Deteksi siklus negatif
  for (let u in graph) {
    for (let v in graph[u]) {
      let weight = graph[u][v];
      let newDistances = distances[u] + weight;
      if (newDistances < distances[v]) {
        throw new Error("Terdapat siklus negatif pada graf");
      }
    }
  }

  return { distances, predecessor };
}

function dijkstra(graph, source) {
  // Inisialisasi jarak awal
  let distances = {};
  let predecessor = {};
  for (let node in graph) {
    distances[node] = Infinity;
    predecessor[node] = null;
  }
  distances[source] = 0;

  let visited = new Set();

  while (visited.size < Object.keys(graph).length) {
    let currentNode = getMinDistanceNode(distances, visited);

    visited.add(currentNode);

    for (let [adjacentNode, weight] of Object.entries(graph[currentNode])) {
      if (weight >= 0) {
        let totalDistances = distances[currentNode] + weight;

        if (totalDistances < distances[adjacentNode]) {
          distances[adjacentNode] = totalDistances;
          predecessor[adjacentNode] = currentNode;
        }
      }
    }
  }

  return { distances, predecessor };
}

function getMinDistanceNode(distances, visited) {
  let minDistance = Infinity;
  let minNode = null;

  for (let node in distances) {
    if (distances[node] < minDistance && !visited.has(node)) {
      minDistance = distances[node];
      minNode = node;
    }
  }

  return minNode;
}

// Fungsi untuk mendapatkan jalur dari simpul sumber ke simpul tujuan
function getPath(predecessor, destination) {
  const path = [];
  let current = destination;

  while (current !== null) {
    path.unshift(current);
    current = predecessor[current];
  }

  return path;
}

// Fungsi untuk menjalankan algoritma Bellman-Ford
function runBellmanFord() {
  const sourceNode = document.getElementById("source-node").value;
  const destination = document.getElementById("destination").value;
  if (sourceNode == "" || destination == "") {
    document.getElementById("output").innerHTML =
      "Error: Source Node atau Destination Node tidak boleh kosong";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const graphInput = document.getElementById("graph-input").value;
  if (graphInput == "") {
    document.getElementById("graph-input").value =
      '{"A": {"B": 3}, "B": {"A": 3, "C": 4, "D": 5, "E": 3}, "C": {"B": 4, "H": 6 }, "D": {"B": 5, "F": 2}, "E": {"B": 3, "F": 4, "G": 2}, "F": {"D": 3, "E": 4}, "G": {"E": 2, "H": 4, "J": 3}, "H": {"G": 4, "I": 2, "C": 6}, "I": {"H": 2, "J": 5, "M": 10}, "J": {"G": 3, "I": 5, "K": 1}, "K": {"J": 1, "L": 4}, "L": {"M": 5, "K": 4}, "M": {"O": 2, "L": 5, "I": -10, "N": 6}, "N": {"M": 6, "P": 9}, "O": {"M": 2, "S": 10, "Z": -8}, "P": {"N": 9, "R": 3, "T": 4}, "Q": {"S": 4, "U": 2}, "R": {"P": 3, "AA": 2, "AC": 5}, "S": {"O": 10, "Q": 4, "V": 2}, "T": {"P": 4, "U": 1, "W": 2, "AC": 3}, "U": {"Q": 2, "V": 3, "X": 2, "T": 1}, "V": {"S": 2, "Y": 3, "U": 3}, "W": {"T": 2, "AG": 3}, "X": {"U": 2, "Y": 4}, "Y": {"V": 3, "X": 4}, "Z": {"AK": 3, "AA": 6}, "AA": {"AB": 3, "R": 2, "Z": 6, "AJ": 4}, "AB": {"AA": 3, "AI": 3, "AC": 2.5, "AD": 1.5}, "AC": {"R": 5, "AB": 2.5, "AE": 1.5, "T": 3}, "AD": {"AB": 1.5, "AF": 1.5, "AE": 2}, "AE": {"AC": 1.5, "AG": 1.5, "AD": 2}, "AF": {"AD": 1.5, "AG": 4, "AH": 3}, "AG": {"W": 3, "AF": 4, "AE": 1.5}, "AH": {"AF": 3, "AI": 4, "AO": 2}, "AI": {"AH": 4, "AB": 3, "AJ": 2, "AN": 4}, "AJ": {"AI": 2, "AM": 3, "AK": 5, "AA": 4}, "AK": {"AL": 4, "Z": 3, "AJ": 5}, "AL": {"AK": 4, "AM": 6}, "AM": {"AL": 6, "AJ": 3, "AN": 3}, "AN": {"AM": 3, "AI": 4, "AO": 5}, "AO": {"AN": 5, "AH": 2}}';
    graphInput = document.getElementById("graph-input").value;
  }
  const graph = JSON.parse(graphInput);
  if (!graph.hasOwnProperty(sourceNode)) {
    document.getElementById("output").innerHTML =
      "Error: Source Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  if (!graph.hasOwnProperty(destination)) {
    document.getElementById("output").innerHTML =
      "Error: Destination Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const startTime = performance.now(); // Waktu mulai

  try {
    const { distances, predecessor } = bellmanFord(graph, sourceNode);
    const outputElement = document.getElementById("output");

    let outputHTML = "<pre>";
    const path = getPath(predecessor, destination);
    outputHTML += `Jalur Ke Tujuan: ${path.join(" -> ")}<br>`;
    outputHTML += `Total Usaha: ${distances[destination]}<br>`;

    outputHTML += "</pre>";

    outputElement.innerHTML = outputHTML;
  } catch (error) {
    document.getElementById("output").innerHTML = "Error: " + error.message;
  }
  const timeRunElement = document.getElementById("run-time");
  const endTime = performance.now(); // Waktu selesai
  const executionTime = endTime - startTime; // Waktu eksekusi dalam milidetik
  let timeRunHTML = "<pre>";
  timeRunHTML += `Waktu Eksekusi Bellman-Ford: ${executionTime} ms<br>`;
  timeRunHTML += "</pre>";
  timeRunElement.innerHTML = timeRunHTML;
}

// Fungsi untuk menjalankan algoritma Dijkstra
function runDijkstra() {
  const sourceNode = document.getElementById("source-node").value;
  const destination = document.getElementById("destination").value;
  if (sourceNode == "" || destination == "") {
    document.getElementById("output").innerHTML =
      "Error: Source Node atau Destination Node tidak boleh kosong";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const graphInput = document.getElementById("graph-input").value;
  if (graphInput == "") {
    document.getElementById("graph-input").value =
      '{"A": {"B": 3}, "B": {"A": 3, "C": 4, "D": 5, "E": 3}, "C": {"B": 4, "H": 6 }, "D": {"B": 5, "F": 2}, "E": {"B": 3, "F": 4, "G": 2}, "F": {"D": 3, "E": 4}, "G": {"E": 2, "H": 4, "J": 3}, "H": {"G": 4, "I": 2, "C": 6}, "I": {"H": 2, "J": 5, "M": 10}, "J": {"G": 3, "I": 5, "K": 1}, "K": {"J": 1, "L": 4}, "L": {"M": 5, "K": 4}, "M": {"O": 2, "L": 5, "I": -10, "N": 6}, "N": {"M": 6, "P": 9}, "O": {"M": 2, "S": 10, "Z": -8}, "P": {"N": 9, "R": 3, "T": 4}, "Q": {"S": 4, "U": 2}, "R": {"P": 3, "AA": 2, "AC": 5}, "S": {"O": 10, "Q": 4, "V": 2}, "T": {"P": 4, "U": 1, "W": 2, "AC": 3}, "U": {"Q": 2, "V": 3, "X": 2, "T": 1}, "V": {"S": 2, "Y": 3, "U": 3}, "W": {"T": 2, "AG": 3}, "X": {"U": 2, "Y": 4}, "Y": {"V": 3, "X": 4}, "Z": {"AK": 3, "AA": 6}, "AA": {"AB": 3, "R": 2, "Z": 6, "AJ": 4}, "AB": {"AA": 3, "AI": 3, "AC": 2.5, "AD": 1.5}, "AC": {"R": 5, "AB": 2.5, "AE": 1.5, "T": 3}, "AD": {"AB": 1.5, "AF": 1.5, "AE": 2}, "AE": {"AC": 1.5, "AG": 1.5, "AD": 2}, "AF": {"AD": 1.5, "AG": 4, "AH": 3}, "AG": {"W": 3, "AF": 4, "AE": 1.5}, "AH": {"AF": 3, "AI": 4, "AO": 2}, "AI": {"AH": 4, "AB": 3, "AJ": 2, "AN": 4}, "AJ": {"AI": 2, "AM": 3, "AK": 5, "AA": 4}, "AK": {"AL": 4, "Z": 3, "AJ": 5}, "AL": {"AK": 4, "AM": 6}, "AM": {"AL": 6, "AJ": 3, "AN": 3}, "AN": {"AM": 3, "AI": 4, "AO": 5}, "AO": {"AN": 5, "AH": 2}}';
    graphInput = document.getElementById("graph-input").value;
  }
  const graph = JSON.parse(graphInput);
  if (!graph.hasOwnProperty(sourceNode)) {
    document.getElementById("output").innerHTML =
      "Error: Source Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  if (!graph.hasOwnProperty(destination)) {
    document.getElementById("output").innerHTML =
      "Error: Destination Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const startTime = performance.now(); // Waktu mulai

  try {
    const { distances, predecessor } = dijkstra(graph, sourceNode);
    const outputElement = document.getElementById("output");

    let outputHTML = "<pre>";
    const path = getPath(predecessor, destination);
    outputHTML += `Jalur Ke Tujuan: ${path.join(" -> ")}<br>`;
    outputHTML += `Total Usaha: ${distances[destination]}<br>`;

    outputHTML += "</pre>";

    outputElement.innerHTML = outputHTML;
  } catch (error) {
    document.getElementById("output").innerHTML = "Error: " + error.message;
  }
  const timeRunElement = document.getElementById("run-time");
  const endTime = performance.now(); // Waktu selesai
  const executionTime = endTime - startTime; // Waktu eksekusi dalam milidetik
  let timeRunHTML = "<pre>";
  timeRunHTML += `Waktu Eksekusi Dijkstra: ${executionTime} ms<br>`;
  timeRunHTML += "</pre>";
  timeRunElement.innerHTML = timeRunHTML;
}

// Fungsi untuk menjalankan algoritma Bellman-Ford
function runBellmanFordDefault() {
  const sourceNode = document.getElementById("source-node-default").value;
  const destination = document.getElementById("destination-default").value;
  if (sourceNode == "" || destination == "") {
    document.getElementById("output-default").innerHTML =
      "Error: Source Node atau Destination Node tidak boleh kosong";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const graphInput =
    '{"A": {"B": 3}, "B": {"A": 3, "C": 4, "D": 5, "E": 3}, "C": {"B": 4, "H": 6 }, "D": {"B": 5, "F": 2}, "E": {"B": 3, "F": 4, "G": 2}, "F": {"D": 3, "E": 4}, "G": {"E": 2, "H": 4, "J": 3}, "H": {"G": 4, "I": 2, "C": 6}, "I": {"H": 2, "J": 5, "M": 10}, "J": {"G": 3, "I": 5, "K": 1}, "K": {"J": 1, "L": 4}, "L": {"M": 5, "K": 4}, "M": {"O": 2, "L": 5, "I": -10, "N": 6}, "N": {"M": 6, "P": 9}, "O": {"M": 2, "S": 10, "Z": -8}, "P": {"N": 9, "R": 3, "T": 4}, "Q": {"S": 4, "U": 2}, "R": {"P": 3, "AA": 2, "AC": 5}, "S": {"O": 10, "Q": 4, "V": 2}, "T": {"P": 4, "U": 1, "W": 2, "AC": 3}, "U": {"Q": 2, "V": 3, "X": 2, "T": 1}, "V": {"S": 2, "Y": 3, "U": 3}, "W": {"T": 2, "AG": 3}, "X": {"U": 2, "Y": 4}, "Y": {"V": 3, "X": 4}, "Z": {"AK": 3, "AA": 6}, "AA": {"AB": 3, "R": 2, "Z": 6, "AJ": 4}, "AB": {"AA": 3, "AI": 3, "AC": 2.5, "AD": 1.5}, "AC": {"R": 5, "AB": 2.5, "AE": 1.5, "T": 3}, "AD": {"AB": 1.5, "AF": 1.5, "AE": 2}, "AE": {"AC": 1.5, "AG": 1.5, "AD": 2}, "AF": {"AD": 1.5, "AG": 4, "AH": 3}, "AG": {"W": 3, "AF": 4, "AE": 1.5}, "AH": {"AF": 3, "AI": 4, "AO": 2}, "AI": {"AH": 4, "AB": 3, "AJ": 2, "AN": 4}, "AJ": {"AI": 2, "AM": 3, "AK": 5, "AA": 4}, "AK": {"AL": 4, "Z": 3, "AJ": 5}, "AL": {"AK": 4, "AM": 6}, "AM": {"AL": 6, "AJ": 3, "AN": 3}, "AN": {"AM": 3, "AI": 4, "AO": 5}, "AO": {"AN": 5, "AH": 2}}'; // Menambahkan hubungan antara F-M dan M-AI
  const graph = JSON.parse(graphInput);
  if (!graph.hasOwnProperty(sourceNode)) {
    document.getElementById("output-default").innerHTML =
      "Error: Source Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  if (!graph.hasOwnProperty(destination)) {
    document.getElementById("output-default").innerHTML =
      "Error: Destination Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const startTime = performance.now(); // Waktu mulai

  try {
    const { distances, predecessor } = bellmanFord(graph, sourceNode);
    const outputElement = document.getElementById("output-default");

    let outputHTML = "<pre>";
    const path = getPath(predecessor, destination);
    outputHTML += `Jalur Ke Tujuan: ${path.join(" -> ")}<br>`;
    outputHTML += `Total Usaha: ${distances[destination]}<br>`;

    outputHTML += "</pre>";

    outputElement.innerHTML = outputHTML;
  } catch (error) {
    document.getElementById("output-default").innerHTML =
      "Error: " + error.message;
  }
  const timeRunElement = document.getElementById("run-time-default");
  const endTime = performance.now(); // Waktu selesai
  const executionTime = endTime - startTime; // Waktu eksekusi dalam milidetik
  let timeRunHTML = "<pre>";
  timeRunHTML += `Waktu Eksekusi Bellman-Ford: ${executionTime} ms<br>`;
  timeRunHTML += "</pre>";
  timeRunElement.innerHTML = timeRunHTML;
  const notifMisiElement = document.getElementById("notif-misi");
  let notifMisiHTML = "<pre>";
  var petaMisi = document.querySelector(".peta-misi img");

  if (sourceNode == "A" && destination == "F") {
    hideButton(buttond);
    notifMisiHTML += `Misi Pertama Berhasil Diselesaikan<br>`;
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    petaMisi.src = "/assets/svg/peta-misi1-bf.svg"; // Mengganti sumber gambar dengan peta misi pertama
  } else if (sourceNode == "F" && destination == "M") {
    const prevDestination = document
      .getElementById("destination-default")
      .getAttribute("prev-destination");
    if (prevDestination != "F") {
      resetButton();
      notifMisiHTML += `Misi Gagal Diselesaikan<br>`;
      petaMisi.src = "/assets/svg/peta-misi.svg"; // Mengganti sumber gambar dengan peta misi default
      document.getElementById("source-node-default").value = "";
      document.getElementById("destination-default").value = "";
      document
        .getElementById("destination-default")
        .setAttribute("prev-destination", "");
      document.getElementById("output-default").innerHTML = "";
      document.getElementById("run-time-default").innerHTML = "";
      notifMisiElement.innerHTML = notifMisiHTML;
      return;
    }
    notifMisiHTML += `Misi Kedua Berhasil Diselesaikan<br>`;
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    petaMisi.src = "/assets/svg/peta-misi2-bf.svg"; // Mengganti sumber gambar dengan peta misi kedua
  } else if (sourceNode == "M" && destination == "AI") {
    const prevDestination = document
      .getElementById("destination-default")
      .getAttribute("prev-destination");
    if (prevDestination != "M") {
      resetButton();
      notifMisiHTML += `Misi Gagal Diselesaikan<br>`;
      petaMisi.src = "/assets/svg/peta-misi.svg"; // Mengganti sumber gambar dengan peta misi default
      document.getElementById("source-node-default").value = "";
      document.getElementById("destination-default").value = "";
      document
        .getElementById("destination-default")
        .setAttribute("prev-destination", "");
      document.getElementById("output-default").innerHTML = "";
      document.getElementById("run-time-default").innerHTML = "";
      notifMisiElement.innerHTML = notifMisiHTML;
      return;
    }
    resetButton();
    notifMisiHTML += `Misi Ketiga Berhasil Diselesaikan<br>Selamat Anda Telah Membantu CJ Menyelesaikan Misi<br>`;
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    petaMisi.src = "/assets/svg/peta-misi3-bf.svg"; // Mengganti sumber gambar dengan peta misi ketiga
  } else {
    resetButton();
    notifMisiHTML += `Misi Gagal Diselesaikan<br>`;
    document.getElementById("output-default").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    document
      .getElementById("destination-default")
      .setAttribute("prev-destination", "");
    petaMisi.src = "/assets/svg/peta-misi.svg"; // Mengganti sumber gambar dengan peta misi default
  }

  notifMisiHTML += "</pre>";
  notifMisiElement.innerHTML = notifMisiHTML;
  document
    .getElementById("destination-default")
    .setAttribute("prev-destination", destination);
}

function runDijkstraDefault() {
  const sourceNode = document.getElementById("source-node-default").value;
  const destination = document.getElementById("destination-default").value;
  if (sourceNode == "" || destination == "") {
    document.getElementById("output-default").innerHTML =
      "Error: Source Node atau Destination Node tidak boleh kosong";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const graphInput =
    '{"A": {"B": 3}, "B": {"A": 3, "C": 4, "D": 5, "E": 3}, "C": {"B": 4, "H": 6 }, "D": {"B": 5, "F": 2}, "E": {"B": 3, "F": 4, "G": 2}, "F": {"D": 3, "E": 4}, "G": {"E": 2, "H": 4, "J": 3}, "H": {"G": 4, "I": 2, "C": 6}, "I": {"H": 2, "J": 5, "M": 10}, "J": {"G": 3, "I": 5, "K": 1}, "K": {"J": 1, "L": 4}, "L": {"M": 5, "K": 4}, "M": {"O": 2, "L": 5, "I": -10, "N": 6}, "N": {"M": 6, "P": 9}, "O": {"M": 2, "S": 10, "Z": -8}, "P": {"N": 9, "R": 3, "T": 4}, "Q": {"S": 4, "U": 2}, "R": {"P": 3, "AA": 2, "AC": 5}, "S": {"O": 10, "Q": 4, "V": 2}, "T": {"P": 4, "U": 1, "W": 2, "AC": 3}, "U": {"Q": 2, "V": 3, "X": 2, "T": 1}, "V": {"S": 2, "Y": 3, "U": 3}, "W": {"T": 2, "AG": 3}, "X": {"U": 2, "Y": 4}, "Y": {"V": 3, "X": 4}, "Z": {"AK": 3, "AA": 6}, "AA": {"AB": 3, "R": 2, "Z": 6, "AJ": 4}, "AB": {"AA": 3, "AI": 3, "AC": 2.5, "AD": 1.5}, "AC": {"R": 5, "AB": 2.5, "AE": 1.5, "T": 3}, "AD": {"AB": 1.5, "AF": 1.5, "AE": 2}, "AE": {"AC": 1.5, "AG": 1.5, "AD": 2}, "AF": {"AD": 1.5, "AG": 4, "AH": 3}, "AG": {"W": 3, "AF": 4, "AE": 1.5}, "AH": {"AF": 3, "AI": 4, "AO": 2}, "AI": {"AH": 4, "AB": 3, "AJ": 2, "AN": 4}, "AJ": {"AI": 2, "AM": 3, "AK": 5, "AA": 4}, "AK": {"AL": 4, "Z": 3, "AJ": 5}, "AL": {"AK": 4, "AM": 6}, "AM": {"AL": 6, "AJ": 3, "AN": 3}, "AN": {"AM": 3, "AI": 4, "AO": 5}, "AO": {"AN": 5, "AH": 2}}'; // Menambahkan hubungan antara F-M dan M-AI
  const graph = JSON.parse(graphInput);
  if (!graph.hasOwnProperty(sourceNode)) {
    document.getElementById("output-default").innerHTML =
      "Error: Source Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  if (!graph.hasOwnProperty(destination)) {
    document.getElementById("output-default").innerHTML =
      "Error: Destination Node tidak ada di graph";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    return;
  }
  const startTime = performance.now(); // Waktu mulai

  try {
    const { distances, predecessor } = dijkstra(graph, sourceNode);
    const outputElement = document.getElementById("output-default");

    let outputHTML = "<pre>";
    const path = getPath(predecessor, destination);
    outputHTML += `Jalur Ke Tujuan: ${path.join(" -> ")}<br>`;
    outputHTML += `Total Usaha: ${distances[destination]}<br>`;

    outputHTML += "</pre>";

    outputElement.innerHTML = outputHTML;
  } catch (error) {
    document.getElementById("output-default").innerHTML =
      "Error: " + error.message;
  }
  const timeRunElement = document.getElementById("run-time-default");
  const endTime = performance.now(); // Waktu selesai
  const executionTime = endTime - startTime; // Waktu eksekusi dalam milidetik
  let timeRunHTML = "<pre>";
  timeRunHTML += `Waktu Eksekusi Dijkstra: ${executionTime} ms<br>`;
  timeRunHTML += "</pre>";
  timeRunElement.innerHTML = timeRunHTML;
  const notifMisiElement = document.getElementById("notif-misi");
  let notifMisiHTML = "<pre>";
  var petaMisi = document.querySelector(".peta-misi img");

  if (sourceNode == "A" && destination == "F") {
    hideButton(buttonbf);
    notifMisiHTML += `Misi Pertama Berhasil Diselesaikan<br>`;
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    petaMisi.src = "/assets/svg/peta-misi1-d.svg"; // Mengganti sumber gambar dengan peta misi pertama
  } else if (sourceNode == "F" && destination == "M") {
    const prevDestination = document
      .getElementById("destination-default")
      .getAttribute("prev-destination");
    if (prevDestination != "F") {
      resetButton();
      notifMisiHTML += `Misi Gagal Diselesaikan<br>`;
      petaMisi.src = "/assets/svg/peta-misi.svg"; // Mengganti sumber gambar dengan peta misi default
      document.getElementById("source-node-default").value = "";
      document.getElementById("destination-default").value = "";
      document
        .getElementById("destination-default")
        .setAttribute("prev-destination", "");
      document.getElementById("output-default").innerHTML = "";
      document.getElementById("run-time-default").innerHTML = "";
      notifMisiElement.innerHTML = notifMisiHTML;
      return;
    }
    notifMisiHTML += `Misi Kedua Berhasil Diselesaikan<br>`;
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    petaMisi.src = "/assets/svg/peta-misi2-d.svg"; // Mengganti sumber gambar dengan peta misi kedua
  } else if (sourceNode == "M" && destination == "AI") {
    const prevDestination = document
      .getElementById("destination-default")
      .getAttribute("prev-destination");
    if (prevDestination != "M") {
      resetButton();
      notifMisiHTML += `Misi Gagal Diselesaikan<br>`;
      petaMisi.src = "/assets/svg/peta-misi.svg"; // Mengganti sumber gambar dengan peta misi default
      document.getElementById("source-node-default").value = "";
      document.getElementById("destination-default").value = "";
      document
        .getElementById("destination-default")
        .setAttribute("prev-destination", "");
      document.getElementById("output-default").innerHTML = "";
      document.getElementById("run-time-default").innerHTML = "";
      notifMisiElement.innerHTML = notifMisiHTML;
      return;
    }
    notifMisiHTML += `Misi Ketiga Berhasil Diselesaikan<br>Selamat Anda Telah Membantu CJ Menyelesaikan Misi<br>`;
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    resetButton();
    petaMisi.src = "/assets/svg/peta-misi3-d.svg"; // Mengganti sumber gambar dengan peta misi ketiga
  } else {
    resetButton();
    notifMisiHTML += `Misi Gagal Diselesaikan<br>`;
    document.getElementById("output-default").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    document
      .getElementById("destination-default")
      .setAttribute("prev-destination", "");
    petaMisi.src = "/assets/svg/peta-misi.svg"; // Mengganti sumber gambar dengan peta misi default
  }

  notifMisiHTML += "</pre>";
  notifMisiElement.innerHTML = notifMisiHTML;
  document
    .getElementById("destination-default")
    .setAttribute("prev-destination", destination);
}

// Fungsi untuk menjalankan algoritma Dijkstra
// function runDijkstraDefault() {
//   const sourceNode = document.getElementById("source-node-default").value;
//   const destination = document.getElementById("destination-default").value;
//   if (sourceNode == "" || destination == "") {
//     document.getElementById("output-default").innerHTML = "Error: Source Node atau Destination Node tidak boleh kosong";
//     return;
//   }
//   const graph = JSON.parse(graphInput);
//   if (!graph.hasOwnProperty(sourceNode)) {
//     document.getElementById("output-default").innerHTML = "Error: Source Node tidak ada di graph";
//     return;
//   }
//   if (!graph.hasOwnProperty(destination)) {
//     document.getElementById("output-default").innerHTML = "Error: Destination Node tidak ada di graph";
//     return;
//   }
//   const startTime = performance.now(); // Waktu mulai

//   try {
//     const { distances, predecessor } = dijkstra(graph, sourceNode);
//     const outputElement = document.getElementById("output-default");

//     let outputHTML = "<pre>";
//     const path = getPath(predecessor, destination);
//     outputHTML += `Jalur Ke Tujuan: ${path.join(" -> ")}<br>`;
//     outputHTML += `Total Usaha: ${distances[destination]}<br>`;

//     outputHTML += "</pre>";

//     outputElement.innerHTML = outputHTML;
//   } catch (error) {
//     document.getElementById("output-default").innerHTML = "Error: " + error.message;
//   }
//   const timeRunElement = document.getElementById("run-time-default");
//   const endTime = performance.now(); // Waktu selesai
//   const executionTime = endTime - startTime; // Waktu eksekusi dalam milidetik
//   let timeRunHTML = "<pre>";
//   timeRunHTML += `Waktu Eksekusi Dijkstra: ${executionTime} ms<br>`;
//   timeRunHTML += "</pre>";
//   timeRunElement.innerHTML = timeRunHTML;

//     notifMisiHTML += "</pre>";
//     notifMisiElement.innerHTML = notifMisiHTML;
// }
