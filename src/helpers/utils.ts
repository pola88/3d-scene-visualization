import { Cuboid, JSONCuboid } from "../types";

// export const findMaxInChunks = (array: number[], chunkSize = 10000): number => {
//   const maxValues = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     const chunk = array.slice(i, i + chunkSize);
//     maxValues.push(Math.max(...chunk));
//   }
//   return Math.max(...maxValues);
// };

export const parseCuboids = (jsonCuboids: JSONCuboid[]): Cuboid[] => jsonCuboids.map(cuboid => ({
  uuid: cuboid.uuid,
  label: cuboid.label,
  yaw: cuboid.yaw,
  stationary: cuboid.stationary,
  camera_used: cuboid.camera_used,
  position: [cuboid['position.x'], cuboid['position.y'], cuboid['position.z']],
  dimensions: [cuboid['dimensions.x'], cuboid['dimensions.y'], cuboid['dimensions.z']]
}))