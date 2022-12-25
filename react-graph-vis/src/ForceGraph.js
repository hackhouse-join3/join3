import React, { Component } from "react";
import Color from "color";
import Graph from "react-graph-vis";
import colors from './colors';
import edges from './edges';
import node from './node'

/*
这里直接 fetch API，
将数据注入到变量 edges 和 nodes 里即可。
*/

const nodes = node.map((c, i) => ({
  ...c,
  color: {
    border: Color(colors[i]).darken(0.2).hex(),
    background: colors[i],
    highlight: {
      border: Color(colors[i]).darken(0.3).hex(),
      background: Color(colors[i]).darken(0.2).hex()
    },
    hover: {
      border: Color(colors[i]).darken(0.3).hex(),
      background: Color(colors[i]).darken(0.2).hex()
    }
  }
}));

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(col) {
  const [r, g, b] = col.split("(")[1].split(")")[0];
  const c = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return c.replace(",", "").trim();
}

class ForceGraph extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        layout: {
          randomSeed: 23,
          hierarchical: {
            enabled: true,
            levelSeparation: 40,
            nodeSpacing: 300,
            treeSpacing: 100,
            blockShifting: true,
            edgeMinimization: true,
            direction: "LR",
            sortMethod: "hubsize"
          }
        },
        edges: {
          smooth: {
            enabled: true,
            type: "dynamic",
            roundness: 1
          },
          arrows: {
            from: {
              enabled: true,
              scaleFactor: 0.7
            },
            to: {
              enabled: false
            }
          }
        },
        nodes: {
          shape: "box",
          font: {
            face: "Circular, Futura",
            color: "#fff",
            size: 15
          },
          color: {
            border: "red"
          },
          margin: {
            top: 7,
            bottom: 7,
            left: 10,
            right: 10
          },
          mass: 1
        },
        physics: {
          hierarchicalRepulsion: {
            centralGravity: 1,
            springLength: 200,
            springConstant: 0.1,
            nodeDistance: 150,
            damping: 1
          },
          maxVelocity: 500,
          minVelocity: 3,
          solver: "barnesHut",
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
          },
          timestep: 0.5
        },
        interaction: {
          hover: true,
          hoverConnectedEdges: true,
          multiselect: true,
          dragView: false,
          zoomView: false
        }
      },
      graph: {
        nodes,
        edges: edges.map((e) => ({
          ...e,
          width: 1.6,  //0.6,
          color: { opacity: 0.8 }
        })),
        // selected: ["0","1","2"]
      }
    };
    console.log("graph init", this.state.graph);
  }

  componentDidMount() {
    document.addEventListener("mousedown", (e) => {});
    document.addEventListener("mousemove", (e) => {});
  }

  network = {};

  refreshSelection = (selected) => {
    this.setState(
      {
        graph: {
          ...this.state.graph,
          nodes: nodes.map((n) => {
            const selectedNodes = this.state.graph.edges
              .filter((edge) =>
                selected.some((n) => edge.from === n || edge.to === n)
              )
              .flatMap((edge) => [edge.to, edge.from]);

            const isSelected =
              selected.length === 0 || selectedNodes.some((s) => s === n.id);

            return {
              ...n,
              font: {
                ...n.font,
                color: isSelected ? "white" : "rgba(255,255,255, 0.9)"
              },
              color: {
                ...n.color,
                opacity: 0.3,
                border: isSelected ? n.color.border : "rgba(0,0,0,0.2)",
                background: isSelected
                  ? n.color.background
                  : "rgba(30,30,30,0.15)"
              }
            };
          }),
          edges: edges.map((e) => {
            const isSelected =
              selected.length === 0 ||
              selected.some((n) => e.from === n || e.to === n);
            return {
              ...e,
              width: selected.length > 0 && isSelected ? 2.5 : 0.6,
              color: {
                opacity: isSelected ? 1 : 0.3
              },
              arrows: {
                ...e.arrows
              }
            };
          })
        }
      },
      () => {
        this.network.fit();
      }
    );
  };

  events = {
    dragStart: (event) => {},
    dragEnd: (event) => {
      console.log("dragged");
    },
    selectNode: (event) => {
      this.refreshSelection(event.nodes);
    },
    deselectNode: (event) => {
      this.refreshSelection(event.nodes);
    }
  };

  render() {
    return (
      <div id="graph" style={{ width:"100%" ,height: "600px" }}>
        <Graph
          graph={this.state.graph}
          options={this.state.options}
          events={this.events}
          getNetwork={(network) => {
            this.network = network;
            setTimeout(() => network.fit(), 2000);
          }}
        />
      </div>
    );
  }
}

export default ForceGraph;
