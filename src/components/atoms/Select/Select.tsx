import {
  useState,
  ReactNode,
  // useEffect,
  SyntheticEvent,
  KeyboardEvent,
} from 'react';
import React from 'react';
import {
  StyledSelectBox,
  StyledSelectDropdown,
  StyledSelectItem,
} from './styles';

interface ISelectItemProps {
  uniqueValue: string | number | boolean;
  displayTitle?: string;
  optionIndex?: number;
  isActive?: boolean;
  callback?: (refIndex: number) => void;
}

export function SelectItem({
  uniqueValue,
  displayTitle: displayTitle,
  optionIndex = 0,
  isActive = false,
  callback,
}: ISelectItemProps) {
  const onSelect = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback && callback(optionIndex);
  };

  return (
    <StyledSelectItem $isActive={isActive} onClick={onSelect}>
      {displayTitle}
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
          {Array.isArray(children) &&
            (children.find((child) => child.props.optionIndex === activeIndex)
              ?.props?.text ??
              '')}
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
                displayTitle:
                  child.props.displayTitle ??
                  child.props.uniqueValue.toString(),
                key: `itm${index}`,
                optionIndex: index,
                isActive: child.props.optionIndex === activeIndex,
                callback: (num) => {
                  setActiveIndex(num);
                  collapse();
                },
              } as Partial<ISelectItemProps>)
            )}
        </ul>
      </StyledSelectDropdown>
    </StyledSelectBox>
  );
}
