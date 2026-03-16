class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = new Map();
    this.isDirected = isDirected;
  }

  // Adds a vertex to the graph if it doesn't exist
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set()); // Use Set for O(1) edge lookups
    }
  }

  // Adds an edge between two vertices
  addEdge(source, destination) {
    // Ensure vertices exist (Defensive Programming)
    this.addVertex(source);
    this.addVertex(destination);

    this.adjacencyList.get(source).add(destination);
    
    if (!this.isDirected) {
      this.adjacencyList.get(destination).add(source);
    }
  }

  // Removes an edge between two vertices
  removeEdge(source, destination) {
    if (this.adjacencyList.has(source)) {
      this.adjacencyList.get(source).delete(destination);
    }
    
    if (!this.isDirected && this.adjacencyList.has(destination)) {
      this.adjacencyList.get(destination).delete(source);
    }
  }

  // Checks if an edge exists
  hasEdge(source, destination) {
    return this.adjacencyList.has(source) && 
           this.adjacencyList.get(source).has(destination);
  }

  /**
   * Breadth-First Search (BFS)
   * Best for: Finding the shortest path in unweighted graphs.
   */
  bfs(startNode) {
    if (!this.adjacencyList.has(startNode)) return [];

    const queue = [startNode];
    const visited = new Set([startNode]);
    const result = [];

    while (queue.length > 0) {
      const vertex = queue.shift(); // FIFO
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  /**
   * Depth-First Search (DFS)
   * Best for: Topological sorting, cycle detection, and pathfinding.
   */
  dfs(startNode) {
    const visited = new Set();
    const result = [];

    const traverse = (vertex) => {
      if (!vertex || visited.has(vertex)) return;

      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)) {
        traverse(neighbor);
      }
    };

    traverse(startNode);
    return result;
  }

  print() {
    for (let [vertex, edges] of this.adjacencyList) {
      console.log(`${vertex} -> ${[...edges].join(", ")}`);
    }
  }
}

// --- Testing Section ---

const socialGraph = new Graph(false); // Undirected

socialGraph.addEdge("Alice", "Bob");
socialGraph.addEdge("Alice", "Charlie");
socialGraph.addEdge("Bob", "David");
socialGraph.addEdge("Charlie", "Eve");
socialGraph.addEdge("David", "Eve");

console.log("Graph Structure:");
socialGraph.print();

console.log("\nBFS Traversal (starting from Alice):", socialGraph.bfs("Alice"));
// Expected: Alice, Bob, Charlie, David, Eve (Level by level)

console.log("DFS Traversal (starting from Alice):", socialGraph.dfs("Alice"));
// Expected: Alice, Bob, David, Eve, Charlie (Branch by branch)
