import { station } from 'server/config/stationData';

export function suggestStations(partialName: string) {
  const matchedStations = station.filter((s) => s.name.includes(partialName));
  return matchedStations.map((r) => r);
}
