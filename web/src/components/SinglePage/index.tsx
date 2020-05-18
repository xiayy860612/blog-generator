import React from 'react';

export interface SinglePageProps {
  category: string,
  article: string
}

const SinglePage: React.FC<SinglePageProps> = (props: SinglePageProps) => {
  return (
  <div>Single {props.article}</div>
  );
}

export default SinglePage;