import '@yaireo/tagify/dist/tagify.css';
import './style.less';

import type { default as Tagify, TagifySettings } from '@yaireo/tagify';
import Tags from '@yaireo/tagify/dist/react.tagify';
import { Card } from 'antd';
import { useCallback, useMemo, useRef } from 'react';

import { whitelist } from './data';

export function TagsInput() {
  const tagifyRef = useRef<Tagify>();
  const settings = useMemo<TagifySettings>(
    () => ({
      maxTags: 10,
      dropdown: {
        maxItems: 20,
        classname: 'tags-look',
        enabled: 0,
        closeOnSelect: false,
      },
      templates: {
        dropdownFooter(suggestions) {
          console.log(999, this);
          const hasMore = suggestions.length - this.settings.dropdown.maxItems;
          return hasMore > 0
            ? `<footer data-selector='tagify-suggestions-footer' class="${this.settings.classNames.dropdownFooter}">
                  ${hasMore} more items. Refine your search.
              </footer>`
            : '';
        },
      },
    }),
    [],
  );

  console.log(tagifyRef);

  // on tag add/edit/remove
  const onChange = useCallback((e) => {
    console.log('CHANGED:', {
      dirtyValue: e.detail.tagify.value,
      cleanValue: e.detail.tagify.getCleanValue(),
      stringValue: e.detail.value,
    });
  }, []);

  return (
    <Card
      size="small"
      style={{ minHeight: 240 }}
      title={
        <div>
          <a href="https://github.com/yairEO/tagify">@yaireo/tagify</a>
          <span style={{ marginLeft: 10 }}>(efficient Tags input component)</span>
        </div>
      }>
      <Tags
        tagifyRef={tagifyRef}
        settings={settings}
        defaultValue="a,b,c"
        whitelist={whitelist}
        onChange={onChange}
      />
    </Card>
  );
}
