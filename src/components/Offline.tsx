import React from 'react'; // we need this to make JSX compile

type OfflineProps = {
  title: string,
  paragraph: string
}

export const OfflineProps = ({ title, paragraph }: OfflineProps) => <aside>
  <h2>{ title }</h2>
  <p>
    { paragraph }
  </p>
</aside>

const el = <OfflineProps title="Welcome!" paragraph="To this example" />