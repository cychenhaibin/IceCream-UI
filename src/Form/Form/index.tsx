import React, {
  createContext,
  useContext,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import './index.less';

// 表单上下文
const FormContext = createContext({});

// 校验规则类型
const validateRules = {
  required: (value: any, msg: string) => (value === undefined || value === '' ? msg : undefined),
  number: (value: any, msg: string) => (isNaN(Number(value)) ? msg : undefined),
  min: (value: any, min: number, msg: string) => (Number(value) < min ? msg : undefined),
  max: (value: any, max: number, msg: string) => (Number(value) > max ? msg : undefined),
};

// FormItem 组件
export const FormItem = ({ label, children, prop, rules = [], labelPosition, size }: any) => {
  const {
    values,
    errors,
    setFieldValue,
    validateField,
    labelPosition: formLabelPosition,
    size: formSize,
  } = useContext(FormContext) as any;
  const mergedLabelPosition = labelPosition || formLabelPosition || 'left';
  const mergedSize = size || formSize || 'middle';
  const error = errors[prop];

  const onChange = (e: any) => {
    let value =
      e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setFieldValue(prop, value);
    validateField(prop, value, rules);
  };

  // 传递onChange和value给子组件
  const child = React.cloneElement(children, {
    onChange,
    value: values[prop],
    size: mergedSize,
  });

  return (
    <div
      className={`ice-form-item ice-form-item-${mergedLabelPosition} ice-form-item-${mergedSize} ${
        error ? 'ice-form-item-error' : ''
      }`}
    >
      {label && <label className="ice-form-item-label">{label}</label>}
      <div className="ice-form-item-control">{child}</div>
      {error && <div className="ice-form-item-error-msg">{error}</div>}
    </div>
  );
};

// Form 组件
export const Form = React.forwardRef(
  (
    {
      children,
      initialValues = {},
      rules = {},
      inline = false,
      labelPosition = 'left',
      size = 'middle',
      onFinish,
    }: any,
    ref,
  ) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // 设置字段值
    const setFieldValue = (prop: string, value: any) => {
      setValues((prev: any) => ({ ...prev, [prop]: value }));
    };

    // 校验单个字段
    const validateField = (prop: string, value: any, itemRules: any[] = []) => {
      let errorMsg: string | undefined;
      const allRules = [...(rules[prop] || []), ...itemRules];
      for (const rule of allRules) {
        if (rule.required) errorMsg = validateRules.required(value, rule.message);
        if (rule.type === 'number') errorMsg = validateRules.number(value, rule.message);
        if (rule.min !== undefined) errorMsg = validateRules.min(value, rule.min, rule.message);
        if (rule.max !== undefined) errorMsg = validateRules.max(value, rule.max, rule.message);
        if (errorMsg) break;
      }
      setErrors((prev: any) => ({ ...prev, [prop]: errorMsg }));
      return !errorMsg;
    };

    // 校验所有字段
    const validateAll = () => {
      let valid = true;
      Object.keys(rules).forEach((prop) => {
        const v = values[prop];
        const ok = validateField(prop, v, []);
        if (!ok) valid = false;
      });
      return valid;
    };

    // 提交
    const handleSubmit = (e: any) => {
      e && e.preventDefault && e.preventDefault();
      if (validateAll()) {
        onFinish && onFinish(values);
      }
    };

    // 暴露方法
    useImperativeHandle(ref, () => ({
      validate: validateAll,
      getValues: () => values,
      setFieldValue,
      reset: () => setValues(initialValues),
      setErrors,
    }));

    return (
      <form className={`ice-form${inline ? ' ice-form-inline' : ''}`} onSubmit={handleSubmit}>
        <FormContext.Provider
          value={{ values, errors, setFieldValue, validateField, labelPosition, size }}
        >
          {children}
        </FormContext.Provider>
      </form>
    );
  },
);

// 基础输入组件
export const Input = (props: any) => (
  <input {...props} className={`ice-form-input ice-form-input-${props.size || 'middle'}`} />
);
export const Select = ({ options = [], ...props }: any) => (
  <select {...props} className={`ice-form-select ice-form-select-${props.size || 'middle'}`}>
    {options.map((opt: any) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
export const Radio = ({ options = [], ...props }: any) => (
  <span className={`ice-form-radio ice-form-radio-${props.size || 'middle'}`}>
    {options.map((opt: any) => (
      <label key={opt.value}>
        <input
          type="radio"
          name={props.name}
          value={opt.value}
          checked={props.value === opt.value}
          onChange={() => props.onChange({ target: { value: opt.value } })}
        />
        {opt.label}
      </label>
    ))}
  </span>
);
export const Checkbox = (props: any) => (
  <input
    type="checkbox"
    {...props}
    className={`ice-form-checkbox ice-form-checkbox-${props.size || 'middle'}`}
  />
);

// 动态添加/删除表单项可通过父组件控制children渲染实现

// 默认导出
export default Form;
