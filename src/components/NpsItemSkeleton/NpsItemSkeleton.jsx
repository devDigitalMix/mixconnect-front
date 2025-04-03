import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NpsItemSkeletonStyled } from "./NpsItemSkeletonStyled";

export function NpsItemSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <NpsItemSkeletonStyled key={index}>
        <img src="/avatar-default.png" />
        <div>
          <h2>{<Skeleton width="200px" />}</h2>
          <h2>{<Skeleton width="120px" />}</h2>
          <h2>{<Skeleton width="70px" />}</h2>
        </div>
      </NpsItemSkeletonStyled>
    ));
}
