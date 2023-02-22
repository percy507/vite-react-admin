import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import moment from 'moment';
import prettyBytes from 'pretty-bytes';
import type { HTMLProps } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './style.module.less';

function generateList(num) {
  return new Array(num).fill(0).map((_, index) => {
    return {
      id: `id__${index + 100}`,
      name: `User${index}`.repeat((index % 7) + 1),
      category: `类型 ${index % 7}`,
      file_size: ~~(Math.random() * 10000000),
      created_at:
        Date.now() +
        ~~(Math.random() * (Math.random() > 0.5 ? 1 : -1) * 93312000000 + 776000000),
    };
  });
}

interface ItemType {
  id: string;
  name: string;
  category: string;
  file_size?: number;
  created_at: number;
}

export function ReactTable() {
  const [data, setData] = useState<ItemType[]>([]);
  const [subdata, setSubdata] = useState(data);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'created_at', desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData(generateList(200));
    setSubdata(generateList(200));
  }, []);

  const columns = useMemo<ColumnDef<ItemType, any>[]>(
    () => [
      {
        id: 'select',
        size: 20,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        header: () => (
          <SearchHeader
            label="标题"
            onSearch={(val) => setSubdata(data.filter((el) => el.name.includes(val)))}
          />
        ),
        accessorKey: 'name',
      },
      {
        header: '分类',
        accessorKey: 'category',
        cell: (info) => info.getValue(),
      },
      {
        header: '数据大小',
        accessorKey: 'file_size',
        size: 60,
        cell: (info) => prettyBytes(info.getValue()),
      },
      {
        header: () => '日期',
        accessorKey: 'created_at',
        cell: (info) => (
          <span>{moment(info.getValue()).format('YYYY-MM-DD HH:mm:ss')}</span>
        ),
      },
    ],
    [data],
  );

  const table = useReactTable<ItemType>({
    data: subdata,
    columns,
    state: { sorting, rowSelection },
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowId: (record) => record.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => tableContainerRef.current,
    count: rows.length,
    estimateSize: () => 35,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className={styles.table}>
      <div className={styles.container} ref={tableContainerRef}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? styles.canSort : ''}
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                    <div
                      className={clsx(
                        styles.resizer,
                        header.column.getIsResizing() ? styles.isResizing : '',
                      )}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<ItemType>;
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>选中的行IDs: {Object.keys(rowSelection).join(',\u0020')}</div>
    </div>
  );
}

interface SearchHeaderProps {
  label: React.ReactNode;
  onSearch?: (value: string) => void;
}

function SearchHeader(props: SearchHeaderProps) {
  const { label, onSearch } = props;
  const [showInput, setShowInput] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onChange = (val: string) => {
    setKeyword(val);
    if (onSearch) onSearch(val);
  };

  const showSearchInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowInput(true);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <span>{label}</span>
      {showInput ? (
        <input
          autoFocus
          type="text"
          value={keyword}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => !keyword && setShowInput(false)}
        />
      ) : (
        <span style={{ margin: '0 7px' }} onClick={(e) => showSearchInput(e)}>
          🔍
        </span>
      )}
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
