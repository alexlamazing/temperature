export enum ALERT_TYPE {
  FREEZING = 'freezing',
  UNFREEZING = 'unfreezing',
  BOILING = 'boiling',
  UNBOILING = 'unboiling',
}

export type TemperatureListItem = {
  temperature: number
  alert: ALERT_TYPE | null
}
