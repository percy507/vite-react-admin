import * as d3 from 'd3';
import { useCallback } from 'react';

interface ZoomContainerProps extends React.ComponentPropsWithoutRef<'svg'> {}

/** 使用svg+d3js，实现内容块自动缩放 */
export function ZoomContainer(props: ZoomContainerProps) {
  const { children, ...restProps } = props;

  const svgRef = useCallback((el: Element | null) => {
    if (!el) return;
    const svg = d3.select(el);
    const g = svg.select('g');

    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [0, 0],
      ])
      .scaleExtent([0.5, 8])
      .on('zoom', function (event) {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
  }, []);

  return (
    <svg {...restProps} ref={svgRef}>
      <g width="100%" height="100%">
        <foreignObject x={0} y={0} width="100%" height="100%">
          {children}
        </foreignObject>
      </g>
    </svg>
  );
}
