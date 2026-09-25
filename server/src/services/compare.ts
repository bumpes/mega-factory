import fs from 'fs';
import path from 'path';
import { getDb, save } from '../db/sqlite';
import { getOutputDir } from './gallery';
import { getReference } from './references';

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

export interface ScoreCard {
  feat_scale: number;
  feat_composition: number;
  feat_light: number;
  feat_detail: number;
  feat_material: number;
  feat_mood: number;
  feat_color: number;
}

export function pickRefRandom(): ReturnType<typeof getReference> {
  const db = getDb();
  const stmt = db.prepare('SELECT id FROM "references" ORDER BY RANDOM() LIMIT 1');
  if (stmt.step()) {
    const row = stmt.getAsObject() as { id: string };
    stmt.free();
    return getReference(row.id);
  }
  stmt.free();
  return null;
}

export function pickRefById(id: string) {
  return getReference(id);
}

export function prefillBFromFeatureCard(refId: string): ScoreCard | null {
  const ref = getReference(refId);
  if (!ref) return null;
  return {
    feat_scale: ref.feat_scale,
    feat_composition: ref.feat_composition,
    feat_light: ref.feat_light,
    feat_detail: ref.feat_detail,
    feat_material: ref.feat_material,
    feat_mood: ref.feat_mood,
    feat_color: ref.feat_color,
  };
}

export function computeDiff(scoreA: ScoreCard, scoreB: ScoreCard): Record<string, number> {
  const diff: Record<string, number> = {};
  for (const key of Object.keys(scoreA) as (keyof ScoreCard)[]) {
    diff[key] = Math.abs(scoreA[key] - scoreB[key]);
  }
  return diff;
}

export function saveComparison(params: {
  creationId: string;
  genImagePath: string;
  refId: string;
  scoreA: ScoreCard;
  scoreB: ScoreCard;
  note: string;
}): Comparison {
  const id = `cmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  const diff = computeDiff(params.scoreA, params.scoreB);
  const scoreAJson = JSON.stringify(params.scoreA);
  const scoreBJson = JSON.stringify(params.scoreB);
  const diffJson = JSON.stringify(diff);

  const reportResult = writeReport(params.creationId, params.genImagePath, params.scoreA, params.scoreB, diff, params.note);

  const db = getDb();
  db.run(
    `INSERT INTO comparisons (id, creation_id, gen_image_path, ref_id, score_a_json, score_b_json, diff_json, note, report_md_path, report_json_path, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, params.creationId, params.genImagePath, params.refId, scoreAJson, scoreBJson, diffJson, params.note, reportResult.mdPath, reportResult.jsonPath, now]
  );
  save();

  return getComparison(id)!;
}

function writeReport(
  creationId: string,
  genImagePath: string,
  scoreA: ScoreCard,
  scoreB: ScoreCard,
  diff: Record<string, number>,
  note: string
): { mdPath: string; jsonPath: string } {
  const outputDir = getOutputDir();
  const reportDir = path.join(outputDir, '_reports', creationId);
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const ts = Date.now();
  const mdPath = path.join(reportDir, `report_${ts}.md`);
  const jsonPath = path.join(reportDir, `report_${ts}.json`);

  const warnings = Object.entries(diff).filter(([, v]) => v >= 2).map(([k]) => k);
  const md = [
    `# 比较报告`,
    ``,
    `- 生成图: ${genImagePath}`,
    `- 参考图ID: ${creationId}`,
    `- 时间: ${new Date().toISOString()}`,
    ``,
    `## A侧 (生成)`,
    Object.entries(scoreA).map(([k, v]) => `- ${k}: ${v}`).join('\n'),
    ``,
    `## B侧 (参考)`,
    Object.entries(scoreB).map(([k, v]) => `- ${k}: ${v}`).join('\n'),
    ``,
    `## 差值`,
    Object.entries(diff).map(([k, v]) => `- ${k}: ${v}${v >= 2 ? ' ⚠️' : ''}`).join('\n'),
    ``,
    warnings.length > 0 ? `## ⚠️ 差异较大维度: ${warnings.join(', ')}` : '',
    ``,
    `## 备注`,
    note,
  ].filter(Boolean).join('\n');

  const json = JSON.stringify({ creationId, genImagePath, scoreA, scoreB, diff, warnings, note }, null, 2);

  fs.writeFileSync(mdPath, md, 'utf-8');
  fs.writeFileSync(jsonPath, json, 'utf-8');

  return { mdPath, jsonPath };
}

export function getComparison(id: string): Comparison | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM comparisons WHERE id = ?');
  stmt.bind([id]);
  let result: Comparison | null = null;
  if (stmt.step()) {
    result = stmt.getAsObject() as unknown as Comparison;
  }
  stmt.free();
  return result;
}

export function listHistory(creationId?: string): Comparison[] {
  const db = getDb();
  const results: Comparison[] = [];
  let stmt;
  if (creationId) {
    stmt = db.prepare('SELECT * FROM comparisons WHERE creation_id = ? ORDER BY created_at DESC');
    stmt.bind([creationId]);
  } else {
    stmt = db.prepare('SELECT * FROM comparisons ORDER BY created_at DESC');
  }
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as Comparison);
  }
  stmt.free();
  return results;
}
