export function buildAuditEntry(action, details = '') {
  return {
    action,
    details,
    user: 'usuario.portaria',
    at: new Date().toISOString()
  };
}

export function notifyAudit(action, details = '') {
  const audit = buildAuditEntry(action, details);
  console.info('[AUDIT]', audit);
  return audit;
}
