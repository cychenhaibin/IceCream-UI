import React from 'react';
import './index.less';
import cs from 'classnames';
import { ConfigContext } from '../../ConfigProvider';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export interface InputTagProps {
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  maxTags?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string[]) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputTag: React.FC<InputTagProps> = (props) => {
  const {
    value,
    defaultValue = [],
    placeholder = '请输入',
    disabled = false,
    readOnly = false,
    maxLength,
    maxTags,
    className,
    style,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
  } = props;

  const { prefix } = React.useContext(ConfigContext);
  const inputTagPrefix = prefix + '-input-tag';
  const [tags, setTags] = React.useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (maxTags && tags.length >= maxTags) {
        return;
      }
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue('');
      onChange?.(newTags);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange?.(newTags);
    }
  };

  const handleTagClose = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tags);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTags(items);
    onChange?.(items);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const classes = cs(inputTagPrefix, {
    [`${inputTagPrefix}-disabled`]: disabled,
    [`${inputTagPrefix}-focused`]: focused,
  }, className);

  return (
    <div className={classes} style={style}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tags" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${inputTagPrefix}-tags`}
            >
              {tags.map((tag, index) => (
                <Draggable
                  key={index}
                  draggableId={`tag-${index}`}
                  index={index}
                  isDragDisabled={disabled || readOnly}
                >
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${inputTagPrefix}-tag`}
                    >
                      {tag}
                      {!disabled && !readOnly && (
                        <span
                          className={`${inputTagPrefix}-tag-close`}
                          onClick={() => handleTagClose(index)}
                        >
                          ×
                        </span>
                      )}
                    </span>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`${inputTagPrefix}-input`}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default InputTag;
