import Skeleton from "react-loading-skeleton";
import { ATask, TaskSkeletonContent } from "./TaskSkeletonStyled";

export function TaskSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <ATask key={index}>
        <TaskSkeletonContent>
          <span className="box"></span>
          <Skeleton width="250px" />
        </TaskSkeletonContent>
      </ATask>
    ));
}
