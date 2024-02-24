function isPangram(sentence) {
  const letters = sentence.toLowerCase().match(/[a-z]/g);
  const charSet = new Set(letters);
  return charSet.size === 26;
}

function wordFrequency(text) {
  const validated = text
                      .toLowerCase()
                      .split('')
                      .filter(el => el.match(/[a-z ]/))
                      .join('')
  const words = validated.split(" ");
  const map = new Map();

  for (let word of words) {
    if (map.has(word)) {
      let count = map.get(word);
      map.set(word, count + 1);
      continue;
    }

    map.set(word, 1);
  }

  const sorted = Array.from(map).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const TOP = 3;

  let top = sorted.slice(0, TOP);
  return top
          .map(item => item.join('='))
          .join(', ');
}
