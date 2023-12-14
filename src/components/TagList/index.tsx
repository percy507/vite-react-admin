import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import type { InputProps } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';

import styles from './style.module.less';

export interface TagListProps {
  /** @defaultValue '新标签' */
  addText?: string;
  /** @defaultValue 100000 */
  maxCount?: number;
  inputProps?: Pick<InputProps, 'maxLength'>;
  value?: string[];
  onChange?: (value?: string[]) => void;
}

export function TagList(props: TagListProps) {
  const { addText = '新标签', maxCount = 100000, inputProps, value, onChange } = props;

  const [tags, setTags] = useState<string[]>([]);
  const tagsRef = useRef(tags);
  tagsRef.current = tags;

  const valueRef = useRef(value);
  valueRef.current = value;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (JSON.stringify(tagsRef.current) == JSON.stringify(value)) return;
    setTags(value || []);
  }, [value]);

  useEffect(() => {
    if (JSON.stringify(tags) == JSON.stringify(valueRef.current)) return;
    onChangeRef.current?.(tags || []);
  }, [tags]);

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              {...inputProps}
              ref={editInputRef}
              key={tag}
              size="small"
              className={styles.tagInput}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className={styles.editTag}
            key={tag}
            closable
            onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={(e) => {
                setEditInputIndex(index);
                setEditInputValue(tag);
                e.preventDefault();
              }}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          {...inputProps}
          ref={inputRef}
          type="text"
          size="small"
          className={styles.tagInput}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && tags.length < maxCount && (
        <Tag className={styles.addTag} onClick={() => setInputVisible(true)}>
          <PlusOutlined /> {addText}
        </Tag>
      )}
    </>
  );
}
