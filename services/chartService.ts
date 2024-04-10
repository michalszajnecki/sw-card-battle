export function calculateWinLossRatio(ratio: { won: number; lost: number }): number {
    if (ratio.won + ratio.lost === 0) {
        return 0;
    }

    return Math.floor((ratio.won / (ratio.won + ratio.lost)) * 100);
}

export function generateStyleObj(calculatedRatio: number) {
    const styleVal = `conic-gradient(#FC0858 0% ${calculatedRatio}%, #0818fc ${calculatedRatio}% 100%)`;
    return {
        background: styleVal,
    };
}
