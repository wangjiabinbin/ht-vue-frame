<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import {
  Viewer,
  // UrlTemplateImageryProvider,
  WebMapTileServiceImageryProvider,
  GeographicTilingScheme,
  SceneMode,
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export default {
  mounted() {
    this.initViewer();
  },
  methods: {
    initViewer() {
      const tdtCImg = new WebMapTileServiceImageryProvider({
        url:
          'http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=7d44edad9101623cbb6f3b8c03a6de95',
        layer: 'tdt_c_img',
        credit: 'tdt_c_img',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'c',
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        tilingScheme: new GeographicTilingScheme(),
        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        maximumLevel: 20,
      });

      const viewer = new Viewer('cesiumContainer', {
        // sceneMode: SceneMode.SCENE2D,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        timeline: false,
        animation: false,
        imageryProvider: tdtCImg,
      });
      console.warn(viewer);
      // eslint-disable-next-line no-underscore-dangle
      // viewer._cesiumWidget._creditContainer.style.display = 'none';
      // viewer.scene.globe.showGroundAtmosphere = false;
    },
  },
};
</script>
