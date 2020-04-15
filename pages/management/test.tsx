import React, {

} from 'react';

function Chart(props: any) {
    const { array } = props
    let t: any = []

    array.map((item: any | null) => {

        const per: any = () => {
            const v1 = parseInt(props.total)
            const v2 = parseInt(item.value)
            const perc = ((v2 / v1) * 100).toFixed(0)
            return perc
        }
        t.push(Number(per()))
    })
    t.sort((a: any, b: any) => {
        if (a > b) {
            return -1;;
        } else if (b > a) {
            return 1;;
        } else {
            return 0;
        }
    })
    if (props.array) {
        return (
            <div
                style={{
                    display: 'flex'
                }}
            >
                {
                    t.map((item: number, i: string) => {
                        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                        return (
                            <div
                                key={i}
                                style={{
                                    width: item + "%",
                                    height: 50,
                                    backgroundColor: "#" + randomColor
                                }}
                            >

                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return null
}

export default Chart