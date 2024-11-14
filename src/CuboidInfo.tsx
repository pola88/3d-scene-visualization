import styled from "styled-components";
import { Cuboid } from "./types";

interface CuboidInfoProps {
  cuboid?: Cuboid
}

const FieldContainer = styled.div`
  margin: 16px 0;
`;

const Label = styled.div`
  font-weight: 600;
`;

const Value = styled.div`
  margin-left: 16px;
`;

export const CuboidInfo = ({ cuboid }: CuboidInfoProps) => {
  return <div>
    <h3>Cuboid info</h3>
    {cuboid && 
      <>
        <FieldContainer>
          <Label>Uuid</Label>
          <Value>{cuboid.uuid}</Value>
        </FieldContainer>
        <FieldContainer>
          <Label>Label</Label>
          <Value>{cuboid.label}</Value>
        </FieldContainer>
        <FieldContainer>
          <Label>Position</Label>
          <Value>X: {cuboid.position[0]}</Value>
          <Value>Y: {cuboid.position[1]}</Value>
          <Value>Z: {cuboid.position[2]}</Value>
        </FieldContainer>
        <FieldContainer>
          <Label>Dimensions</Label>
          <Value>X: {cuboid.dimensions[0]}</Value>
          <Value>Y: {cuboid.dimensions[1]}</Value>
          <Value>Z: {cuboid.dimensions[2]}</Value>
        </FieldContainer>
        <FieldContainer>
          <Label>Camera used</Label>
          <Value>{cuboid.camera_used}</Value>
        </FieldContainer>
        <FieldContainer>
          <Label>Stationary</Label>
          <Value>{cuboid.stationary.toString()}</Value>
        </FieldContainer>
      </>
    }
  </div>
};