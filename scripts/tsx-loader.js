import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('/constants') || specifier === '../constants' || specifier === './constants') {
    return nextResolve(specifier + '.tsx', context);
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.tsx')) {
    const filePath = fileURLToPath(url);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const transpiled = ts.transpileModule(raw, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.Preserve,
      },
    }).outputText;
    return {
      format: 'module',
      shortCircuit: true,
      source: transpiled,
    };
  }
  return nextLoad(url, context);
}
