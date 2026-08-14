# -*- coding: utf-8 -*-
from pathlib import Path
import json
import re

text = Path(__file__).resolve().parents[1].joinpath(".superpowers/sdd/relation-space-doc.txt").read_text(encoding="utf-8")
parts = re.split(r"\n(?=\d+\. )", text)
patterns = []
for p in parts:
    m = re.match(r"(\d+)\. (.+)", p)
    if not m:
        continue
    num = int(m.group(1))
    if num < 1 or num > 12:
        continue
    title = m.group(2).strip().split("\n")[0].strip()
    body = p.split("\n", 1)[1].strip() if "\n" in p else ""
    paras = [x.strip() for x in body.split("\n") if x.strip()]
    observe = paras[0] if len(paras) > 0 else ""
    hypo = paras[1] if len(paras) > 1 else ""
    question = paras[2] if len(paras) > 2 else ""
    action = paras[3] if len(paras) > 3 else ""
    struct = ""
    mm = re.search(r"理解为[「\"](.+?)[」\"]", action)
    if mm:
        struct = mm.group(1)
    patterns.append(
        {
            "id": f"p{num:02d}",
            "name": title,
            "observe": observe,
            "hypothesis": hypo,
            "question": question,
            "structure": struct,
            "action": action,
        }
    )

header = """/**
 * 心画·关系空间构图 — 解读模式数据
 * 【重要】以下内容模拟「后台配置」下发的解读模板。
 * 原型阶段可用结果页演示条切换；后续接入真实后台时，仅替换数据源即可，不必改画板逻辑。
 * source: backend-config (mock) / 《关系空间构图法》
 */
window.XinhuaPatterns =
"""
out = Path(__file__).resolve().parents[1].joinpath("js/xinhua-patterns.js")
out.write_text(header + json.dumps(patterns, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
print("patterns", len(patterns), "->", out)
