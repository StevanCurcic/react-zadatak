import { BandName } from './band-name.component';
import './band-list.component.css';
import React from 'react';

export function BandList(props: { names: string[] }) {
  return (
    <div className="list-container">
      {props.names.map((name) => (
        <BandName name={name} />
      ))}
    </div>
  );
}
