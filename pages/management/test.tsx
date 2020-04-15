import React from 'react';

interface PropsTypes{
    total:string,
    array: string[];
}
function Chart(props: PropsTypes) {
  const { array, total } = props;
  const t: any = [];

  array.map((item: any | null) => {
    const per: any = () => {
      const v1 = parseInt(total, 10);
      const v2 = parseInt(item.value, 10);
      const perc = ((v2 / v1) * 100).toFixed(0);
      return perc;
    };
    return t.push(Number(per()));
  });
  t.sort((a: any, b: any) => {
    if (a > b) {
      return -1;
    } if (b > a) {
      return 1;
    }
    return 0;
  });
  if (array) {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        {
            t.map((item: number) => {
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={randomColor}
                  style={{
                    width: `${item}%`,
                    height: 50,
                    backgroundColor: `#${randomColor}`,
                  }}
                />
              );
            })
        }
      </div>
    );
  }
  return null;
}

export default Chart;
