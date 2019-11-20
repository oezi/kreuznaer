import * as bar from './data/bar.json';
import * as deu from './data/deu.json';
import * as eng from './data/eng.json';
import * as fra from './data/fra.json';
import * as gsw from './data/gsw.json';
import * as ksh from './data/ksh.json';
import * as lat from './data/lat.json';
import * as nds from './data/nds.json';
import * as nld from './data/nld.json';
import * as pfl from './data/pfl.json';
import * as spa from './data/spa.json';
import * as tur from './data/tur.json';

const backreflength = 4;
const specialChars = ['.', '!', '?', ',', ':', '-', '–'];
const data = {
  bar,
  deu,
  eng,
  fra,
  gsw,
  ksh,
  lat,
  nds,
  nld,
  pfl,
  spa,
  tur
};

class Kreuznaer {
  private readonly config = null;

  constructor(config:
                'bar'
                | 'deu'
                | 'eng'
                | 'fra'
                | 'gsw'
                | 'ksh'
                | 'lat'
                | 'nds'
                | 'nld'
                | 'pfl'
                | 'spa'
                | 'tur') {
    this.config = config;
  }

  private getData() {
    return data[this.config];
  }

  private randomEntry(arr: any[]) {
    return arr?.[Math.floor(Math.random() * arr.length)];
  }

  private generate(data = this.getData()) {
    let word = ' '.repeat(backreflength);
    let newchar = '';
    do {
      const key = word.substr(word.length - (backreflength), backreflength);
      const dataEntry = data.words[key];
      newchar = '';
      if (dataEntry) {
        if (typeof dataEntry === 'string') {
          newchar = dataEntry;
        } else {
          const rng = Math.floor(Math.random() * dataEntry._) + 1;
          let sum = 0;
          Object.entries(dataEntry).some(([key, val]: [string, number]) => {
            if (key !== '_') {
              sum += val;
              if (sum >= rng) {
                newchar = key
                  .replace(';', '')
                  .replace(' ', '');
                return true;
              }
            }
            return false;
          });
        }
        word += newchar;
      }
    } while (newchar && newchar !== ';' && word.length > 0);
    return word.trim();
  }

  private generateSomething(includeSpecialChars = true, data = this.getData()) {
    while (true) {
      const word = this.generate(data);
      if (includeSpecialChars || !specialChars.includes(word)) {
        return word;
      }
    }
  }

  private generateWord(data = this.getData()) {
    while (true) {
      const word = this.generateSomething(false, data);
      if (!parseInt(word[0])) {
        return word;
      }
    }
  }

  private generateSentence(data = this.getData()) {
    const parts = [];
    let lastPart = ',';
    do {
      lastPart = this.generateSomething(!specialChars.includes(lastPart), data);
      if (lastPart.replace('.', '')) {
        parts.push(lastPart.replace('.', ''));
      }
    } while ((!['.', '!', '?'].includes(lastPart) || parts.length < 3) && parts.length < 250);

    let sentence = parts.join(' ') + (['!', '?'].includes(lastPart) ? '' : '.');
    sentence = sentence.replace(/[\s]+[\.]/gi, '.');
    sentence = sentence.replace(/[\s]+[!]/gi, '!');
    sentence = sentence.replace(/[\s]+[?]/gi, '?');
    sentence = sentence.replace(/[\s]+[,]/gi, ',');
    sentence = sentence.replace(/[\s]+[:]/gi, ':');
    sentence = sentence.replace('..', '.');
    sentence = sentence[0].toUpperCase() + sentence.substring(1);

    return sentence;
  }

  private generateName(gender?: 'm' | 'f', data = this.getData()) {
    const male = gender ? gender === 'm' : Math.random() < 0.5;
    if (male) {
      if (data.maleNames?.length) {
        return this.randomEntry(data.maleNames);
      }
    } else {
      if (data.femaleNames?.length) {
        return this.randomEntry(data.femaleNames);
      }
    }
    while (true) {
      const word = this.generateWord(data);
      if (word[0] === word[0].toUpperCase() && word.length >= 5) {
        return word;
      }
    }
  }

  private generateFamilyName(data = this.getData()) {
    if (data.familyNames?.length) {
      return this.randomEntry(data.familyNames);
    }
    while (true) {
      const word = this.generateWord(data);
      if (word[0] === word[0].toUpperCase() && word.length >= 5) {
        return word;
      }
    }
  }

  private generateNickName(data = this.getData()) {
    if (data.nickNames?.length) {
      return this.randomEntry(data.nickNames);
    }
    while (true) {
      const word = this.generateWord(data);
      if (word[0] === word[0].toUpperCase() && word.length >= 5) {
        return word;
      }
    }
  }

  public getWord() {
    return this.generateWord();
  }

  public getSentence() {
    return this.generateSentence();
  }

  public getName(gender?: 'm' | 'f') {
    return this.generateName(gender);
  }

  public getFamilyName() {
    return this.generateFamilyName();
  }

  public getNickName() {
    return this.generateNickName();
  }
}

export default Kreuznaer;
