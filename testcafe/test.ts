import { Selector } from 'testcafe';

fixture `Getting Started`
  .page `http://localhost:1234/`;

test('Inputting numbers into height and width change the fields', async t => {
  await t
    .click('#input_height')
    .pressKey('ctrl+a delete')
    .typeText('#input_height', '12341234')
    .expect(Selector('#input_height').value).eql('12341234');

  await t
    .click('#input_width')
    .pressKey('ctrl+a delete')
    .typeText('#input_width', '12341234')
    .expect(Selector('#input_width').value).eql('12341234');
});

test('Letters input to height/width get rejected', async t => {
  await t
    .click('#input_width')
    .pressKey('ctrl+a delete')
    .typeText('#input_width', 'a1bc2def34g')
    .expect(Selector('#input_width').value).eql('1234');

  await t
    .click('#input_height')
    .pressKey('ctrl+a delete')
    .typeText('#input_height', 'a1bc2def34g')
    .expect(Selector('#input_height').value).eql('1234');
});
