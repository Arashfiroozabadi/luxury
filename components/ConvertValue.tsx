import persianJs from 'persianjs';

export default function ConvertValue(v: number) {
  if (Number.isNaN(v)) {
    return 0;
  }
  if (v === 0) {
    return 0;
  }
  return persianJs(v).englishNumber().toString();
}
