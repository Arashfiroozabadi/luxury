import persianJs from 'persianjs';

export default function ConvertValue(v: number) {
  if (v === 0) {
    return 0;
  }
  return persianJs(v).englishNumber().toString();
}
