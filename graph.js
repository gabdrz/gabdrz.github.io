const N = 13;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };

    const Graph = ForceGraph()
      (document.getElementById('graph'))
        .enableZoomInteraction(false)
        .enablePanInteraction(false)
        .linkDirectionalParticles(100)
        .graphData(gData)
        .nodeRelSize([20]);