/**
 * Parse comma-separated hostnames from environment variable
 * @param envVar - Environment variable string (comma-separated)
 * @param fallback - Fallback hostnames array
 * @returns Array of hostname strings
 */
export function parseHostnames(
  envVar?: string,
  fallback: string[] = [],
): string[] {
  if (!envVar || envVar.trim() === "") {
    return fallback;
  }

  return envVar
    .split(",")
    .map((hostname) => hostname.trim())
    .filter((hostname) => hostname.length > 0);
}

/**
 * Create Next.js image remote patterns from hostnames
 * @param hostnames - Array of hostname strings
 * @param protocol - Protocol to use (default: 'https')
 * @returns Array of Next.js remote patterns
 */
export function createImageRemotePatterns(
  hostnames: string[],
  protocol: "http" | "https" = "https",
) {
  return hostnames.map((hostname) => ({
    protocol,
    hostname,
  }));
}

/**
 * Generate Content Security Policy based on environment and hostnames
 * @param strictMode - Whether to use strict CSP
 * @param allowedHostnames - Array of allowed hostnames
 * @returns CSP policy string
 */
export function generateCSP(
  strictMode: boolean,
  allowedHostnames: string[] = [],
): string {
  if (strictMode) {
    return "default-src 'self'; script-src 'none'; sandbox;";
  }

  const hostnameList =
    allowedHostnames.length > 0
      ? ` ${allowedHostnames.map((h) => `https://${h}`).join(" ")}`
      : "";

  return `default-src 'self' data:${hostnameList}; script-src 'none'; img-src 'self' data: blob:${hostnameList}; sandbox;`;
}

/**
 * Get environment-based configuration
 */
export function getEnvConfig() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  const imageHostnames = parseHostnames(
    process.env.NEXT_PUBLIC_ALLOWED_IMAGE_HOSTNAMES,
    ["placehold.co"],
  );

  const allowedHostnames = parseHostnames(
    process.env.NEXT_PUBLIC_ALLOWED_HOSTNAMES,
    [],
  );

  const imageRemotePatterns = createImageRemotePatterns(imageHostnames);

  if (isDevelopment) {
    const devImageHostnames = parseHostnames(
      process.env.NEXT_PUBLIC_DEV_IMAGE_HOSTNAMES,
      ["localhost", "127.0.0.1"],
    );

    imageRemotePatterns.push(
      ...createImageRemotePatterns(devImageHostnames, "http"),
      ...createImageRemotePatterns(devImageHostnames, "https"),
    );
  }

  const strictCSP = process.env.NEXT_PUBLIC_STRICT_CSP === "true";
  const contentSecurityPolicy = generateCSP(strictCSP, allowedHostnames);

  return {
    isDevelopment,
    isProduction,
    imageHostnames,
    allowedHostnames,
    imageRemotePatterns,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
    allowRobots: process.env.NEXT_PUBLIC_ALLOW_ROBOTS === "true",
    strictCSP,
    contentSecurityPolicy,
  };
}
