export function checkWordLength(words) {
    for (let word of words.split(' ')) {
        if (word.length > 30) {
            return false;
        }
    }
    return true;
}
