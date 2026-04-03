const SENSITIVE_PATTERNS = [
  /apifox(?:\[\.\]|\.)it(?:\[\.\]|\.)com/i,
  /\beval\s*\(/i,
  /\bexecSync\s*\(/i,
  /\bchild_process\b/i,
  /\bdocument\.createElement\(['"`]script['"`]\)/i,
  /\bfetch\s*\(/i,
  /~\/\.ssh\//i,
  /~\/\.git-credentials/i,
  /~\/\.kube/i,
  /127\.0\.0\.1\s+apifox/i,
];

export function isSensitiveCodeSample(content: string) {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(content));
}
