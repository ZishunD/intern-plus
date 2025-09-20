"use client";

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
}

export default function Loading({
  width = "full",
  height = "6",
  className = "",
  rounded = true,
}: LoadingSkeletonProps) {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${
        rounded ? "rounded" : ""
      } ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}></div>
  );
}
