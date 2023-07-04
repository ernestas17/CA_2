/*
Strategy for making a select box from scratch in React
 - Select options are passed as props, preferably as children elements, only with data relevant to business logic
 - Selected item state is tracked with numeric index, making it easy to navigate with arrow keys
 - Data from currently selected item should be displayed in the box header
*/

import {
  useState,
  ReactNode,
  SyntheticEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';
import React from 'react';
import {
  StyledSelectBox,
  StyledSelectDropdown,
  StyledSelectItem,
} from './styles';

export type ValidValueType = string | number | boolean | null;

interface ISelectItemProps {
  children: ReactNode;
  value: ValidValueType;
  innerRef?: React.LegacyRef<HTMLElement>;
  isActive?: boolean;
  callback?: () => void;
}

export function SelectItem({
  children,
  value,
  innerRef,
  isActive = false,
  callback,
}: ISelectItemProps) {
  const onSelect = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback && callback();
  };

  return (
    <StyledSelectItem
      className='dropdown-item'
      ref={innerRef}
      $isActive={isActive}
      onClick={onSelect}
    >
      <div className='select-item-content'>{children}</div>
    </StyledSelectItem>
  );
}

interface ISelectProps {
  children: ReactNode;
  initialIndex?: number | null;
  setvalue?: React.Dispatch<React.SetStateAction<any>>;
  disabled?: boolean;

  style?: {
    isRight?: boolean;
    isUp?: boolean;
    isRounded?: boolean;
    fullWidth?: boolean;
    maxRows?: number;
  };
}

export default function Select({
  children,
  initialIndex,
  setvalue,
  disabled = false,
  style,
}: ISelectProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initialIndex ?? 0
  );

  // activeIndex should not get confirmed while expanded
  //TODO: make externally available callback to handle "submit" state change

  const toggleExpand = () => setExpanded((prev) => !prev);
  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);

  const previousIndexRef = useRef<number | null>(null);

  // https://stackoverflow.com/a/57810772
  const optionElementsRef = useRef<HTMLElement[]>([]);
  const optionValuesRef = useRef<Array<ValidValueType>>([]);
  const selectedDisplayElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const displayElement = selectedDisplayElementRef.current;
    if (displayElement) {
      while (displayElement.firstChild) {
        displayElement.removeChild(displayElement.firstChild);
      }

      if (activeIndex !== null) {
        const activeItem = optionElementsRef.current[activeIndex]; //problem: this can be undefined when useEffect runs first time
        if (activeItem) {
          // copy html content of activeItem to display in selectbox header
          displayElement.appendChild(activeItem.firstChild.cloneNode(true));
        }
      }
    }
  }, [activeIndex, optionElementsRef, optionValuesRef]);

  /*
  Tracking state changes
  Need to trigger effect when:
    - activeIndex changes, but only when expanded === false
    - expanded changes to false and activeIndex is not the same as before expansion 
  */

  useEffect(() => {
    if (setvalue && !expanded && activeIndex !== previousIndexRef.current) {
      setvalue(
        activeIndex === null ? null : optionValuesRef.current[activeIndex]
      );
      previousIndexRef.current = activeIndex;
    }
  }, [activeIndex, expanded]);

  const clickHandler = (e: SyntheticEvent) => {
    if (!disabled) {
      e.stopPropagation();
      toggleExpand();
    }
  };

  const keyboardHandler = (e: KeyboardEvent) => {
    if (!disabled) {
      switch (e.code) {
        case 'Enter':
        case 'Space':
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          e.stopPropagation();
          break;
        case 'Escape':
          if (expanded) {
            e.preventDefault();
            e.stopPropagation();
          }
          break;
        default:
          break;
      }
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
      className='dropdown'
      $disabled={disabled}
      $isRight={style?.isRight}
      $isUp={style?.isUp}
      $isRounded={style?.isRounded}
      $fullWidth={style?.fullWidth}
    >
      <div className='dropdown-trigger'>
        <div className='button' onClick={clickHandler}>
          <span ref={selectedDisplayElementRef}></span>
          <span className='icon'>
            {/* <FontAwesomeIcon icon={faAngleDown} /> */}
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </div>
      </div>
      <StyledSelectDropdown
        className='dropdown-menu'
        $isActive={expanded}
        $maxRows={style?.maxRows}
      >
        <ul className='dropdown-content'>
          {/* unconventional practice: accessing values from children props and cloning with modified props */}
          {/* https://stackoverflow.com/a/57810772 */}
          {Array.isArray(children) &&
            children.map((child, index) =>
              React.cloneElement(child, {
                key: `itm${index}`,
                innerRef: (el: HTMLElement) => {
                  optionElementsRef.current[index] = el;
                  optionValuesRef.current[index] = child.props.value;
                },
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
