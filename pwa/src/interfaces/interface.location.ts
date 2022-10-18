import Observation from './interface.observation'
import { Polygon } from 'geojson'

export default interface Location {
  id: string
  name: string
  observations: Observation[]
  area: Polygon
  createdAt?: Date
  updatedAt?: Date
}
