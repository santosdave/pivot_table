import { AggregatorProps } from '../../util/aggregation';
import { DimensionValue } from '../../util/dimenssions';
import { RowData } from '../rows';
import { SectionProps } from './SectionProps';

/**
 * The properties of a subsection within the pivot table.
 *
 * @template T The type of record comprising the dataset being aggregated.
 * @template M The property of {@link T} being aggregated.
 */
export type SubsectionProps<T, M extends keyof T> =
  AggregatorProps<T, M> &
  Pick<SectionProps<T, M>, 'rowData'> & {
    /**
     * The row dimension values being aggregated in the subsection.
     */
    dimensionValues: Array<DimensionValue<T>>;

    /**
     * The zero-based nesting level of the subsection.
     */
    level: number;

    /**
     * Fired when the user attempts to collapse the containing section.
     */
    onCollapse?: () => void;

    /**
     * The aggregated data to display in the subsection.
     */
    subsectionData: Array<RowData<T>>;
  };
