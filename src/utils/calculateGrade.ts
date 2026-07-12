export function calculateGradeStatus(score: number, kkm: number) {
  return score >= kkm ? "Tuntas" : "Belum Tuntas";
}

export function calculateAverage(scores: number[]) {
  if (!scores.length) return 0;
  return scores.reduce((total, score) => total + score, 0) / scores.length;
}
