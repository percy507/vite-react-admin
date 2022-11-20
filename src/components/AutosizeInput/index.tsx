import { clsx } from 'clsx';
import { Component } from 'react';

import styles from './style.module.less';

const INPUT_PROPS_BLACKLIST = [
  'extraWidth',
  'inputClassName',
  'inputRef',
  'inputStyle',
  'minWidth',
  'onAutosize',
  'placeholderIsMinWidth',
];

const cleanInputProps = (inputProps) => {
  INPUT_PROPS_BLACKLIST.forEach((field) => delete inputProps[field]);
  return inputProps;
};

const copyStyles = (styles, node: HTMLElement) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

type AutosizeInputProps = typeof AutosizeInput.defaultProps &
  React.ComponentPropsWithRef<'input'> & {
    inputClassName?: string;
    inputRef?: (instance: HTMLInputElement | null) => void;
    inputStyle?: React.CSSProperties;
    minWidth?: number;
    onAutosize?: (inputWidth: string | number) => void;
    placeholderIsMinWidth?: boolean;
    extraWidth?: number;
  };

interface AutosizeInputState {
  inputWidth: number;
  inputId?: string;
  prevId?: string;
}

/**
 * A text input for React that resizes itself to the current content.
 * - A typescript version of `react-input-autosize` (https://github.com/JedWatson/react-input-autosize)
 * */
export class AutosizeInput extends Component<AutosizeInputProps, AutosizeInputState> {
  static defaultProps = {
    minWidth: 100,
  };

  static getDerivedStateFromProps(props: AutosizeInputProps, state: AutosizeInputState) {
    const { id } = props;
    return id !== state.prevId ? { inputId: id, prevId: id } : null;
  }

  mounted = false;
  input: HTMLInputElement | null = null;
  placeHolderSizer: HTMLDivElement | null = null;
  sizer: HTMLDivElement | null = null;

  constructor(props: AutosizeInputProps) {
    super(props);
    this.state = {
      inputWidth: props.minWidth,
      inputId: props.id,
      prevId: props.id,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.copyInputStyles();
    this.updateInputWidth();
  }
  componentDidUpdate(_prevProps: AutosizeInputProps, prevState: AutosizeInputState) {
    const { inputWidth } = this.state;
    const { onAutosize } = this.props;
    if (prevState.inputWidth !== inputWidth && typeof onAutosize === 'function') {
      onAutosize(inputWidth);
    }
    this.updateInputWidth();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  inputRef = (el: HTMLInputElement | null) => {
    this.input = el;
    if (typeof this.props.inputRef === 'function') this.props.inputRef(el);
  };
  placeHolderSizerRef = (el: HTMLDivElement | null) => {
    this.placeHolderSizer = el;
  };
  sizerRef = (el: HTMLDivElement | null) => {
    this.sizer = el;
  };
  copyInputStyles() {
    if (!this.mounted || !window.getComputedStyle || !this.input || !this.sizer) return;
    const inputStyles = window.getComputedStyle(this.input);
    copyStyles(inputStyles, this.sizer);
    if (this.placeHolderSizer) copyStyles(inputStyles, this.placeHolderSizer);
  }
  updateInputWidth() {
    console.log('updateInputWidth');
    if (!this.mounted || !this.sizer || this.sizer.scrollWidth == null) return;

    const { value, type, extraWidth, minWidth, placeholder, placeholderIsMinWidth } =
      this.props;

    let newInputWidth = 0;
    if (placeholder && (!value || (value && placeholderIsMinWidth))) {
      newInputWidth =
        Math.max(this.sizer.scrollWidth, this.placeHolderSizer?.scrollWidth || 0) + 2;
    } else {
      newInputWidth = this.sizer.scrollWidth + 2;
    }
    // add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
    newInputWidth += type === 'number' && extraWidth === undefined ? 16 : extraWidth || 0;
    if (newInputWidth < minWidth) newInputWidth = minWidth;
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({ inputWidth: newInputWidth });
    }
  }
  getInput() {
    return this.input;
  }
  focus() {
    this.input?.focus();
  }
  blur() {
    this.input?.blur();
  }
  select() {
    this.input?.select();
  }
  render() {
    const { className, style, value, defaultValue, placeholder } = this.props;
    const sizerValue = [defaultValue, value, ''].reduce((previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }
      return currentValue;
    });

    const { ...inputProps } = this.props;
    cleanInputProps(inputProps);
    inputProps.className = this.props.inputClassName;
    inputProps.id = this.state.inputId;
    inputProps.style = {
      boxSizing: 'content-box',
      width: `${this.state.inputWidth}px`,
      ...this.props.inputStyle,
    };

    return (
      <div className={clsx(styles.autosizeInput, className)} style={style}>
        <input {...inputProps} ref={this.inputRef} />
        <div ref={this.sizerRef} className={styles.sizer}>
          {sizerValue}
        </div>
        {placeholder && (
          <div ref={this.placeHolderSizerRef} className={styles.sizer}>
            {placeholder}
          </div>
        )}
      </div>
    );
  }
}
