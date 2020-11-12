<template>
  <div id="olContainer"></div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default {
  mounted() {
    this.initViewer();
  },
  methods: {
    initViewer() {
      const map = new Map({
        target: 'olContainer',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 0,
        }),
      });
    },
  },
};
</script>

<style lang="scss">
#olContainer {
  width: 100%;
  height: 100%;
}
</style>
