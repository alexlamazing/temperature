import CONST from '../const'
import { ALERT_TYPE, TemperatureListItem } from '../types'

/**
 * This function is used to determine
 * the alert of each temperature in an array of temperatures
 */

export const withAlert = (temperatures: number[]) => {

  let alert: ALERT_TYPE | null = null

  const result: TemperatureListItem[] = []

  for (let i = 0; i < temperatures.length; i++) {
    const isFreezing = 
      temperatures[i] <= CONST.THRESHOLD_FREEZING &&
      temperatures[i - 1] > CONST.THRESHOLD_FREEZING // prev temp is above freezing point

    const isUnfreezing = 
      temperatures[i] > CONST.THRESHOLD_FREEZING &&
      temperatures[i - 1] <= CONST.THRESHOLD_FREEZING // prev temp is less than or equal to freezing point

    const isBoiling = 
      temperatures[i] >= CONST.THRESHOLD_BOILING &&
      temperatures[i - 1] < CONST.THRESHOLD_BOILING  // prev temp is below boiling point

    const isUnboiling = 
      temperatures[i] < CONST.THRESHOLD_BOILING &&
      temperatures[i - 1] >= CONST.THRESHOLD_BOILING  // prev temp is greater than or equal to boiling point

    const isFluctuating =
      (alert === ALERT_TYPE.FREEZING && Math.abs(temperatures[i] - CONST.THRESHOLD_FREEZING) <= CONST.FLUCTUATION) ||
      (alert === ALERT_TYPE.BOILING && Math.abs(temperatures[i] - CONST.THRESHOLD_BOILING) <= CONST.FLUCTUATION)
    
    if (isFreezing) {
      if (!isFluctuating) {
        alert = ALERT_TYPE.FREEZING
        result.push({
          temperature: temperatures[i],
          alert,
        })
      } else {
        // do NOT repeatedly trigger freezing if is fluctuating
        result.push({
          temperature: temperatures[i],
          alert: null,
        })
      }
      
    } else if (isUnfreezing) {
      if (!isFluctuating) {
        alert = ALERT_TYPE.UNFREEZING
        result.push({
          temperature: temperatures[i],
          alert,
        })
      } else {
        // do NOT repeatedly trigger unfreezing if is fluctuating
        result.push({
          temperature: temperatures[i],
          alert: null,
        })
      }

    } else if (isBoiling) {
      if (!isFluctuating) {
        alert = ALERT_TYPE.BOILING
        result.push({
          temperature: temperatures[i],
          alert,
        })
      } else {
        // do NOT repeatedly trigger boiling if is fluctuating
        result.push({
          temperature: temperatures[i],
          alert: null,
        })
      }

    } else if (isUnboiling) {
      if (!isFluctuating) {
        alert = ALERT_TYPE.UNBOILING
        result.push({
          temperature: temperatures[i],
          alert,
        })
      } else {
        // do NOT repeatedly trigger unboiling if is fluctuating
        result.push({
          temperature: temperatures[i],
          alert: null,
        })
      }

    } else {
      result.push({
        temperature: temperatures[i],
        alert: null,
      })
    }
  }

  return result
}
