export function formatGrade(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
