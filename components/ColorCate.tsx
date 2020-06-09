function ColorCate(cate:string) {
  switch (cate) {
    case 'rahati':
      return '#e8e230';
    case 'rahatil':
      return '#ec407a';
    case 'servicekhab':
      return '#ab47bc';
    case 'naharkhori':
      return '#01b075';
    case 'console':
      return '#ff5722';
    default:
      return 'white';
  }
}

export default ColorCate;
