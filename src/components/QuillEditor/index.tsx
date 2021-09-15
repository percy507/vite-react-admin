import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

import { message, Spin } from 'antd';
import hljs from 'highlight.js';
import katex from 'katex';
import Quill from 'quill'; // https://quilljs.com/
import Delta from 'quill-delta';
import React, { useEffect, useState } from 'react';

import { requestUploadImage } from '@/services/upload';

import styles from './style.module.less';

type QuillEditorProps = {
  placeholder?: string;
  minContentHeight?: string | number;
  maxContentHeight?: string | number;
  value?: string;
  onChange?: (val: string) => void;
};

type QuillMissedProps = {
  container: Element;
  theme: any;
};

type Editor = Quill & QuillMissedProps;

hljs.configure({
  languages: ['javascript', 'typescript'],
});

window.katex = katex;

export default function QuillEditor(props: QuillEditorProps) {
  const {
    placeholder = '',
    minContentHeight = 200,
    maxContentHeight = 100000,
    value = '',
    onChange = () => {},
  } = props;

  const [editor, setEditor] = useState<Editor>();
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState<string>(value);

  const quillEditorClassName = styles.quillEditor;
  const editorContentClassName = styles.editorContent;

  // 在创建editor实例前
  // 手动删除因hot-reload产生的多余的toolbar
  const beforeCreateEditor = () => {
    const quillEditorEl = document.querySelector(`.${quillEditorClassName}`);
    const toolbarElList = quillEditorEl?.querySelectorAll(
      `.${quillEditorClassName} .ql-toolbar`,
    );

    if (toolbarElList instanceof NodeList) {
      toolbarElList.forEach((el) => el.remove());
    }
  };

  const createEditor = () => {
    const modules = {
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['link', 'image', 'video', 'formula'],

          ['clean'], // remove formatting button
        ],
        handlers: {},
      },
    };
    const formats = [
      'background',
      'bold',
      'color',
      'font',
      'code',
      'italic',
      'link',
      'strike',
      'underline',
      'blockquote',
      'header',
      'indent',
      'list',
      'align',
      'direction',
      'code-block',
      'image',
      'video',
      'formula',
    ];

    const _editor = new Quill(`.${editorContentClassName}`, {
      // debug: 'info',
      formats,
      modules,
      placeholder,
      theme: 'snow',
      readOnly: false,
    }) as Editor;

    // 更改编辑器超链接的 placeholder
    const handleLinkPlaceholder = () => {
      const input = _editor.theme.tooltip.root.querySelector('input[data-link]');

      if (input instanceof HTMLInputElement) {
        input.dataset.link = 'https://my.example.com';
      }
    };

    // 绑定事件
    const bindEvents = () => {
      _editor.on('text-change', () => {
        setInnerValue(_editor?.root?.innerHTML || '');
      });
    };

    // 添加自定义上传图片逻辑
    const addImageHandler = () => {
      const imageHandler = () => {
        let fileInput: HTMLInputElement | null = _editor.container.querySelector(
          'input.ql-image[type=file]',
        );

        if (fileInput === null) {
          fileInput = document.createElement('input');

          fileInput.classList.add('ql-image');
          fileInput.style.cssText = `position:absolute;
                                     z-index:-1;
                                     opacity:0;`;
          fileInput.setAttribute('type', 'file');
          fileInput.setAttribute(
            'accept',
            'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
          );

          fileInput.addEventListener('change', () => {
            const { files } = fileInput as HTMLInputElement;

            if (!files || !files.length) {
              console.log('No files selected');
              return;
            }

            const file = files[0];

            if (file.size > 5 * 1024 * 1024) {
              message.error('单个文件大小不能超过 5MB');
              return;
            }

            setUploadingImage(true);

            _editor.enable(false);

            // 上传文件
            requestUploadImage({
              key: '49e27928735c3bd80e8aa27349a34c5b',
              image: file,
            })
              .then(({ data }) => {
                if (data.display_url) {
                  const range = _editor.getSelection(true);

                  _editor.enable(true);

                  // 更新内容
                  _editor.updateContents(
                    new Delta()
                      .retain(range.index)
                      .delete(range.length)
                      .insert('\n')
                      .insert({
                        image: data.display_url,
                      })
                      .insert('\n'),
                    'user',
                  );

                  // 将鼠标光标置后
                  _editor.setSelection(range.index, 1, 'silent');
                } else {
                  message.error('图片上传失败');
                }
              })
              .finally(() => {
                setUploadingImage(false);

                _editor.enable(true);
                (fileInput as HTMLInputElement).value = '';
              });
          });

          _editor.container.appendChild(fileInput);
        }

        fileInput.click();
      };
      const toolbar = _editor.getModule('toolbar');
      toolbar.addHandler('image', imageHandler);
    };

    // 初始化编辑器内容
    const initEditorContent = () => {
      _editor.setContents(_editor.clipboard.convert(value));
    };

    setEditor(_editor);
    handleLinkPlaceholder();
    bindEvents();
    addImageHandler();
    initEditorContent();
  };

  useEffect(() => {
    beforeCreateEditor();
    createEditor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value || '');
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onChange(innerValue);
  }, [innerValue, editor]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(innerValue);

  return (
    <div className={quillEditorClassName}>
      <Spin spinning={uploadingImage}>
        <div
          className={editorContentClassName}
          style={{
            minHeight: +minContentHeight,
            maxHeight: +maxContentHeight,
          }}
        />
      </Spin>
    </div>
  );
}
