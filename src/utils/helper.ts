export const parseNumber = (
  value: number | string | null | undefined,
): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const toIsoDate = (
  value: string | number | null | undefined,
): string | null => {
  const parsed = parseNumber(value);
  if (parsed === null || parsed <= 0) {
    return null;
  }

  const date = new Date(parsed);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

export const isSameUtcDay = (
  left: string | null | undefined,
  right: string | null | undefined,
): boolean => {
  if (!left || !right) {
    return false;
  }

  const normalizedLeft = left.trim();
  const normalizedRight = right.trim();

  if (!normalizedLeft || !normalizedRight) {
    return false;
  }

  const leftDate = new Date(normalizedLeft);
  const rightDate = new Date(normalizedRight);

  if (Number.isNaN(leftDate.getTime()) || Number.isNaN(rightDate.getTime())) {
    return false;
  }

  return (
    leftDate.toISOString().slice(0, 10) === rightDate.toISOString().slice(0, 10)
  );
};
