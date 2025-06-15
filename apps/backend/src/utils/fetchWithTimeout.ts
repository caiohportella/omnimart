export async function fetchWithTimeout(resource: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
