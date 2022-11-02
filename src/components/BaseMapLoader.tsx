import React from 'react'; // we need this to make JSX compile

type BaseMapLoaderProps = {
  title: string,
  paragraph: string
}

export const BaseMapLoader = ({ title, paragraph }: BaseMapLoaderProps) => <aside>
  <h2>{ title }</h2>
  <p>
    { paragraph }
  </p>
</aside>

const el = <BaseMapLoader title="Welcome!" paragraph="To this example" />