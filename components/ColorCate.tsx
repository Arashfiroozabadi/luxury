function ColorCate(cate:string) {
  switch (cate) {
    case 'rahati':
      return '#e8e230';
    case 'rahati-l':
      return '#ec407a';
    case 'service-khab':
      return '#ab47bc';
    case 'nahar-khori':
      return '#01b075';
    case 'console':
      return '#ff5722';
    default:
      return '';
  }
}

export default ColorCate;
