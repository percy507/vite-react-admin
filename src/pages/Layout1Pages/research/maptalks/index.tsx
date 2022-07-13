import { Alert, Card } from 'antd';
import * as maptalks from 'maptalks';
import polylabel from 'polylabel';
import { useCallback, useState } from 'react';

import { DragableModal } from '@/components/DragableModal';
import { PageWrapper } from '@/components/PageWrapper';

import marker1 from './assets/marker1.png';
import { Toolbar } from './components';
import { requestData } from './data';
import styles from './style.module.less';
import zheJiangGeoJSON from './zheJiang.json';

declare global {
  interface Window {
    map: maptalks.Map;
  }
}

interface DetailModal {
  visible: boolean;
  data: any;
}

export default function LandHome() {
  const [map, setMap] = useState<maptalks.Map>();
  const [detailModal, setDetailModal] = useState<DetailModal>({
    visible: false,
    data: {},
  });

  const mapWrapperRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    requestData().then((_data) => {
      initMap(el, {
        data: _data,
        setMap,
        setModal: setDetailModal,
      });
    });
  }, []);

  return (
    <PageWrapper>
      <Card title="试用 maptalks">
        <Alert
          message={
            <div>
              <a href="https://maptalks.org/" target="_blank" rel="noreferrer">
                maptalks
              </a>{' '}
              +{' '}
              <a href="https://www.tianditu.gov.cn/" target="_blank" rel="noreferrer">
                天地图
              </a>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <div style={{ position: 'relative' }}>
          <Toolbar map={map} />
          <div className={styles.mapWrapper} ref={mapWrapperRef}></div>
        </div>
      </Card>

      <DragableModal
        title={detailModal.data?.name}
        footer={null}
        width={700}
        mask={false}
        maskClosable={false}
        visible={detailModal.visible}
        onCancel={() =>
          setDetailModal((prevState) => ({ ...prevState, visible: false }))
        }>
        <iframe
          src={detailModal.data?.link}
          frameBorder="0"
          width="100%"
          height="350"
          allowFullScreen
        />
      </DragableModal>
    </PageWrapper>
  );
}

interface RootProps {
  data: any;
  setMap: (value: any) => void;
  setModal: (value: DetailModal) => void;
}

async function initMap(target: HTMLElement, props: RootProps) {
  const { setMap } = props;
  // const defaultZoom = 8.5;
  const defaultZoom = 13.22;
  const map = new maptalks.Map(target, {
    // center: [120.05736839720697, 29.24779964346209],
    center: [120.22976954242479, 30.23738013830918],
    zoom: defaultZoom,
    minZoom: 7,
    maxZoom: 18,
    centerCross: true,
    attribution: false,
  });

  map.on('click', function (event) {
    console.log('map@click', event);
    console.log([event.coordinate.x, event.coordinate.y]);
  });

  map.on('zoomend', function (event) {
    console.log('map@zoomend', event);
    setMapData(map, event.to, props);
  });

  await loadTDT('baseLayer', map);
  await loadTDT('baseMark', map);
  setMap(map);
  setMapData(map, defaultZoom, props);

  window.map = map;
}

function setMapData(map: maptalks.Map | undefined, zoom: number, props: RootProps) {
  if (!map) return;

  const { data, setModal } = props;
  let gmLayer: maptalks.VectorLayer;

  if (map.getLayer('gm')) gmLayer = map.getLayer('gm') as maptalks.VectorLayer;
  else gmLayer = new maptalks.VectorLayer('gm');
  gmLayer.clear();

  gmLayer.addGeometry(
    maptalks.GeoJSON.toGeometry(zheJiangGeoJSON, (g) => {
      g.setSymbol({
        lineColor: '#34495e',
        lineWidth: 1,
        lineDasharray: [10, 1],
        lineOpacity: 0.5,
        polygonFill: 'rgba(135,196,240,0.2)',
      });
    }),
  );

  console.log(zoom);

  data.forEach((el: any) => {
    let gm: maptalks.Geometry;

    if (zoom < 14) {
      gm = new maptalks.Marker(polylabel([el.paths]), {
        zIndex: 100,
        properties: {
          ...el,
        },
        symbol: [
          {
            markerFile: marker1,
            markerWidth: 22,
            markerHeight: 32,
            markerDx: 0,
            markerDy: 0,
            markerOpacity: 1,
          },
          zoom < 11
            ? undefined
            : {
                textFaceName: 'sans-serif',
                textName: '{name}',
                textSize: 14,
                textDy: 16,
                textFill: '#666',
              },
        ],
      });
    } else {
      gm = new maptalks.Polygon(el.paths, {
        zIndex: 100,
        visible: true,
        editable: true,
        cursor: 'pointer',
        shadowBlur: 0,
        shadowColor: 'black',
        draggable: false,
        dragShadow: false, // display a shadow during dragging
        drawOnAxis: null, // force dragging stick on a axis, can be: x, y
        properties: {
          ...el,
        },
        symbol: [
          {
            lineColor: '#34495e',
            lineWidth: 2,
            lineDasharray: [5, 1],
            lineOpacity: 0.8,
            polygonFill: 'rgba(135,196,240,0.5)',
            polygonOpacity: 0.6,
          },
          {
            textFaceName: 'sans-serif',
            textName: '{name}',
            textSize: 14,
            textFill: '#666',
            textDy: 0,
          },
        ],
      });
    }

    gm.on('click', (e) => {
      setModal({ visible: true, data: e.target.properties });
      e.domEvent.stopPropagation();
    });

    gmLayer.addGeometry(gm);
  });

  gmLayer.addTo(map);
}

/**
 * 加载天地图
 *
 * @url http://lbs.tianditu.gov.cn/server/MapService.html
 **/
function loadTDT(type: 'baseLayer' | 'baseMark', map: maptalks.Map) {
  return new Promise((resolve) => {
    const typeMap = {
      baseLayer: 'vec_c',
      baseMark: 'cva_c',
    };
    const token = 'e3b33338ebbdb458782748a0e435e815';
    const query = `request=GetCapabilities&service=wmts&tk=${token}`;
    const url = `https://t0.tianditu.gov.cn/${typeMap[type]}/wmts?${query}`;

    maptalks.SpatialReference.loadWMTS(url, function (err, conf) {
      if (err) throw new Error(err);
      const params = conf[0];
      params.urlTemplate += `&tk=${token}`;
      params.urlTemplate = params.urlTemplate.replace('//t0', '//t{s}');
      params.subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
      console.log('map@params', params);
      map.setSpatialReference(params.spatialReference);
      map.addLayer(new maptalks.TileLayer(type, params));
      resolve(null);
    });
  });
}
