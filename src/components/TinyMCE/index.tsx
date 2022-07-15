import { clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';

import { requestUpload } from '@/services/common';

import type { Editor, TinyMCE as TinyMCEType } from '../../../public/tinymce/tinymce';
import styles from './style.module.less';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8);

declare global {
  interface Window {
    tinymce: TinyMCEType;
  }
}

interface TinyMCEProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  readOnly?: boolean;
}

export function TinyMCE(props: TinyMCEProps) {
  const { className, style, value, onChange, readOnly, onInput } = props;
  const [id] = useState(nanoid());
  const [editor, setEditor] = useState<Editor | undefined>();

  const containerRef = useCallback(() => {
    if (window.tinymce.get(id)) {
      window.tinymce.get(id).remove();
    }

    const editor = window.tinymce.createEditor(id, {
      language: 'zh-Hans',
      selector: `#${id}`,
      readonly: readOnly,
      placeholder: '请输入内容',
      menubar: false,
      statusbar: false,
      min_height: 400,
      max_height: readOnly ? undefined : 600,
      images_upload_handler: (blobInfo) => {
        return new Promise((resolve, reject) => {
          requestUpload(new File([blobInfo.blob()], blobInfo.filename()))
            .then((url) => resolve(url))
            .catch((err) => reject(err));
        });
      },
      setup: (editor) => setEditor(editor),
      plugins: [
        ...['advlist', 'autolink', 'autoresize', 'lists', 'link', 'image', 'charmap'],
        ...['preview', 'anchor', 'searchreplace', 'visualblocks', 'fullscreen'],
        ...['insertdatetime', 'media', 'table', 'help', 'wordcount'],
      ],
      toolbar:
        'undo redo | formatpainter casechange blocks | bold italic forecolor backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist checklist outdent indent | image | removeformat | code table help',
      file_picker_types: 'file image media',
    });
    editor.render();
  }, [id, readOnly]);

  useEffect(() => {
    if (!editor) return;
    const callback = () => {
      const val = editor.getContent();
      if (onInput) onInput(val);
      if (onChange) onChange(val);
    };
    editor.on('Change', callback);
    return () => {
      editor.off('Change', callback);
    };
  }, [editor, onChange, onInput]);

  useEffect(() => {
    if (!editor) return;
    const changeContent = () => {
      const curVal = editor.getContent({ format: 'html' });
      if (value !== curVal) editor.setContent(value || '<p></p>');
    };
    if (editor.initialized) changeContent();
    else {
      if (!value) return;
      let timer = setInterval(() => {
        if (editor.initialized) {
          changeContent();
          clearInterval(timer);
        }
      }, 100);
    }
  }, [editor, value]);

  return (
    <div
      style={style}
      className={clsx(styles.tinymce, className, { [styles.readOnly]: readOnly })}>
      <div id={id} ref={containerRef}></div>
    </div>
  );
}

TinyMCE.isEmpty = (html: string) => {
  let str = html.replace(/<p>\s*?(<br>)?\s*?<\/p>/g, '');
  return str.length === 0;
};
