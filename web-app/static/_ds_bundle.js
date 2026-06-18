/* @ds-bundle: {"format":3,"namespace":"DesignSystem_c8d74c","components":[{"name":"AppHeader","sourcePath":"components/core/AppHeader.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BarRow","sourcePath":"components/core/BarRow.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"DataTable","sourcePath":"components/core/DataTable.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"KpiCard","sourcePath":"components/core/KpiCard.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"}],"sourceHashes":{"components/core/AppHeader.jsx":"f20ecc92ebe2","components/core/Badge.jsx":"5acd7357b835","components/core/BarRow.jsx":"273ec3ba2311","components/core/Button.jsx":"da53ef7926d9","components/core/Card.jsx":"2285817dae80","components/core/Checkbox.jsx":"02f4d92a443a","components/core/DataTable.jsx":"1669134a0c3d","components/core/Input.jsx":"c2030020ef4e","components/core/KpiCard.jsx":"7525b739820d","components/core/ProgressBar.jsx":"60ee6c3122e1","components/core/SectionHeading.jsx":"355054949419","ui_kits/relevar-catalogo/InitialScreen.jsx":"77de3a93b2e4","ui_kits/relevar-catalogo/LoadingScreen.jsx":"809ef9ddcd97","ui_kits/relevar-catalogo/ResultsScreen.jsx":"919165db3ec5","ui_kits/relevar-catalogo/data.js":"0df78196ce29"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_c8d74c = window.DesignSystem_c8d74c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/AppHeader.jsx
try { (() => {
/**
 * Dark brand header bar. Shows the MOJO logo at left and an optional page
 * title/subtitle. Pass `logoSrc` pointing at the bundled logo asset.
 */
function AppHeader({
  logoSrc = 'assets/mojo-logo.png',
  title,
  subtitle,
  right,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--surface-header)',
      color: 'var(--text-on-dark)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "MOJO",
    style: {
      height: '26px',
      width: 'auto',
      display: 'block'
    }
  }), (title || subtitle) && /*#__PURE__*/React.createElement("div", {
    style: {
      width: '1px',
      height: '28px',
      background: 'rgba(255,255,255,0.16)'
    }
  }), (title || subtitle) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1px',
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-on-dark)',
      lineHeight: 1.2,
      fontFamily: 'var(--font-body)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,0.6)',
      lineHeight: 1.2
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, right)));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/** Small status/label pill. Tones: neutral, accent, success, danger. */
function Badge({
  children,
  tone = 'neutral',
  style = {}
}) {
  const tones = {
    neutral: {
      background: 'var(--surface-subtle)',
      color: 'var(--text-body)',
      border: 'var(--border-subtle)'
    },
    accent: {
      background: 'var(--mojo-yellow-soft)',
      color: '#8A7A00',
      border: 'var(--mojo-yellow)'
    },
    success: {
      background: 'var(--success-soft)',
      color: 'var(--success)',
      border: 'transparent'
    },
    danger: {
      background: 'var(--danger-soft)',
      color: 'var(--danger)',
      border: 'transparent'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: '0.02em',
      fontFamily: 'var(--font-body)',
      background: t.background,
      color: t.color,
      border: `1px solid ${t.border}`,
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/BarRow.jsx
try { (() => {
/**
 * Horizontal bar row for a simple distribution chart: a label, a track that
 * fills to `percent`, and a trailing value. Compose several in a column.
 */
function BarRow({
  label,
  percent = 0,
  value,
  color = 'var(--accent)',
  style = {}
}) {
  const pct = Math.min(100, Math.max(0, percent));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 56px',
      alignItems: 'center',
      gap: '14px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '22px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-subtle)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-sm)',
      background: color,
      transition: 'width var(--dur-base) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-muted)',
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value != null ? value : `${Math.round(pct)}%`));
}
Object.assign(__ds_scope, { BarRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BarRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MOJO primary action button. Yellow accent fill on dark ink text.
 * Variants: primary (accent), secondary (neutral outline), ghost.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: 'var(--text-sm)',
      radius: 'var(--radius-sm)'
    },
    md: {
      padding: '11px 20px',
      fontSize: 'var(--text-base)',
      radius: 'var(--radius-md)'
    },
    lg: {
      padding: '15px 26px',
      fontSize: 'var(--text-lg)',
      radius: 'var(--radius-md)'
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-bold)',
    lineHeight: 1,
    padding: s.padding,
    fontSize: s.fontSize,
    borderRadius: s.radius,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      boxShadow: 'var(--shadow-xs)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-heading)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)'
    }
  };
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  let dyn = {};
  if (!disabled && variant === 'primary') {
    dyn.background = active ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)';
  } else if (!disabled && variant === 'secondary' && hover) {
    dyn.background = 'var(--surface-subtle)';
  } else if (!disabled && variant === 'ghost' && hover) {
    dyn.background = 'var(--surface-subtle)';
  }
  if (!disabled && active) dyn.transform = 'translateY(1px)';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...variants[variant],
      ...dyn,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface card with soft rounded corners and subtle border + shadow. */
function Card({
  children,
  padding = 'var(--space-6)',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding,
      boxSizing: 'border-box',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
/** Checkbox with label. Accent-yellow when checked. */
function Checkbox({
  label,
  hint,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style = {}
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: '20px',
      height: '20px',
      marginTop: '1px',
      borderRadius: '6px',
      background: on ? 'var(--accent)' : 'var(--surface-card)',
      border: `1px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      inset: 0,
      margin: 0,
      cursor: 'inherit'
    }
  }), on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-on-accent)",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-body)'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--leading-snug)'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/DataTable.jsx
try { (() => {
/**
 * Clean data table. Columns describe header label, key, alignment and an
 * optional render fn. Numeric columns get tabular figures and right align.
 *
 * columns: [{ key, header, align?, width?, render?, mono? }]
 */
function DataTable({
  columns = [],
  rows = [],
  zebra = true,
  style = {}
}) {
  const cell = align => ({
    padding: '12px 16px',
    fontSize: 'var(--text-base)',
    color: 'var(--text-body)',
    textAlign: align || 'left',
    borderBottom: '1px solid var(--border-subtle)',
    verticalAlign: 'middle'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      overflowX: 'auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      padding: '10px 16px',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      textAlign: c.align || 'left',
      borderBottom: '1px solid var(--border-strong)',
      whiteSpace: 'nowrap',
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: zebra && i % 2 === 1 ? 'var(--neutral-50)' : 'transparent'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      ...cell(c.align),
      fontVariantNumeric: c.mono || c.align === 'right' ? 'tabular-nums' : 'normal',
      fontFamily: c.mono ? 'ui-monospace, "SF Mono", Menlo, monospace' : 'var(--font-sans)',
      fontWeight: c.bold ? 'var(--weight-semibold)' : 'var(--weight-regular)',
      color: c.muted ? 'var(--text-muted)' : 'var(--text-body)'
    }
  }, c.render ? c.render(row[c.key], row, i) : row[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with floating label support. Large, airy field used for the
 * channel-link entry on the initial screen.
 */
function Input({
  label,
  hint,
  size = 'md',
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    md: {
      padding: '11px 14px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '15px 16px',
      fontSize: 'var(--text-lg)'
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '7px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-body)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: s.fontSize,
      padding: s.padding,
      color: 'var(--text-heading)',
      background: disabled ? 'var(--surface-subtle)' : 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/KpiCard.jsx
try { (() => {
/** Single KPI / metric tile: small uppercase label over a large value. */
function KpiCard({
  label,
  value,
  sub,
  accent = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: `1px solid ${accent ? 'var(--accent)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.75rem',
      fontWeight: 'var(--weight-extra)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-heading)',
      lineHeight: 1,
      fontFamily: 'var(--font-sans)'
    }
  }, value), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, sub));
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
/** Determinate progress bar with optional message + percent. Accent fill. */
function ProgressBar({
  value = 0,
  message,
  showPercent = true,
  style = {}
}) {
  const pct = Math.min(100, Math.max(0, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }, (message || showPercent) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '12px'
    }
  }, message && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-sans)'
    }
  }, message), showPercent && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '10px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-subtle)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--accent)',
      transition: 'width var(--dur-base) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
/** Section heading: a bold title with an optional count/right slot. */
function SectionHeading({
  children,
  count,
  right,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px',
      marginBottom: 'var(--space-4)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h1)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-body)'
    }
  }, children), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-muted)'
    }
  }, count), right && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, right));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/relevar-catalogo/InitialScreen.jsx
try { (() => {
// Initial screen — paste channel link, toggle ISRC/UPC, run.
const {
  Card,
  Input,
  Checkbox,
  Button
} = window.DesignSystem_c8d74c;
function InitialScreen({
  onRun
}) {
  const [url, setUrl] = React.useState('');
  const [codes, setCodes] = React.useState(true);
  const D = window.RelevarData;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      padding: '56px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--text-display)',
      fontWeight: 900,
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-display)'
    }
  }, "Relevar Cat\xE1logo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--leading-snug)',
      maxWidth: 580
    }
  }, "Peg\xE1 el link del canal \u201CTopic\u201D/\u201CTema\u201D de un artista en YouTube y obten\xE9 su cat\xE1logo completo: distribuidora, reproducciones de YouTube y los c\xF3digos ISRC / UPC.")), /*#__PURE__*/React.createElement(Card, {
    padding: "28px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "lg",
    id: "channel",
    label: "Link del canal / Topic",
    placeholder: "https://www.youtube.com/channel/UCxxxxxxxxxx",
    value: url,
    onChange: e => setUrl(e.target.value),
    hint: "Peg\xE1 la URL del canal \u201CTopic\u201D o \u201CTema\u201D generado por YouTube."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    id: "codes",
    label: "Buscar c\xF3digos ISRC y UPC",
    hint: "Agrega ISRC (por canci\xF3n) y UPC (por \xE1lbum). Tarda un poco m\xE1s.",
    checked: codes,
    onChange: e => setCodes(e.target.checked)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary",
    disabled: !url.trim(),
    onClick: () => onRun({
      url,
      codes
    })
  }, "Relevar cat\xE1logo"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setUrl(D.channelUrl),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, "Usar un link de ejemplo")))));
}
window.InitialScreen = InitialScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/relevar-catalogo/InitialScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/relevar-catalogo/LoadingScreen.jsx
try { (() => {
// Loading screen — animated progress through the relevamiento steps.
const {
  Card,
  ProgressBar
} = window.DesignSystem_c8d74c;
function LoadingScreen({
  withCodes,
  onDone
}) {
  const steps = React.useMemo(() => {
    const base = ['Leyendo el canal de YouTube…', 'Listando lanzamientos y álbumes…', 'Calculando reproducciones…', 'Clasificando distribuidoras…'];
    if (withCodes) base.push('Buscando códigos ISRC y UPC…');
    base.push('Armando el dashboard…');
    return base;
  }, [withCodes]);
  const [pct, setPct] = React.useState(0);
  const [stepIdx, setStepIdx] = React.useState(0);
  React.useEffect(() => {
    const total = 2600;
    const start = Date.now();
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / total);
      const eased = 1 - Math.pow(1 - t, 2);
      setPct(Math.round(eased * 100));
      setStepIdx(Math.min(steps.length - 1, Math.floor(eased * steps.length)));
      if (t >= 1) {
        clearInterval(id);
        setTimeout(onDone, 320);
      }
    }, 60);
    return () => clearInterval(id);
  }, [steps, onDone]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: '0 auto',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "32px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--accent)',
      boxShadow: '0 0 0 4px var(--mojo-yellow-soft)'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, "Relevando cat\xE1logo\u2026")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: pct,
    message: steps[stepIdx]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 4
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      opacity: i <= stepIdx ? 1 : 0.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 16,
      height: 16,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: i < stepIdx ? 'var(--accent)' : 'transparent',
      border: i < stepIdx ? 'none' : '2px solid var(--border-strong)'
    }
  }, i < stepIdx && /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-on-accent)",
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: i === stepIdx ? 'var(--text-heading)' : 'var(--text-muted)',
      fontWeight: i === stepIdx ? 600 : 400
    }
  }, s)))))));
}
window.LoadingScreen = LoadingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/relevar-catalogo/LoadingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/relevar-catalogo/ResultsScreen.jsx
try { (() => {
// Results screen — the main dashboard: success line, KPIs, distribution
// (table + bar chart), Top 10 table, and the Excel download CTA.
const {
  Card,
  KpiCard,
  SectionHeading,
  DataTable,
  BarRow,
  Badge,
  Button
} = window.DesignSystem_c8d74c;
function distTone(name) {
  return name === 'MOJO LATAM' ? 'accent' : 'neutral';
}
function ResultsScreen({
  onReset
}) {
  const D = window.RelevarData;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '40px 0 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'var(--success-soft)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--success)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-h2)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, D.artist), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-muted)'
    }
  }, "\u2014 ", D.kpis.productos, " productos relevados"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onReset,
    style: {
      marginLeft: 'auto',
      background: 'none',
      border: 'none',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, "Relevar otro")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(KpiCard, {
    label: "Productos",
    value: D.kpis.productos
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "Reproducciones",
    value: D.kpis.reproducciones
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "\xC1lbumes",
    value: D.kpis.albumes
  }), /*#__PURE__*/React.createElement(KpiCard, {
    label: "Con ISRC",
    value: D.kpis.isrc,
    accent: true,
    sub: "100% matcheados"
  })), /*#__PURE__*/React.createElement(SectionHeading, null, "Distribuci\xF3n por distribuidora"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 20,
      marginBottom: 36,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "8px 8px 4px"
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'name',
      header: 'Distribuidora',
      bold: true,
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex'
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        tone: distTone(v)
      }, v))
    }, {
      key: 'productos',
      header: 'Productos',
      align: 'right'
    }, {
      key: 'pct',
      header: '%',
      align: 'right',
      render: v => `${v}%`
    }, {
      key: 'views',
      header: 'Reproducciones',
      align: 'right'
    }],
    rows: D.distribs
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "22px 24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, D.distribs.map(d => /*#__PURE__*/React.createElement(BarRow, {
    key: d.name,
    label: d.name,
    percent: d.pct,
    value: d.productos,
    color: d.name === 'MOJO LATAM' ? 'var(--accent)' : 'var(--neutral-300)'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "Productos por distribuidora \xB7 MOJO LATAM destacado")))), /*#__PURE__*/React.createElement(SectionHeading, {
    count: "Top 10"
  }, "Por reproducciones"), /*#__PURE__*/React.createElement(Card, {
    padding: "8px 8px 4px",
    style: {
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'n',
      header: '#',
      align: 'right',
      width: '44px',
      muted: true
    }, {
      key: 'track',
      header: 'Track',
      bold: true
    }, {
      key: 'album',
      header: 'Álbum',
      muted: true
    }, {
      key: 'dist',
      header: 'Distribuidora',
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex'
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        tone: distTone(v)
      }, v))
    }, {
      key: 'views',
      header: 'Reproducciones',
      align: 'right'
    }, {
      key: 'isrc',
      header: 'ISRC',
      mono: true
    }, {
      key: 'year',
      header: 'Año',
      align: 'right',
      muted: true
    }],
    rows: D.top10
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "24px 28px",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h3)',
      fontWeight: 700,
      color: 'var(--text-heading)'
    }
  }, "Cat\xE1logo completo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, D.kpis.productos, " productos \xB7 distribuidora, reproducciones, ISRC y UPC en un Excel.")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      marginRight: 2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 10 5 5 5-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21h14"
  })), "Descargar Excel")));
}
window.ResultsScreen = ResultsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/relevar-catalogo/ResultsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/relevar-catalogo/data.js
try { (() => {
// Sample catalog data for the Relevar Catálogo UI kit (fictional, cumbia/latina).
window.RelevarData = {
  artist: 'Líderes de Chile',
  channelUrl: 'https://www.youtube.com/channel/UCGUvyq8_hUkYQ7fBORbc84A',
  kpis: {
    productos: '106',
    reproducciones: '28.827.651',
    albumes: '22',
    isrc: '106/106'
  },
  distribs: [{
    name: 'ONErpm',
    productos: 40,
    pct: 38,
    views: '12.1M'
  }, {
    name: 'The Orchard',
    productos: 38,
    pct: 36,
    views: '9.8M'
  }, {
    name: 'MOJO LATAM',
    productos: 22,
    pct: 21,
    views: '4.2M'
  }, {
    name: 'FaroLatino',
    productos: 6,
    pct: 5,
    views: '0.7M'
  }],
  top10: [{
    n: 1,
    track: 'Ya No Vuelvas Más',
    album: 'Corazón de Acordeón',
    dist: 'ONErpm',
    views: '4.812.330',
    isrc: 'CL-A91-23-0014',
    year: 2023
  }, {
    n: 2,
    track: 'La Noche es Joven',
    album: 'Cumbia para el Alma',
    dist: 'The Orchard',
    views: '3.954.118',
    isrc: 'CL-A91-22-0087',
    year: 2022
  }, {
    n: 3,
    track: 'Reina del Baile',
    album: 'Corazón de Acordeón',
    dist: 'ONErpm',
    views: '3.201.540',
    isrc: 'CL-A91-23-0021',
    year: 2023
  }, {
    n: 4,
    track: 'Te Vi Llorar',
    album: 'Sentimiento Tropical',
    dist: 'MOJO LATAM',
    views: '2.640.512',
    isrc: 'AR-MJ0-24-0007',
    year: 2024
  }, {
    n: 5,
    track: 'Cumbia del Olvido',
    album: 'Cumbia para el Alma',
    dist: 'The Orchard',
    views: '2.218.904',
    isrc: 'CL-A91-22-0090',
    year: 2022
  }, {
    n: 6,
    track: 'Amor de Verano',
    album: 'Bailando Bajo la Lluvia',
    dist: 'ONErpm',
    views: '1.987.265',
    isrc: 'CL-A91-21-0153',
    year: 2021
  }, {
    n: 7,
    track: 'No Me Llames',
    album: 'Sentimiento Tropical',
    dist: 'MOJO LATAM',
    views: '1.654.330',
    isrc: 'AR-MJ0-24-0012',
    year: 2024
  }, {
    n: 8,
    track: 'Corazón Partío',
    album: 'Bailando Bajo la Lluvia',
    dist: 'FaroLatino',
    views: '1.402.778',
    isrc: 'CL-FL2-21-0044',
    year: 2021
  }, {
    n: 9,
    track: 'Volver a Empezar',
    album: 'Corazón de Acordeón',
    dist: 'The Orchard',
    views: '1.188.612',
    isrc: 'CL-A91-23-0030',
    year: 2023
  }, {
    n: 10,
    track: 'Fiesta en el Barrio',
    album: 'Cumbia para el Alma',
    dist: 'ONErpm',
    views: '1.044.901',
    isrc: 'CL-A91-22-0101',
    year: 2022
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/relevar-catalogo/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BarRow = __ds_scope.BarRow;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
