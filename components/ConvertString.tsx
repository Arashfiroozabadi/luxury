export default function (value: string| undefined) {
  switch (value) {
    case 'rahati':
      return 'راحتی';

    case 'rahati-l':
      return 'راحتی ال';

    case 'service-khab':
      return 'سرویس خواب';

    case 'nahar-khori':
      return 'نهار خوری';

    case 'console':
      return 'آینه کنسول';

    default:
      return null;
  }
}
