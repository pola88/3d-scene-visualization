import { Cuboid, JSONCuboid } from "../types";

export const parseCuboids = (jsonCuboids: JSONCuboid[]): Cuboid[] => jsonCuboids.map(cuboid => ({
  uuid: cuboid.uuid,
  label: cuboid.label,
  yaw: cuboid.yaw,
  stationary: cuboid.stationary,
  camera_used: cuboid.camera_used,
  position: [cuboid['position.x'], cuboid['position.y'], cuboid['position.z']],
  dimensions: [cuboid['dimensions.x'], cuboid['dimensions.y'], cuboid['dimensions.z']]
}))