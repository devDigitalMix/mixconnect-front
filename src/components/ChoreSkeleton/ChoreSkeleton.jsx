import Skeleton from "react-loading-skeleton";
import { AChore, ChoreContent } from "./ChoreSkeletonStyled";

export function ChoreSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <AChore key={index}>
        <img src="/normal-bottom.png" id="nb" />
        <img src="/normal-top.png" id="nt" />
        <ChoreContent>
          <Skeleton width="150px" />
        </ChoreContent>
      </AChore>
    ));
}
