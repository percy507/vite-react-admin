import * as maptalks from 'maptalks';
import polylabel from 'polylabel';

import { landList } from './data';
import styles from './style.module.less';

export function Toolbar({ map }: { map?: maptalks.Map }): JSX.Element {
  const gotoMap = (coord: number[], zoom: number) => {
    return map?.setCenterAndZoom(new maptalks.Coordinate(coord[0], coord[1]), zoom);
  };

  return (
    <div className={styles.toolbar}>
      {landList.map((el) => {
        return (
          <div key={el.name} onClick={() => gotoMap(polylabel([el.paths]), 15.5)}>
            {el.name}
          </div>
        );
      })}
    </div>
  );
}
