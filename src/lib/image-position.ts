import type { ImagePosition } from "@/types";

export function getObjectPosition(position: ImagePosition = "center") {
  const positions: Record<ImagePosition, string> = {
    center: "center center",
    top: "center top",
    bottom: "center bottom",
    left: "left center",
    right: "right center",
  };

  return positions[position];
}
