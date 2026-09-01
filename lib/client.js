/**
 * Claude-style skin for the dsh web GUI.
 *
 * Hand-written bundle in the official __ModuleLoader__ format (no build step):
 * apply() sets the `data-dsh-claude` body attribute (the scope of the whole
 * stylesheet), injects one <style> tag carrying the Claude look, and pins the
 * document title. Its effect disposer retracts every write: body attributes,
 * style tag, title (only while the title is still the skin's own).
 *
 * Font modes:
 *   anthropic (default) — native Claude typography: Anthropic Sans for UI,
 *     Anthropic Serif for conversation/markdown, Anthropic Mono for code.
 *   skin                — the original skin's editorial serif UI.
 *   system              — leave DSH's default font stack untouched.
 * The choice is persisted in localStorage and exposed as a Settings → General
 * row ("Claude 字体风格 / Claude font style").
 *
 * Palette: Anthropic's official brand tokens (aligned with the community
 * "claude-theme" VS Code theme derived from the official brand palette):
 *   dark bg #141413 · elevated #262624 · deep input #0a0a09
 *   text #faf9f5 · secondary #b0aea5 · muted #6b6a65
 *   accent clay #d97757 · hover #e08a6d
 *   link #6a9bcc · green #788c5d · amber #c08c3a · teal #6a9b91 · lavender #9588a8
 *   light bg #faf9f5 · card #ffffff · border #e8e6dc · text #141413
 *
 * Presentation-only: no services injected, no cordis events, no model requests.
 */
window.__ModuleLoader__.load({
  id: '@pakiknowledge/dsh-client-ui-skin-claude',
  factory: (require) => {
    'use strict'
    var module = { exports: {} }
    var exports = module.exports

    var react_jsx_runtime = require('react/jsx-runtime')
    var _react = require('react')
    var _store = require('@deepseek-ai/dsh-client-store')
    var _primitives = require('@deepseek-ai/dsh-client-ui-primitives')

    var SKIN_TITLE = 'Claude · DeepSeek Harness'

    var STYLE_ID = 'dsh-skin-claude-style'

    var SETTINGS_NS = 'settings.claudeSkin'
    var FONT_STORAGE_KEY = 'dsh-client-ui-skin-claude:fontMode'
    var DEFAULT_FONT_MODE = 'anthropic'
    var FONT_MODES = ['anthropic', 'skin', 'system']

    var CSS = [
      /* Claude typography — three font modes:
         anthropic = native Claude: Sans UI, Serif conversation, Mono code (default)
         skin      = the original skin's editorial serif UI
         system    = leave DSH default fonts untouched */
      'body[data-dsh-claude][data-dsh-font="anthropic"] {',
      '  --dsw-font-family: "Anthropic Sans Web Text", "Noto Sans SC", "Source Han Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;',
      '  --dsw-font-serif: "Anthropic Serif Web Text", Georgia, "Times New Roman", "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif;',
      '  --ds-font-family-code: "Anthropic Mono Variable", "Source Han Sans SC", ui-monospace, "SF Mono", "JetBrains Mono", "Fira Code", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
      '  --dsw-font-markdown-h1: 700 24px/34px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h1-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-h2: 700 22px/32px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h2-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-h3: 700 20px/30px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h3-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-h4: 600 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h4-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base: 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong: 600 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-italic: italic 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-italic-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong-italic: italic 600 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong-italic-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-table: 15px/25px var(--dsw-font-serif);',
      '  --dsw-font-markdown-table-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-table-head: 500 15px/25px var(--dsw-font-serif);',
      '  --dsw-font-markdown-table-head-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small: 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong: 600 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-italic: italic 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-italic-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong-italic: italic 600 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong-italic-font-family: var(--dsw-font-serif);',
      '  font-family: var(--dsw-font-family);',
      '  font-feature-settings: "onum" 1;',
      '}',
      '',
      'body[data-dsh-claude][data-dsh-font="skin"] {',
      '  --dsw-font-family: Georgia, "Anthropic Serif Web Text", "Times New Roman", "Noto Serif SC", "Songti SC", "SimSun", serif;',
      '  --dsw-font-serif: Georgia, "Copernicus", "Tiempos Headline", "Times New Roman", serif;',
      '  --ds-font-family-code: "Anthropic Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;',
      '  --dsw-font-markdown-h1: 700 24px/34px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h1-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-h2: 700 22px/32px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h2-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-h3: 700 20px/30px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h3-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-h4: 600 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-h4-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base: 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong: 600 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-italic: italic 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-italic-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong-italic: italic 600 16px/28px var(--dsw-font-serif);',
      '  --dsw-font-markdown-base-strong-italic-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-table: 15px/25px var(--dsw-font-serif);',
      '  --dsw-font-markdown-table-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-table-head: 500 15px/25px var(--dsw-font-serif);',
      '  --dsw-font-markdown-table-head-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small: 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong: 600 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-italic: italic 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-italic-font-family: var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong-italic: italic 600 14px/24px var(--dsw-font-serif);',
      '  --dsw-font-markdown-small-strong-italic-font-family: var(--dsw-font-serif);',
      '  font-family: var(--dsw-font-family);',
      '  font-feature-settings: "onum" 1;',
      '}',
      '',
      'body[data-dsh-claude][data-dsh-font="skin"] :is(h1, h2, h3, h4, [class*="headline"]) {',
      '  font-family: Georgia, "Copernicus", "Tiempos Headline", "Times New Roman", serif;',
      '  font-weight: 400;',
      '  letter-spacing: -0.01em;',
      '}',
      '',
      'body[data-dsh-claude] :is(pre, code, kbd, samp, [class*="mono"], [class*="codeBlock"], [class*="CodeBlock"]) {',
      '  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace);',
      '  font-size: 0.9em;',
      '}',
      '',
      '/* Settings row: match DSH native EnterBehaviorRow selector */',
      'body[data-dsh-claude] .dsh-skin-font-row {',
      '  border-bottom: 1px solid var(--dsw-alias-border-l2);',
      '  align-items: center;',
      '  gap: 8px;',
      '  padding: 16px 0;',
      '  display: flex;',
      '}',
      '',
      'body[data-dsh-claude] .dsh-skin-font-rowText {',
      '  flex-direction: column;',
      '  flex: 1;',
      '  gap: 4px;',
      '  min-width: 0;',
      '  padding-right: 48px;',
      '  display: flex;',
      '}',
      '',
      'body[data-dsh-claude] .dsh-skin-font-title {',
      '  color: var(--dsw-alias-label-primary);',
      '  font-size: 14px;',
      '  font-weight: 400;',
      '  line-height: 22px;',
      '}',
      '',
      'body[data-dsh-claude] .dsh-skin-font-desc {',
      '  color: var(--dsw-alias-label-tertiary);',
      '  font-size: 12px;',
      '  font-weight: 400;',
      '  line-height: 18px;',
      '}',
      '',
      'body[data-dsh-claude] .dsh-skin-font-selector {',
      '  background: var(--dsw-alias-bg-module-platform);',
      '  height: 36px;',
      '  font: inherit;',
      '  color: var(--dsw-alias-label-primary);',
      '  cursor: pointer;',
      '  border: none;',
      '  border-radius: 18px;',
      '  align-items: center;',
      '  gap: 12px;',
      '  padding: 0 14px;',
      '  font-size: 14px;',
      '  line-height: 22px;',
      '  display: inline-flex;',
      '}',
      '',
      'body[data-dsh-claude] .dsh-skin-font-selector:hover {',
      '  background: var(--dsw-alias-interactive-bg-hover);',
      '}',
      '',
      'body[data-dsh-claude] .dsh-skin-font-chevron {',
      '  flex: none;',
      '}',
      '',
      '/* TurnStatus "Deep diving..." — Claude clay shimmer, same motion as DSH */',
      'body[data-dsh-claude] [role="status"][aria-live="polite"] {',
      '  color: #0000;',
      '  -webkit-text-fill-color: transparent;',
      '  background: linear-gradient(90deg, #d97757 0%, #d97757 40%, #e08a6d 50%, #d97757 60%, #d97757 100%);',
      '  background-size: 250% 100%;',
      '  background-position: 100% 0;',
      '  -webkit-background-clip: text;',
      '  background-clip: text;',
      '  animation: 1.8s linear infinite dsh-claude-turn-status-shimmer;',
      '}',
      '',
      '@keyframes dsh-claude-turn-status-shimmer {',
      '  to { background-position: 0 0; }',
      '}',
      '',
      '/* Claude scrollbars: slim, rounded, low-key */',
      'body[data-dsh-claude] * {',
      '  scrollbar-width: thin;',
      '  scrollbar-color: rgba(48, 48, 46, 0.8) transparent;',
      '}',
      '',
      'body[data-dsh-claude] ::-webkit-scrollbar {',
      '  width: 8px;',
      '  height: 8px;',
      '}',
      '',
      'body[data-dsh-claude] ::-webkit-scrollbar-track {',
      '  background: transparent;',
      '}',
      '',
      'body[data-dsh-claude] ::-webkit-scrollbar-thumb {',
      '  background: rgba(48, 48, 46, 0.8);',
      '  border-radius: 9999px;',
      '}',
      '',
      'body[data-dsh-claude] ::-webkit-scrollbar-thumb:hover {',
      '  background: rgba(107, 106, 101, 0.8);',
      '}',
      '',
      '/* Claude selection: clay-tinted highlight */',
      'body[data-dsh-claude] ::selection {',
      '  background: rgba(217, 119, 87, 0.28);',
      '  color: inherit;',
      '}',
      '',
      '/* Claude focus ring: clay outline on interactive elements */',
      'body[data-dsh-claude] :is(button, input, textarea, select, [role="button"], [role="tab"], [role="treeitem"]) {',
      '  outline: none;',
      '}',
      '',
      'body[data-dsh-claude] :is(button, input, textarea, select, [role="button"], [role="tab"], [role="treeitem"]):focus-visible {',
      '  outline: 2px solid rgba(217, 119, 87, 0.7);',
      '  outline-offset: 1px;',
      '}',
      '',
      '/* Claude buttons: clay primary stays, shape owned by DSH */',
      'body[data-dsh-claude] button[class*="newSession"],',
      'body[data-dsh-claude] [data-slot="sidebar.settings"] > :is(button, [role="button"]) {',
      '  background: #d97757;',
      '  color: #ffffff;',
      '}',
      '',
      '/* Claude badges: full pill (color/soft only, not layout-breaking) */',
      'body[data-dsh-claude] :is([class*="badge"], [class*="Badge"]) {',
      '  border-radius: 9999px;',
      '}',
      '',
      '/* Claude uppercase captions: tracked out */',
      'body[data-dsh-claude] :is([class*="caption"], [class*="sectionLabel"], [class*="label"]) {',
      '  letter-spacing: 0.06em;',
      '}',
      '',
      'body[data-dsh-claude] {',
      '  --dsw-alias-bg-base: #141413;',
      '  --dsw-alias-bg-layer-1: #1d1d1c;',
      '  --dsw-alias-bg-layer-2: #262624;',
      '  --dsw-alias-bg-layer-3: #30302e;',
      '  --dsw-alias-bg-overlay: #262624;',
      '  --dsw-alias-border-l1: #262624;',
      '  --dsw-alias-border-l2-darkmode-thin: #30302e;',
      '  --dsw-alias-border-l2: #30302e;',
      '  --dsw-alias-border-l3: #3a3a38;',
      '  --dsw-alias-brand-primary: #d97757;',
      '  --dsw-alias-brand-text: #faf9f5;',
      '  --dsw-alias-button-elevated-fill: #262624;',
      '  --dsw-alias-button-floating-fill: #262624;',
      '  --dsw-alias-button-floating-hover: #30302e;',
      '  --dsw-alias-button-info-fill: #d97757;',
      '  --dsw-alias-button-info-hover: #e08a6d;',
      '  --dsw-alias-interactive-bg-active: rgba(217, 119, 87, 0.28);',
      '  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.05);',
      '  --dsw-alias-interactive-bg-hover-solid: #30302e;',
      '  --dsw-alias-label-primary: #faf9f5;',
      '  --dsw-alias-label-primary-bluish: #faf9f5;',
      '  --dsw-alias-label-secondary: #b0aea5;',
      '  --dsw-alias-label-tertiary: #8f8d84;',
      '  --dsw-alias-label-caption: #6b6a65;',
      '  --dsw-alias-state-business-primary: #d97757;',
      '  --dsw-alias-state-business-tertiary: #3a2a22;',
      '  --dsw-shadow-lv2: 0 18px 54px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);',
      '  --dsw-specific-input-major: #0a0a09;',
      '  --dsw-specific-selector: #30302e;',
      '  --dsw-specific-sidebar-fill: #141413;',
      '  --dsw-specific-bubble: #262624;',
      '  --dsw-specific-bubble-highlight: #30302e;',
      '}',
      '',
      '/* Claude look: warm-black canvas, clay accent, rounded composer */',
      'body[data-dsh-claude] {',
      '  color: #faf9f5;',
      '  background-color: #141413;',
      '}',
      '',
      'body[data-dsh-claude] :is([data-pane="sidebar"], [class*="sidebarCol"]) {',
      '  background: #141413;',
      '  border-right: 1px solid #262624;',
      '}',
      '',
      'body[data-dsh-claude] :is([data-pane="conversation"], [class*="centerCol"]) {',
      '  background: #141413;',
      '}',
      '',
      '/* clay accent on brand / key actions */',
      'body[data-dsh-claude] button[class*="brand"] {',
      '  color: #d97757;',
      '}',
      '',
      'body[data-dsh-claude] button[class*="newSession"],',
      'body[data-dsh-claude] [data-slot="sidebar.settings"] > :is(button, [role="button"]) {',
      '  border-radius: 8px;',
      '  background: #d97757;',
      '  color: #ffffff;',
      '}',
      '',
      '/* links: Anthropic blue */',
      'body[data-dsh-claude] a {',
      '  color: #6a9bcc;',
      '}',
      '',
      '/* light variant: warm cream, follow the native theme switch */',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) {',
      '  color: #141413;',
      '  background-color: #faf9f5;',
      '  --dsw-alias-bg-base: #faf9f5;',
      '  --dsw-alias-bg-layer-1: #f5f4f0;',
      '  --dsw-alias-bg-layer-2: #f0efea;',
      '  --dsw-alias-bg-layer-3: #e8e6dc;',
      '  --dsw-alias-bg-overlay: #ffffff;',
      '  --dsw-alias-border-l1: #e8e6dc;',
      '  --dsw-alias-border-l2: #e8e6dc;',
      '  --dsw-alias-border-l3: #d6d4ca;',
      '  --dsw-alias-brand-primary: #d97757;',
      '  --dsw-alias-button-info-fill: #d97757;',
      '  --dsw-alias-button-info-hover: #c66943;',
      '  --dsw-alias-button-elevated-fill: #ffffff;',
      '  --dsw-alias-button-floating-fill: #ffffff;',
      '  --dsw-alias-button-floating-hover: #f5f4f0;',
      '  --dsw-alias-label-primary: #141413;',
      '  --dsw-alias-label-secondary: #6b6a65;',
      '  --dsw-alias-label-tertiary: #8f8d84;',
      '  --dsw-alias-label-caption: #a6a49b;',
      '  --dsw-specific-input-major: #ffffff;',
      '  --dsw-specific-selector: #f0efea;',
      '  --dsw-specific-sidebar-fill: #faf9f5;',
      '  --dsw-specific-bubble: #f0efea;',
      '  --dsw-specific-bubble-highlight: #e8e6dc;',
      '}',
      '',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) :is([data-pane="sidebar"], [class*="sidebarCol"]) {',
      '  background: #faf9f5;',
      '  border-right: 1px solid #e8e6dc;',
      '}',
      '',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) :is([data-pane="conversation"], [class*="centerCol"]) {',
      '  background: #faf9f5;',
      '}',
      '',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) a {',
      '  color: #6a9bcc;',
      '}',
      '',
      '/* light scrollbar/selection adjustments */',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) * {',
      '  scrollbar-color: rgba(166, 164, 155, 0.6) transparent;',
      '}',
      '',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) ::-webkit-scrollbar-thumb {',
      '  background: rgba(166, 164, 155, 0.6);',
      '}',
      '',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) ::-webkit-scrollbar-thumb:hover {',
      '  background: rgba(107, 106, 101, 0.7);',
      '}',
      '',
      'body[data-dsh-claude]:not([data-ds-dark-theme]) ::selection {',
      '  background: rgba(217, 119, 87, 0.22);',
      '}',
      '',
    ].join('\n')

    /**
     * Persistence helpers for the font-mode preference. localStorage is used
     * because DSH's Host settings wire only exposes allowlisted namespaces to
     * browser clients; this keeps the skin self-contained.
     */
    function readStorage(key) {
      try {
        var value = window.localStorage.getItem(key)
        return typeof value === 'string' ? value : null
      } catch {
        return null
      }
    }

    function writeStorage(key, value) {
      try {
        if (value === null) window.localStorage.removeItem(key)
        else window.localStorage.setItem(key, value)
      } catch {
        // storage unavailable / quota — the preference stays process-local
      }
    }

    function readSavedFontMode() {
      var saved = readStorage(FONT_STORAGE_KEY)
      return FONT_MODES.indexOf(saved) !== -1 ? saved : DEFAULT_FONT_MODE
    }

    function applyFontMode(mode) {
      if (document.body) document.body.setAttribute('data-dsh-font', mode)
    }

    var zh = {
      'font.title': 'Claude 字体风格',
      'font.label': '字体',
      'font.anthropic': 'Anthropic 原生（Sans UI / Serif 正文）',
      'font.skin': '皮肤衬线（Serif UI）',
      'font.system': '系统默认',
      'font.hint': 'UI 使用 Anthropic Sans，对话正文使用 Anthropic Serif，代码使用 Anthropic Mono；需先安装字体。'
    }

    var en = {
      'font.title': 'Claude font style',
      'font.label': 'Font',
      'font.anthropic': 'Anthropic native (Sans UI / Serif body)',
      'font.skin': 'Skin serif UI',
      'font.system': 'System default',
      'font.hint': 'Anthropic Sans for UI, Anthropic Serif for conversation, Anthropic Mono for code; fonts must be installed first.'
    }

    /**
     * Settings row for the font mode, styled exactly like DSH's own
     * "繁忙时 Enter 键行为" row: title + description on the left, and a pill
     * Menu button on the right (no native select popup).
     */
    function FontModeRow({ t, setMode, useStore }) {
      var mode = useStore((s) => s.mode)
      var [open, setOpen] = _react.useState(false)
      var selectedLabel = t('font.' + mode)
      return react_jsx_runtime.jsxs('div', {
        className: 'dsh-skin-font-row',
        children: [
          react_jsx_runtime.jsxs('div', {
            className: 'dsh-skin-font-rowText',
            children: [
              react_jsx_runtime.jsx('div', { className: 'dsh-skin-font-title', children: t('font.title') }),
              react_jsx_runtime.jsx('div', { className: 'dsh-skin-font-desc', children: t('font.hint') })
            ]
          }),
          react_jsx_runtime.jsx(_primitives.Menu, {
            open,
            onClose: () => {
              setOpen(false)
            },
            items: FONT_MODES.map((id) => ({
              id,
              label: t('font.' + id)
            })),
            selectedId: mode,
            onSelect: (id) => {
              setOpen(false)
              setMode(id)
            },
            align: 'end',
            portal: true,
            anchor: react_jsx_runtime.jsxs('button', {
              type: 'button',
              className: 'dsh-skin-font-selector',
              'aria-haspopup': 'menu',
              'aria-expanded': open,
              onClick: () => {
                setOpen((value) => !value)
              },
              children: [
                selectedLabel,
                react_jsx_runtime.jsx(_primitives.IconChevronDownOutline14, {
                  className: 'dsh-skin-font-chevron'
                })
              ]
            })
          })
        ]
      })
    }

    /**
     * Apply the Claude skin: body attributes, style tag, title, and the
     * Settings → General font-mode row. All writes are retracted by the effect
     * disposer on dispose.
     * @param ctx - owning context (the effect lifecycle owns retraction).
     */
    function apply(ctx) {
      var body = document.body
      var originalTitle = document.title
      var savedMode = readSavedFontMode()

      body.setAttribute('data-dsh-claude', '')
      body.setAttribute('data-dsh-font', savedMode)

      var style = document.createElement('style')
      style.id = STYLE_ID
      style.dataset.skinChrome = 'claude-style'
      style.textContent = CSS
      document.head.appendChild(style)

      document.title = SKIN_TITLE

      ctx.effect(function () {
        return function () {
          body.removeAttribute('data-dsh-claude')
          body.removeAttribute('data-dsh-font')
          var el = document.getElementById(STYLE_ID)
          if (el) el.remove()
          // Only restore when the skin's own title still stands — a session
          // title projected by the shell must not be clobbered by teardown.
          if (document.title === SKIN_TITLE) document.title = originalTitle
        }
      }, 'ui-skin-claude: Claude chrome')

      if (ctx.slots && ctx.locale) {
        ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
          zh,
          en
        }), 'ui-skin-claude: font row locale')

        var store = _store.defineStore({
          init: () => ({
            mode: savedMode,
            revision: -1
          }),
          actions: {
            sync: (d, mode, revision) => {
              if (revision <= d.revision) return
              d.mode = mode
              d.revision = revision
            }
          }
        })

        var revision = 0
        var bound
        var sync = () => {
          revision += 1
          if (bound) bound.sync(savedMode, revision)
        }

        ctx.slots.inject('settings.general.item', () => ctx.slots.register({
          name: 'settings.general.item',
          id: 'claude-skin-font',
          order: 40,
          store,
          locale: SETTINGS_NS,
          inject: (actions) => {
            bound = actions
            sync()
            return {
              setMode: (id) => {
                if (FONT_MODES.indexOf(id) === -1) id = DEFAULT_FONT_MODE
                savedMode = id
                writeStorage(FONT_STORAGE_KEY, savedMode === DEFAULT_FONT_MODE ? null : savedMode)
                applyFontMode(savedMode)
                sync()
              }
            }
          }
        }, FontModeRow))
      }
    }

    exports.inject = ['slots', 'locale']
    exports.apply = apply
    return module.exports
  },
})
