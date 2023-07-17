export function checkWordLength(words) {
    for (let word of words.split(" ")) {
        if (word.length > 30) {
            return false;
        }
    }
    return true;
}

export const normalize = (data) =>
    data.reduce((obj, ele) => ({ ...obj, [Object.keys(obj).length]: ele }), {});
