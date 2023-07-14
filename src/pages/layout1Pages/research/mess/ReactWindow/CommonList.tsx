import { useMeasure } from 'react-use';
import type { FixedSizeListProps } from 'react-window';
import { FixedSizeList } from 'react-window';

export interface CommonListProps
  extends Omit<FixedSizeListProps, 'width' | 'height' | 'children'> {
  /** The width of list wrapper element. Default is `100%`. */
  width?: number | string;
  /** The height of list wrapper element. Default is `100%`. */
  height?: number | string;
  renderRow: FixedSizeListProps['children'];
}

export function CommonList(props: CommonListProps) {
  const { width = '100%', height = '100%', renderRow, ...restProps } = props;
  const [listRootRef, listRootBounds] = useMeasure<HTMLDivElement>();

  return (
    <div role="common_list_root" style={{ width, height }} ref={listRootRef}>
      <FixedSizeList
        width={listRootBounds.width}
        height={listRootBounds.height}
        {...restProps}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}
