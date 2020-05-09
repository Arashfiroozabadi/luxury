export default function (value: string| undefined) {
  switch (value) {
    case 'rahati':
      return 'راحتی';

    case 'rahatil':
      return 'راحتی ال';

    case 'servicekhab':
      return 'سرویس خواب';

    case 'naharkhori':
      return 'نهار خوری';

    case 'console':
      return 'آینه کنسول';

    default:
      return null;
  }
}
