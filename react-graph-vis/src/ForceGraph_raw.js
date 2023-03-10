import React, { Component } from "react";
import Color from "color";
import Graph from "react-graph-vis";
const colors = [
  "rgb(243, 166, 131)",
  "rgb(247, 215, 148)",
  "rgb(119, 139, 235)",
  "rgb(231, 127, 103)",
  "rgb(207, 106, 135)",
  "rgb(241, 144, 102)",
  "rgb(245, 205, 121)",
  "rgb(84, 109, 229)",
  "rgb(225, 95, 65)",
  "rgb(196, 69, 105)",
  "rgb(120, 111, 166)",
  "rgb(248, 165, 194)",
  "rgb(99, 205, 218)",
  "rgb(234, 134, 133)",
  "rgb(89, 98, 117)",
  "rgb(87, 75, 144)",
  "rgb(247, 143, 179)",
  "rgb(61, 193, 211)",
  "rgb(230, 103, 103)",
  "rgb(48, 57, 82)",
  "rgb(252, 92, 101)",
  "rgb(253, 150, 68)",
  "rgb(254, 211, 48)",
  "rgb(38, 222, 129)",
  "rgb(43, 203, 186)",
  "rgb(235, 59, 90)",
  "rgb(250, 130, 49)",
  "rgb(247, 183, 49)",
  "rgb(32, 191, 107)",
  "rgb(15, 185, 177)",
  "rgb(69, 170, 242)",
  "rgb(75, 123, 236)",
  "rgb(165, 94, 234)",
  "rgb(209, 216, 224)",
  "rgb(119, 140, 163)",
  "rgb(45, 152, 218)",
  "rgb(56, 103, 214)",
  "rgb(136, 84, 208)",
  "rgb(165, 177, 194)",
  "rgb(75, 101, 132)"
];

const edges = [
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-feature-flags"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-telemetry"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-ui"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/amkt-addon-discovery",
    to: "@atlassian/react-immutable-proptypes"
  },
  {
    from: "@atlassian/amkt-build-scripts",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/amkt-common",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/amkt-common",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/amkt-common",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/amkt-common",
    to: "@atlassian/react-immutable-proptypes"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/amkt-addon-discovery"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/cs-ari"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/emcee-shell"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-app-listing"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-feature-flags"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-module-kit"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-navigation"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-pricing-utils"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-spi"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-telemetry"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-ui"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/emcee",
    to: "@atlassian/react-immutable-proptypes"
  },
  {
    from: "@atlassian/emcee-shell",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/emcee-shell",
    to: "@atlassian/cs-marketplace-spi"
  },
  {
    from: "@atlassian/emcee-shell",
    to: "@atlassian/mpac-ui"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/amkt-addon-discovery"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-app-listing"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-feature-flags"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-partners"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-services-client"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-site-selection"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-telemetry"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-test-utils"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-ui"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/amkt-frontend",
    to: "@atlassian/react-immutable-proptypes"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/cs-marketplace-spi"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-services-client"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-spi"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/amkt-upm-spi-impl",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-api-client",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/mpac-api-client",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-api-client",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-api-client",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-analytics",
    to: "@atlassian/mpac-feature-flags"
  },
  {
    from: "@atlassian/mpac-analytics",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-spi"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-telemetry"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-ui"
  },
  {
    from: "@atlassian/mpac-app-listing",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-module-kit",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-navigation",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-pricing-utils"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-test-utils"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-ui"
  },
  {
    from: "@atlassian/mpac-partners",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-pricing-utils",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/mpac-pricing-utils",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-pricing-utils",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-pricing-utils",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-services-client",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-services-client",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-site-selection",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/mpac-site-selection",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-site-selection",
    to: "@atlassian/mpac-services-client"
  },
  {
    from: "@atlassian/mpac-site-selection",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-site-selection",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-spi",
    to: "@atlassian/cs-marketplace-spi"
  },
  {
    from: "@atlassian/mpac-spi",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-spi",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-spi",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-spi",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/cs-marketplace-spi"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/mpac-pricing-utils"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/mpac-spi"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-test-utils",
    to: "@atlassian/mpac-utils"
  },
  {
    from: "@atlassian/mpac-types",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-types",
    to: "@atlassian/mpac-spi"
  },
  {
    from: "@atlassian/mpac-utils",
    to: "@atlassian/mpac-fetch-wrapper"
  },
  {
    from: "@atlassian/mpac-utils",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/amkt-common"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-analytics"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-api-client"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-functional-utils"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-spi"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-telemetry"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-types"
  },
  {
    from: "@atlassian/mpac-ui",
    to: "@atlassian/mpac-utils"
  }
];

const nodes = [
  {
    id: "@atlassian/amkt-addon-discovery",
    label: "amkt-addon-discovery"
  },
  {
    id: "@atlassian/amkt-common",
    label: "amkt-common"
  },
  {
    id: "@atlassian/amkt-build-scripts",
    label: "amkt-build-scripts"
  },
  {
    id: "@atlassian/amkt-frontend",
    label: "amkt-frontend"
  },
  {
    id: "@atlassian/emcee",
    label: "emcee"
  },
  {
    id: "@atlassian/amkt-upm-spi-impl",
    label: "amkt-upm-spi-impl"
  },
  {
    id: "@atlassian/emcee-shell",
    label: "emcee-shell"
  },
  {
    id: "@atlassian/mpac-analytics",
    label: "mpac-analytics"
  },
  {
    id: "@atlassian/mpac-app-listing",
    label: "mpac-app-listing"
  },
  {
    id: "@atlassian/mpac-feature-flags",
    label: "mpac-feature-flags"
  },
  {
    id: "@atlassian/mpac-api-client",
    label: "mpac-api-client"
  },
  {
    id: "@atlassian/mpac-fetch-wrapper",
    label: "mpac-fetch-wrapper"
  },
  {
    id: "@atlassian/mpac-module-kit",
    label: "mpac-module-kit"
  },
  {
    id: "@atlassian/mpac-functional-utils",
    label: "mpac-functional-utils"
  },
  {
    id: "@atlassian/mpac-navigation",
    label: "mpac-navigation"
  },
  {
    id: "@atlassian/mpac-partners",
    label: "mpac-partners"
  },
  {
    id: "@atlassian/mpac-pricing-utils",
    label: "mpac-pricing-utils"
  },
  {
    id: "@atlassian/mpac-site-selection",
    label: "mpac-site-selection"
  },
  {
    id: "@atlassian/mpac-services-client",
    label: "mpac-services-client"
  },
  {
    id: "@atlassian/mpac-types",
    label: "mpac-types"
  },
  {
    id: "@atlassian/mpac-test-utils",
    label: "mpac-test-utils"
  },
  {
    id: "@atlassian/mpac-telemetry",
    label: "mpac-telemetry"
  },
  {
    id: "@atlassian/mpac-ui",
    label: "mpac-ui"
  },
  {
    id: "@atlassian/mpac-spi",
    label: "mpac-spi"
  },
  {
    id: "@atlassian/mpac-utils",
    label: "mpac-utils"
  }
].map((c, i) => ({
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
  return hex.length == 1 ? "0" + hex : hex;
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
          width: 0.6,
          color: { opacity: 0.8 }
        })),
        selected: []
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
      <div id="graph" style={{ height: "600px" }}>
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
