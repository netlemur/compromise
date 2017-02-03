'use strict';
const renderHtml = require('./renderHtml');
const chalk = require('chalk');
const fns = require('../../paths').fns;

const colors = {
  Noun: chalk.cyan,
  Verb: chalk.magenta,
  Adjective: chalk.yellow,
  Adverb: chalk.red,
};

const methods = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function() {
    return this.whitespace.before + this.text + this.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function() {
    return this.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function() {
    return renderHtml(this);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function() {
    return {
      text: this.text,
      normal: this.normal,
      tags: Object.keys(this.tag)
    };
  },
  /** check-print information for the console */
  check: function() {
    let tags = Object.keys(this.tag).map((tag) => {
      if (colors[tag]) {
        return colors[tag](tag);
      }
      return tag;
    }).join(', ');
    let word = this.text;
    // word = this.whitespace.before + word + this.whitespace.after;
    word = '\'' + chalk.green(word || '-') + '\'';
    if (this.dirty) {
      word += '*';
    }
    let silent = '';
    if (this.silent_term) {
      silent = '[' + this.silent_term + ']';
    }
    // word += fns.leftPad(silent, 10);
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 1);
    // word = fns.leftPad(word, 32);
    // word = fns.rightPad(word, 28);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

const addMethods = (Term) => {
  let args = arguments;
  //hook them into result.proto
  Term.prototype.out = function(fn) {
    if (!methods[fn]) {
      fn = 'text';
    }
    return methods[fn].apply(this, args);
  };
  return Term;
};

module.exports = addMethods;