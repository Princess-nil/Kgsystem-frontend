<template>
  <div id="knowledge-graph">
    <div class="graph-container">
      <svg ref="svg">
        <defs>
          <marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" viewBox="0 0 12 12" refX="13" refY="6" orient="auto">
            <path d="M2,2 L10,6 L2,10 L6,6 L2,2" />
          </marker>
        </defs>
      </svg>
    </div>
    <div class="sidebar">
      <div v-if="selectedNode">
        <h2>{{ selectedNode.label }}</h2>
        <p>Node ID: {{ selectedNode.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      selectedNode: null,
      nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' }
      ],

      links: [
        { source: 3, target: 4, rels: 'aaaa' },
        { source: 4, target: 1, rels: '父亲' }
      ]
    };
  },
  mounted() {
    const width = 800;
    const height = 600;

    const svg = d3.select(this.$refs.svg)
      .attr('width', width)
      .attr('height', height);
  const defs = svg.append("defs");
  const node = svg.selectAll('.node')
      .data(this.nodes)
      .enter().append('g')
      .attr('class', 'node');

    node.append('circle')
      .attr('r', 30)
      .attr('fill', '#38B0DE');

    node.append('text')
      .text(d => d.label)
      .attr('dy', 5)
      .style('text-anchor', 'middle')
      .style('fill', '#000000')
      .style("font-size", "12px");

    node.on('click', (event, d) => {
      this.showNodeDetails(d);
    });


  const arrowMarker = defs.append("marker")
        .attr("id","arrow")
        .attr("markerUnits","strokeWidth")
        .attr("markerWidth","8")
        .attr("markerHeight","8")
        .attr("viewBox","0 0 12 12")
        .attr("refX","13")
        .attr("refY","6")
        .attr("orient","auto");

  const arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

  arrowMarker.append("path")
        .attr("d",arrow_path)
        .attr("fill","#999");


    const simulation = d3.forceSimulation(this.nodes)
      .force('link', d3.forceLink(this.links).id(d => d.id).distance(200))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll('.link')
      .data(this.links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke', '#ccc')
      .attr("marker-end","url(#arrow)");

    link.attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    const linkText = svg.selectAll('.link-text')
      .data(this.links)
      .enter().append('text')
      .attr('class', 'link-text')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .attr('dy', -5)
      .style('text-anchor', 'middle')
      .style('fill', '#666')
      .text(d => d.rels);

    const updateLinkTextPositions = () => {
      linkText.attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);
    };

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      updateLinkTextPositions();

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    
    const zoom = d3.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    svg.call(zoom);

    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);




 // 在mounted函数中添加以下代码
node.on('contextmenu', (event, d) => {
  event.preventDefault(); // 阻止默认的右键菜单

  // 定义圆环菜单的参数
  const menuRadius = 58; // 菜单的外半径
  const menuWidth = 25; // 菜单的宽度
  const gap = 0.02; // 菜单项之间的缝隙大小（以弧度为单位）
  const menuItems = ['编辑', '删除', '展开']; // 菜单项

  // 移除旧的菜单
  svg.selectAll('.context-menu').remove();

  // 创建菜单容器
  const menu = svg.append('g')
    .attr('class', 'context-menu')
    .attr('transform', `translate(${d.x},${d.y})`);

  // 绘制圆环菜单项并添加交互效果
  menu.selectAll('path')
    .data(menuItems)
    .enter()
    .append('path')
    .attr('d', (d, i) => d3.arc()
      .innerRadius(menuRadius - menuWidth)
      .outerRadius(menuRadius)
      .startAngle(i * (2 * Math.PI / menuItems.length) + gap)
      .endAngle((i + 1) * (2 * Math.PI / menuItems.length) - gap)
      ())
    .attr('fill', '#ccc')
    .on('mouseover', function() {
      d3.select(this).attr('fill', 'orange'); // 高亮显示
    })
    .on('mouseout', function() {
      d3.select(this).attr('fill', '#ccc'); // 移除高亮
    })
    .on('click', function(event, item) {
      // 处理点击事件
      console.log(`点击了菜单项: ${item}`);
      // 根据需要添加更多的点击事件处理逻辑
    });

  // 添加菜单文本
  menu.selectAll('text')
    .data(menuItems)
    .enter()
    .append('text')
    .attr('transform', (d, i) => {
      const angle = (i + 0.5) * (2 * Math.PI / menuItems.length);
      const x = (menuRadius - menuWidth / 2) * Math.sin(angle);
      const y = -(menuRadius - menuWidth / 2) * Math.cos(angle);
      return `translate(${x},${y})`;
    })
    .attr('text-anchor', 'middle')
    .text(d => d);
});

// 添加一个全局事件监听器来关闭菜单
d3.select('body').on('click', () => {
  svg.selectAll('.context-menu').remove();
});


  },

  methods: {
    showNodeDetails(d) {
      this.selectedNode = d;
    }
    
  }
}
</script>

<style>
#knowledge-graph {
  display: flex;
}

.graph-container {
  flex: 1;
  text-align: center;
}
.sidebar {
  flex: 0 0 200px;
  background-color: #f0f0f0;
  padding: 20px;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.link-text {
  font-size: 15px;
}
</style>
