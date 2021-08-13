import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Aggregator, Dimension, TitleNames } from '../util';
import PivotTable from '../components/PivotTable';

const collapse = '\u2212';
const expand = '\u002b';

const total = 'Grand total';

const arrayValues = [
  ['a'],
  ['b', 'c'],
  ['d', 'e', 'f'],
  ['g'],
  ['h'],
  ['ij'],
  ['k', 'l'],
  ['m'],
  ['n'],
  ['o']
];

describe('PivotTable', () => {
  let body: HTMLTableSectionElement;
  let foot: HTMLTableSectionElement;
  let head: HTMLTableSectionElement;
  let table: HTMLTableElement;

  test('formats long numbers readably', async () => {
    const testCase: TestCase<'numberProp1'> = {
      aggregator: {
        aggregate: (value1: number, value2: number) => value1 + value2,
        default: 0
      },
      columnDimensions: [{ name: 'Array Property', property: 'arrayProp' }],
      data: [
        /* eslint-disable max-len */
        { arrayProp: arrayValues[1], numberProp1: 999, numberProp2: 0, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[2], numberProp1: 1000000, numberProp2: 0, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[0], numberProp1: 100000, numberProp2: 0, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[1], numberProp1: 1, numberProp2: 0, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[2], numberProp1: 99999999, numberProp2: 0, numberProp3: 0, stringProp: 'bar' }
        /* eslint-enable max-len */
      ],
      expectedContent: [
        ['String Property', 'b,c', 'd,e,f', 'a'],
        ['foo', '999', '1,000,000', '0'],
        ['bar', '1', '99,999,999', '100,000'],
        [total, '1,000', '100,999,999', '100,000']
      ],
      metric: 'numberProp1',
      rowDimensions: [{ name: 'String Property', property: 'stringProp' }]
    };

    await renderTable(testCase);

    assertTableContent(testCase.expectedContent);
  });

  describe.each(getAggregateCases())('when aggregating', testCase => {
    describe('always', () => {
      const { expectedContent } = testCase;

      beforeEach(async () => {
        await renderTable(testCase);
      });

      test('has the same number of cells in every row', () => {
        const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>(
          'tbody tr, tfoot tr, thead tr'
        ));

        const [firstRow] = rows;

        const firstRowCells = toCellCount(firstRow);

        const actualCells = rows.map(toCellCount);

        const expectedCells = rows.map(() => firstRowCells);

        expect(actualCells).toEqual(expectedCells);

        function toCellCount({ cells }: HTMLTableRowElement) {
          return Array
            .from(cells)
            .map(({ colSpan }) => colSpan)
            .reduce((span1, span2) => span1 + span2);
        }
      });

      test('aggregates the data along the specified dimensions using the specified aggregator', () => {
        assertTableContent(expectedContent);
      });

      if (expectedContent.some(collapses)) {
        describe('when the user clicks a collapse button', () => {
          let collapseText: string;
          let expandText: string;

          beforeEach(() => {
            const buttons = screen.getAllByRole('button');

            const button =
              buttons[Math.floor(Math.random() * Math.floor(buttons.length))];

            collapseText = button.textContent as string;

            expandText = `${collapseText.replace(collapse, expand)} total`;

            fireEvent.click(button);
          });

          test('shows an expandable total row instead of the section', () => {
            const sectionStart =
              expectedContent.findIndex(([text]) => text === collapseText);

            const sectionEnd = expectedContent
              .map((row, i) => ({ i, row }))
              .findIndex(
                ({ i, row }) => i > sectionStart && row[0].endsWith('total')
              );

            const collapsedContent = [...expectedContent];

            collapsedContent.splice(
              sectionStart,
              sectionEnd + 1 - sectionStart,
              [expandText, ...expectedContent[sectionEnd].slice(1)]
            );

            assertTableContent(collapsedContent);
          });

          describe('and the user clicks the expand button', () => {
            beforeEach(() => {
              const expandButton = screen.getByText(expandText.slice(1));

              fireEvent.click(expandButton);
            });

            test('shows the original content', () => {
              assertTableContent(expectedContent);
            });
          });
        });
      }

      function collapses(row: string[]) {
        return row[0].startsWith(collapse);
      }
    });

    describe.each([undefined, {}])('and no title is specified', title => {
      beforeEach(async () => {
        await renderTable({ ...testCase, title });
      });

      test('displays no title row', () => {
        expect(head.rows.length).toBe(1);
      });
    });

    describe.each(getTitleCases())('and any title is specified', ({ expectedTitles, title }) => {
      beforeEach(async () => {
        await renderTable({ ...testCase, title });
      });

      test('displays the specified titles', () => {
        const titles = Array
          .from(head.rows[0].cells)
          .filter(notShadowCell)
          .map(cell => cell.textContent);

        expect(titles).toEqual(expectedTitles);
      });
    });
  });

  function assertTableContent(expectedContent: string[][]) {
    const bodyRows = Array
      .from(body.rows)
      .map(({ cells }) => Array.from(cells).filter(notShadowCell));

    const [headingCells, footCells] = [head, foot].map(
      ({ rows }) =>
        Array
          .from(rows[rows.length - 1].cells)
          .filter(notShadowCell)
          .map(toContent)
    );

    const actualContent = [
      headingCells,
      ...bodyRows.map(row => row.map(toContent)),
      footCells
    ];

    expect(actualContent).toEqual(expectedContent);

    function toContent({ textContent }: HTMLTableCellElement) {
      return textContent?.trim();
    }
  }

  function notShadowCell(cell: HTMLTableCellElement) {
    return !cell.matches('td:first-of-type');
  }

  async function renderTable<T extends keyof TestRecord>(
    testCase: TestCase<T>
  ) {
    const {
      aggregator,
      columnDimensions,
      data,
      metric,
      rowDimensions,
      title
    } = testCase;

    render(
        
      <PivotTable
        aggregator={aggregator}
        columnDimensions={[columnDimensions[0]]}
        data={data}
        metric={metric}
        rowDimensions={rowDimensions}
        title={title}
      />
    );

    table = await waitFor(() => screen.getByRole('table')) as HTMLTableElement;

    body = table.tBodies.item(0) as HTMLTableSectionElement;

    foot = table.tFoot as HTMLTableSectionElement;
    head = table.tHead as HTMLTableSectionElement;
  }
});

interface TestCase<T extends keyof TestRecord> {
  aggregator: Aggregator<TestRecord[T]>;
  columnDimensions: [Dimension<TestRecord>];
  data: TestRecord[];
  expectedContent: string[][];
  metric: T;
  rowDimensions: Array<Dimension<TestRecord>>;
  title?: TitleNames;
}

interface TestRecord {
  arrayProp: unknown[];
  numberProp1: number;
  numberProp2: number;
  numberProp3: number;
  stringProp: string;
}

function getAggregateCases() {
  const arrayDimension = { name: 'Array Property', property: 'arrayProp' };

  const numberDimension1 = { name: 'Num Prop 1', property: 'numberProp1' };

  const numberDimension2 = { name: 'NumProp2', property: 'numberProp2' };

  const numberDimension3 = { name: 'NumberProperty3', property: 'numberProp3' };

  const aggregator: Aggregator<string> = {
    aggregate:
      (previousValue: string, currentValue: string) =>
        `${previousValue}x${currentValue}`,
    default: 'testDefaultValue'
  };

  /* eslint-disable max-len */
  return [
    {
      aggregator,
      columnDimensions: [arrayDimension],
      data: [],
      expectedContent: [
        ['Num Prop 1', ''],
        [total, '']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1]
    },
    {
      aggregator,
      // 1 dimension, 1 row, 1 column, 1 record
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 0, numberProp3: 0, stringProp: 'foo' }
      ],
      expectedContent: [
        ['Num Prop 1', 'a'],
        ['1', 'foo'],
        [total, 'foo']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1]
    },
    {
      aggregator,
      // 1 dimension, 1 row, 1 column, 5 records
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'baz' },
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'girp' },
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'qwop' }
      ],
      expectedContent: [
        ['Num Prop 1', 'a'],
        ['13', 'fooxbarxbazxgirpxqwop'],
        [total, 'fooxbarxbazxgirpxqwop']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1]
    },
    {
      aggregator,
      // 1 dimension, 1 row, 5 columns, 5 records
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[1], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[2], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'baz' },
        { arrayProp: arrayValues[3], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'girp' },
        { arrayProp: arrayValues[4], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'qwop' }
      ],
      expectedContent: [
        ['Num Prop 1', 'a', 'b,c', 'd,e,f', 'g', 'h'],
        ['13', 'foo', 'bar', 'baz', 'girp', 'qwop'],
        [total, 'foo', 'bar', 'baz', 'girp', 'qwop']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1]
    },
    {
      aggregator,
      // 1 dimension, 5 rows, 1 column, 5 records
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 13, numberProp2: 0, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[0], numberProp1: 35, numberProp2: 0, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[0], numberProp1: 57, numberProp2: 0, numberProp3: 0, stringProp: 'baz' },
        { arrayProp: arrayValues[0], numberProp1: 79, numberProp2: 0, numberProp3: 0, stringProp: 'girp' },
        { arrayProp: arrayValues[0], numberProp1: 91, numberProp2: 0, numberProp3: 0, stringProp: 'qwop' }
      ],
      expectedContent: [
        ['Num Prop 1', 'a'],
        ['13', 'foo'],
        ['35', 'bar'],
        ['57', 'baz'],
        ['79', 'girp'],
        ['91', 'qwop'],
        [total, 'fooxbarxbazxgirpxqwop']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1]
    },
    {
      aggregator,
      // 2 dimensions, 1 row, 1 column, 1 record
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'foo' }
      ],
      expectedContent: [
        ['Num Prop 1', 'NumProp2', 'a'],
        ['1', '2', 'foo'],
        [total, 'foo']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1, numberDimension2]
    },
    {
      aggregator,
      // 2 dimensions, x rows, 1 column, 10 records
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'baz' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'girp' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'qwop' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 4, numberProp3: 0, stringProp: 'asdf' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 4, numberProp3: 0, stringProp: 'zxcv' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 4, numberProp3: 0, stringProp: 'qwerty' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 6, numberProp3: 0, stringProp: 'blah' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 6, numberProp3: 0, stringProp: 'bleb' }
      ],
      expectedContent: [
        ['Num Prop 1', 'NumProp2', 'a'],
        ['1', '2', 'fooxbarxbazxgirpxqwop'],
        [`${collapse}2`, '4', 'asdfxzxcvxqwerty'],
        ['', '6', 'blahxbleb'],
        ['2 total', '', 'asdfxzxcvxqwertyxblahxbleb'],
        [total, 'fooxbarxbazxgirpxqwopxasdfxzxcvxqwertyxblahxbleb']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1, numberDimension2]
    },
    {
      aggregator,
      // 2 dimensions, 1 row, 10 columns, 10 records
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'foo' },
        { arrayProp: arrayValues[1], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'bar' },
        { arrayProp: arrayValues[2], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'baz' },
        { arrayProp: arrayValues[3], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'girp' },
        { arrayProp: arrayValues[4], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'qwop' },
        { arrayProp: arrayValues[5], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'asdf' },
        { arrayProp: arrayValues[6], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'zxcv' },
        { arrayProp: arrayValues[7], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'qwerty' },
        { arrayProp: arrayValues[8], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'blah' },
        { arrayProp: arrayValues[9], numberProp1: 1, numberProp2: 2, numberProp3: 0, stringProp: 'bleb' }
      ],
      expectedContent: [
        ['Num Prop 1', 'NumProp2', 'a', 'b,c', 'd,e,f', 'g', 'h', 'ij', 'k,l', 'm', 'n', 'o'],
        ['1', '2', 'foo', 'bar', 'baz', 'girp', 'qwop', 'asdf', 'zxcv', 'qwerty', 'blah', 'bleb'],
        [total, 'foo', 'bar', 'baz', 'girp', 'qwop', 'asdf', 'zxcv', 'qwerty', 'blah', 'bleb']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1, numberDimension2]
    },
    {
      aggregator,
      // 3 dimensions, x rows, x columns, 20 records
      columnDimensions: [arrayDimension],
      data: [
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 5, numberProp3: 8, stringProp: 'foo' },
        { arrayProp: arrayValues[0], numberProp1: 3, numberProp2: 6, numberProp3: 9, stringProp: 'bar' },
        { arrayProp: arrayValues[1], numberProp1: 3, numberProp2: 4, numberProp3: 8, stringProp: 'baz' },
        { arrayProp: arrayValues[1], numberProp1: 1, numberProp2: 5, numberProp3: 9, stringProp: 'girp' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 5, numberProp3: 7, stringProp: 'qwop' },
        { arrayProp: arrayValues[1], numberProp1: 3, numberProp2: 5, numberProp3: 8, stringProp: 'asdf' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 6, numberProp3: 8, stringProp: 'zxcv' },
        { arrayProp: arrayValues[1], numberProp1: 1, numberProp2: 6, numberProp3: 8, stringProp: 'qwerty' },
        { arrayProp: arrayValues[0], numberProp1: 3, numberProp2: 5, numberProp3: 7, stringProp: 'blah' },
        { arrayProp: arrayValues[0], numberProp1: 3, numberProp2: 4, numberProp3: 7, stringProp: 'bleb' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 5, numberProp3: 8, stringProp: 'qw' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 4, numberProp3: 9, stringProp: 'er' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 4, numberProp3: 7, stringProp: 'ty' },
        { arrayProp: arrayValues[1], numberProp1: 3, numberProp2: 5, numberProp3: 7, stringProp: 'ui' },
        { arrayProp: arrayValues[1], numberProp1: 3, numberProp2: 6, numberProp3: 7, stringProp: 'op' },
        { arrayProp: arrayValues[1], numberProp1: 2, numberProp2: 4, numberProp3: 8, stringProp: 'as' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 5, numberProp3: 8, stringProp: 'df' },
        { arrayProp: arrayValues[0], numberProp1: 2, numberProp2: 4, numberProp3: 7, stringProp: 'gh' },
        { arrayProp: arrayValues[1], numberProp1: 2, numberProp2: 5, numberProp3: 9, stringProp: 'jk' },
        { arrayProp: arrayValues[0], numberProp1: 1, numberProp2: 5, numberProp3: 9, stringProp: 'l;' }
      ],
      expectedContent: [
        ['Num Prop 1', 'NumProp2', 'NumberProperty3', 'a', 'b,c'],
        [`${collapse}2`, '5', '8', 'fooxqw', 'testDefaultValue'],
        ['', '', '9', 'testDefaultValue', 'jk'],
        ['', '', '7', 'qwop', 'testDefaultValue'],
        ['', '4', '8', 'testDefaultValue', 'as'],
        ['', '', '9', 'er', 'testDefaultValue'],
        ['', '', '7', 'tyxgh', 'testDefaultValue'],
        ['2 total', '', '', 'fooxqwopxqwxerxtyxgh', 'asxjk'],
        [`${collapse}3`, '5', '8', 'testDefaultValue', 'asdf'],
        ['', '', '7', 'blah', 'ui'],
        ['', '6', '9', 'bar', 'testDefaultValue'],
        ['', '', '7', 'testDefaultValue', 'op'],
        ['', '4', '8', 'testDefaultValue', 'baz'],
        ['', '', '7', 'bleb', 'testDefaultValue'],
        ['3 total', '', '', 'barxblahxbleb', 'bazxasdfxuixop'],
        [`${collapse}1`, '5', '8', 'df', 'testDefaultValue'],
        ['', '', '9', 'l;', 'girp'],
        ['', '6', '8', 'zxcv', 'qwerty'],
        ['1 total', '', '', 'zxcvxdfxl;', 'girpxqwerty'],
        [total, 'fooxbarxqwopxzxcvxblahxblebxqwxerxtyxdfxghxl;', 'bazxgirpxasdfxqwertyxuixopxasxjk']
      ],
      metric: 'stringProp',
      rowDimensions: [numberDimension1, numberDimension2, numberDimension3]
    }
  ] as Array<TestCase<'stringProp'>>;
  /* eslint-enable max-len */
}

function getTitleCases() {
  return [
    {
      expectedTitles: ['', 'testColumnTitle'],
      title: { column: 'testColumnTitle' }
    },
    {
      expectedTitles: ['testRowTitle', ''],
      title: { row: 'testRowTitle' }
    },
    {
      expectedTitles: ['testRowTitle', 'testColumnTitle'],
      title: { column: 'testColumnTitle', row: 'testRowTitle' }
    }
  ];
}
