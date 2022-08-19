import loki from '@percy507/lokijs';
import LokiIndexedAdapter from '@percy507/lokijs/src/loki-indexed-adapter';

import { fakeData } from './data';

interface InitLokiOptions {
  appName: string;
  dbName: string;
  onLoad?: (db: loki) => void;
}

const initLoki = (options: InitLokiOptions) => {
  const { appName, dbName, onLoad } = options;
  console.time('[load_db]');

  const db = new loki(dbName, {
    adapter: new LokiIndexedAdapter(appName),
    verbose: true,
    autosave: true,
    autosaveInterval: 1000,
    autosaveCallback: (err) => {
      console.log('autosaveCallback', err);
    },
    autoload: true,
    autoloadCallback: (err) => {
      if (err) {
        console.error(err);
        throw new Error('Failed to load database');
      } else {
        console.timeEnd('[load_db]');
        console.log('Database loaded:', dbName);
        if (onLoad) onLoad(db);
      }
    },
  });
  return db;
};

declare global {
  interface Window {
    db: loki;
  }
}

export function initDatabase(onLoad?: () => void) {
  window.db = initLoki({
    appName: 'MyApp',
    dbName: 'my-app.db',
    onLoad: (db) => {
      let coll = db.getCollection('articles');
      if (!coll) {
        coll = db.addCollection<any>('articles', {
          unique: ['id'],
          indices: ['id'],
          disableMeta: false, // whether disable meta property on documents
          disableChangesApi: true, // whether disable Changes API
          disableDeltaChangesApi: true, // whether disable Delta Changes API (requires Changes API, forces cloning)
        });

        coll.insert(fakeData);

        const dv = coll.addDynamicView('dv111');

        console.log(
          dv
            .applyFind({})
            // .find({ content: { $ne: '' } })
            .data()
            .map((el) => ({ id: el.id, title: el.title })),
        );

        setTimeout(() => {
          coll!
            .chain()
            .find({ $loki: 1 })
            .update((val) => (val.title = `updated__${val.title}`));

          console.log(
            dv
              .applyFind({})
              // .find({ content: { $ne: '' } })
              .data()
              .map((el) => ({ id: el.id, title: el.title })),
          );
        }, 2000);
      }

      let articles = coll.find();

      console.log('[统计] 文件夹数量:', articles.filter((el) => !!el.isFolder).length);
      console.log('[统计] 文件数量:', articles.filter((el) => !el.isFolder).length);

      if (onLoad) onLoad();

      // db.serializeCollection()
      // db.serializeDestructured()

      // db.serializeDestructured({
      //   partitioned: false,
      //   delimited: false
      // }).filter(el=>!!el).map(el=>JSON.parse(el))
    },
  });
}
