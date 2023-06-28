// Based on https://bulma.io/documentation/elements/content/
import { ReactNode } from 'react';
import { StyledContent } from './styles';

interface IContentProps {
  children: ReactNode;
  tag?:
    | 'div'
    | 'p'
    | 'ul'
    | 'ol'
    | 'dl'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'blockquote'
    | 'em'
    | 'strong'
    | 'table'
    | 'tr'
    | 'th'
    | 'td';
  hasTextCentered?: boolean;
}

export default function Content({
  children,
  tag = 'div',
  hasTextCentered = false,
}: IContentProps) {
  return (
    <StyledContent
      className='content'
      as={tag}
      $hasTextCentered={hasTextCentered}
    >
      {children}
    </StyledContent>
  );
}
