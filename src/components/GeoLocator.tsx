import React from 'react'; // we need this to make JSX compile

type GeoLocatorProps = {
  title: string,
  paragraph: string
}

export const GeoLocator = ({ title, paragraph }: GeoLocatorProps) => <aside>
  <h2>{ title }</h2>
  <p>
    { paragraph }
  </p>
</aside>

const el = <GeoLocator title="Welcome!" paragraph="To this example" />