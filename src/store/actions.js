import {CURRENT_IMAGE_ID} from './constants'

export function setCurrentImageId(payload) {
  return { type: "CURRENT_IMAGE_ID", payload }
}
