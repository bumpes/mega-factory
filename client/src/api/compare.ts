const BASE = '/api';

export interface ScoreCard {
  feat_scale: number;
  feat_composition: number;
  feat_light: number;
  feat_detail: number;
  feat_material: number;
  feat_mood: number;
  feat_color: number;
}

export interface Comparison {
  id: string;
  creation_id: string;
  gen_image_path: string;
  ref_id: string;
  score_a_json: string;
  score_b_json: string;
  diff_json: string;
  note: string;
  report_md_path: string;
  report_json_path: string;
  created_at: string;
}

export async function fetchHistory(creationId?: string): Promise<Comparison[]> {
  const url = creationId
    ? `${BASE}/compare/history?creationId=${encodeURIComponent(creationId)}`
    : `${BASE}/compare/history`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchComparison(id: string): Promise<Comparison> {
  const res = await fetch(`${BASE}/compare/${id}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function createComparison(params: {
  creationId: string;
  genImagePath: string;
  refId: string;
  scoreA: ScoreCard;
  scoreB: ScoreCard;
  note: string;
}): Promise<Comparison> {
  const res = await fetch(`${BASE}/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function pickRefRandom(): Promise<{ ref: unknown }> {
  const res = await fetch(`${BASE}/compare/pick-ref/random`);
  return res.json();
}

export async function prefillFromCard(refId: string): Promise<ScoreCard> {
  const res = await fetch(`${BASE}/compare/prefill/${refId}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function computeDiff(scoreA: ScoreCard, scoreB: ScoreCard): Promise<Record<string, number>> {
  const res = await fetch(`${BASE}/compare/compute-diff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scoreA, scoreB }),
  });
  return res.json();
}
