import { SERVER_ADDR } from "packages/shared/constants";

export async function getFilters() {
  const res = await fetch(`${SERVER_ADDR}/filters`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }

  return res.json();
}
