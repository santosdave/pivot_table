import React from 'react';
import /* styles from */ '../../styles/Head.css';
import Heading from './Heading';
import { HeadProps } from './HeadProps';
import Title from './Title';

/**
 * The head section of the pivot table.
 *
 * @param props The properties of the pivot table head.
 *
 * @returns The rendered pivot table head.
 *
 * @template T The type of record comprising the dataset being aggregated.
 */
 export default function Head<T>(props: HeadProps<T>): JSX.Element {
    const { columnDimensions, rowDimensions, title } = props;
  
    const [columnDimension] = columnDimensions;
  
    return (
      <thead className={"head"}>
        <Title
          columnDimensions={[columnDimension]}
          rowDimensions={rowDimensions}
          title={title}
        />
  
        <Heading
          columnDimensions={[columnDimension]}
          rowDimensions={rowDimensions}
        />
      </thead>
    );
  }
  