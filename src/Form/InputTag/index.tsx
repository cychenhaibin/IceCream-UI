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
    value,                 // 输入框的值
    defaultValue = [],     // 输入框的默认值
    placeholder = '请输入', // 输入框的占位符
    disabled = false,      // 是否禁用输入框
    readOnly = false,      // 是否只读
    maxLength,             // 最大输入长度
    maxTags,               // 最大标签数
    className,             // 输入框的类名
    style,                 // 输入框的样式
    onChange,              // 输入框值变化时的回调
    onFocus,               // 输入框聚焦时的回调
    onBlur,                // 输入框失焦时的回调
    onPressEnter,          // 按下回车键时的回调
  } = props;

  const { prefix } = React.useContext(ConfigContext);             // 获取配置上下文中的前缀
  const inputTagPrefix = prefix + '-input-tag';                   // 输入框标签的前缀
  const [tags, setTags] = React.useState<string[]>(defaultValue); // 标签状态
  const [inputValue, setInputValue] = React.useState('');         // 输入框的值
  const [focused, setFocused] = React.useState(false);            // 是否聚焦
  const inputRef = React.useRef<HTMLInputElement>(null);          // 输入框的引用
  // 如果输入框的值不为 undefined，则设置标签状态
  React.useEffect(() => {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);
  // 输入框值变化时的回调
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 设置输入框的值
  };
  // 按下回车键时的回调
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
  // 关闭标签时的回调
  const handleTagClose = (index: number) => {
    const newTags = [...tags]; // 创建新的标签数组
    newTags.splice(index, 1); // 删除指定索引的标签
    setTags(newTags); // 更新标签状态
    onChange?.(newTags); // 调用 onChange 回调
  };
  // 拖拽结束时的回调
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    // 重新排序标签
    const items = Array.from(tags);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // 更新标签状态
    setTags(items);
    // 调用 onChange 回调
    onChange?.(items);
  };
  // 聚焦时的回调
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };
  // 失焦时的回调
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };
  // 类名
  const classes = cs(inputTagPrefix, {
    [`${inputTagPrefix}-disabled`]: disabled,
    [`${inputTagPrefix}-focused`]: focused,
  }, className);
  // 返回组件
  return (
    <div className={classes} style={style}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tags" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps} // 拖拽容器属性
              ref={provided.innerRef} // 拖拽容器引用
              className={`${inputTagPrefix}-tags`} // 标签容器类名
            >
              {tags.map((tag, index) => (
                <Draggable
                  key={index} // 唯一标识
                  draggableId={`tag-${index}`} // 拖拽元素的 ID
                  index={index} // 拖拽元素的索引
                  isDragDisabled={disabled || readOnly} // 是否禁用拖拽
                >
                  {(provided) => (
                    <span
                      ref={provided.innerRef} // 拖拽元素引用
                      {...provided.draggableProps} // 拖拽元素属性
                      {...provided.dragHandleProps} // 拖拽元素手柄属性
                      className={`${inputTagPrefix}-tag`} // 标签类名
                    >
                      {tag}
                      {!disabled && !readOnly && (
                        <span
                          className={`${inputTagPrefix}-tag-close`} // 标签关闭类名
                          onClick={() => handleTagClose(index)} // 标签关闭点击回调
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
        ref={inputRef}                                     // 输入框的引用
        type="text"                                        // 输入框的类型
        value={inputValue}                                 // 输入框的值
        placeholder={tags.length === 0 ? placeholder : ''} // 输入框的占位符
        disabled={disabled}                                // 是否禁用输入框
        readOnly={readOnly}                                // 是否只读
        maxLength={maxLength}                              // 最大输入长度
        className={`${inputTagPrefix}-input`}              // 输入框的类名
        onChange={handleInputChange}                       // 输入框值变化时的回调
        onKeyDown={handleInputKeyDown}                     // 按下回车键时的回调
        onFocus={handleFocus}                              // 输入框聚焦时的回调
        onBlur={handleBlur}                                // 输入框失焦时的回调
      />
    </div>
  );
};

export default InputTag;
