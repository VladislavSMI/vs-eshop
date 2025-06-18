#!/usr/bin/env bash

k6 run \
  --out json=perf/k6-run.json \
  --summary-export=perf/k6-summary.json \
  perf/k6-basic.js