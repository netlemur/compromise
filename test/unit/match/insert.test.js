var test = require('tape');
var nlp = require('../lib/nlp');

test('insert-basic :', function(t) {

  var m = nlp('the dog sat').insertBefore('and');
  t.equal(m.plaintext(), 'and the dog sat', 'and-dog');

  m = nlp('the dog sat').insertAfter('patiently');
  t.equal(m.plaintext(), 'the dog sat patiently', 'sat-patiently');

  m = nlp('the dog sat').match('dog').insertBefore('nice');
  t.equal(m.plaintext(), 'the nice dog sat', 'nice-dog');

  m = nlp('a dog sat').match('sat').insertAfter('quickly');
  t.equal(m.plaintext(), 'a dog sat quickly', 'sat-quickly');

  m = nlp('a dog sat').match('a dog sat').insertAfter('quickly');
  t.equal(m.plaintext(), 'a dog sat quickly', 'multi-match-quickly');

  m = nlp('a dog sat').match('asdf').insertAfter('no no no');
  t.equal(m.plaintext(), 'a dog sat', 'no no no no');

  t.end();
});