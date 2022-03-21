import './band-name.component.css';
import React from 'react';

export function BandName(props: { name: string }) {
  return <div className="band-name">{props.name}</div>;
}
