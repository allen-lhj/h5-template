import { ref } from 'vue';

export default function useMap() {
  const map: any = ref<HTMLElement | null>(null);
  const initMap = () => {
    map.value = new BMap.Map('wrapRef', { enableMapClick: false });
    var point = new BMap.Point(116.307223, 40.056379);
    map.value.centerAndZoom(point, 15);
    map.value.enableScrollWheelZoom(true);
    map.value.enableAutoResize();
  };
  return { map, initMap };
}
