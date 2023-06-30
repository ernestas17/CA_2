/*
Strategy for making a select box from scratch in React
 - Select options are passed as props, preferably as children elements, only with data relevant to business logic
 - Selected item state is tracked with numeric index, making it easy to navigate with arrow keys
 - Data from currently selected item should be displayed in the box header
*/

import { useState, ReactNode, SyntheticEvent, KeyboardEvent } from 'react';
import React from 'react';
import {
  StyledSelectBox,
  StyledSelectDropdown,
  StyledSelectItem,
} from './styles';

interface ISelectItemProps {
  value: string | number | boolean;
  displayTitle?: string;
  isActive?: boolean;
  callback?: () => void;
}

export function SelectItem({
  value,
  displayTitle,
  isActive = false,
  callback,
}: ISelectItemProps) {
  const onSelect = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback && callback();
  };

  return (
    <StyledSelectItem $isActive={isActive} onClick={onSelect}>
      {displayTitle ?? value.toString()}
    </StyledSelectItem>
  );
}

interface ISelectProps {
  children: ReactNode;
  // setvalue?: React.Dispatch<React.SetStateAction<string | number | boolean>>;
}

export default function Select({ children }: ISelectProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // activeIndex should not get confirmed while expanded
  //TODO: make externally available callback to handle "submit" state change

  const toggleExpand = () => setExpanded((prev) => !prev);
  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);

  const optionRefs = (Array.isArray(children) ? children : []).map(() =>
    React.createRef<HTMLElement>()
  );

  // const getValueByIndex = (index: number | null) => {};

  const clickHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    toggleExpand();
  };

  const keyboardHandler = (e: KeyboardEvent) => {
    e.stopPropagation();
    switch (e.code) {
      case 'Escape':
        collapse();
        break;
      case 'Enter':
      case 'Space':
        toggleExpand();
        break;
      case 'ArrowDown':
        setActiveIndex((prev) =>
          Array.isArray(children) && (prev ?? -1) < children.length - 1
            ? (prev ?? -1) + 1
            : prev
        );
        break;
      case 'ArrowUp':
        setActiveIndex((prev) => {
          return prev && prev > 0 ? prev - 1 : prev;
        });
        break;
      default:
        break;
    }

    //TODO: keyboard lookup options
  };

  const blurHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    collapse();
  };

  return (
    <StyledSelectBox
      $isActive={expanded}
      tabIndex={0}
      onBlur={blurHandler}
      onKeyDown={keyboardHandler}
    >
      <div className='select-header' onClick={clickHandler}>
        <span>
          {/* should not access ref in render */}
          {/* {activeIndex ? optionRefs[activeIndex].current?.innerHTML : ''} */}
          {(() => {
            const selectedChildProp =
              activeIndex && Array.isArray(children) && children[activeIndex];
            if (!selectedChildProp?.props) {
              return '';
            }
            return (
              selectedChildProp.props.displayTitle ??
              selectedChildProp.props.value.toString()
            );
          })()}
        </span>
        <span className='icon'>
          <i className='fas fa-angle-down' aria-hidden='true'></i>
        </span>
      </div>
      <StyledSelectDropdown $isActive={expanded}>
        <ul className='dropdown-content'>
          {/* unconventional practice: accessing values from children props and cloning with modified props */}
          {Array.isArray(children) &&
            children.map((child, index) =>
              React.cloneElement(child, {
                key: `itm${index}`,
                ref: optionRefs[index],
                displayTitle:
                  child.props.displayTitle ?? child.props.value.toString(),
                isActive: activeIndex === index,
                callback: () => {
                  setActiveIndex(index);
                  collapse();
                },
              } as Partial<ISelectItemProps>)
            )}
        </ul>
      </StyledSelectDropdown>
    </StyledSelectBox>
  );
}
