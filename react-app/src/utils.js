export function checkWordLength(words) {
    for (let word of words.split(' ')) {
        console.log(word, word.length)
        if (word.length > 30) {
            return false;
        }
    }
    return true;
}
