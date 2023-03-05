export default `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

export const structure2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

export const structure3 = {"name":"diff","children":[{"name":"common","value":"parent","status":"tree","children":[{"name":"follow","value":false,"status":"added"},{"name":"setting1","value":"Value 1","status":"unchanged"},{"name":"setting2","value":200,"status":"removed"},{"name":"setting3","value":true,"status":"changed"},{"name":"setting3","value":null,"status":"updated"},{"name":"setting4","value":"blah blah","status":"added"},{"name":"setting5","value":{"key5":"value5"},"status":"added"},{"name":"setting6","value":"parent","status":"tree","children":[{"name":"doge","value":"parent","status":"tree","children":[{"name":"wow","value":"","status":"changed"},{"name":"wow","value":"so much","status":"updated"}]},{"name":"key","value":"value","status":"unchanged"},{"name":"ops","value":"vops","status":"added"}]}]},{"name":"group1","value":"parent","status":"tree","children":[{"name":"baz","value":"bas","status":"changed"},{"name":"baz","value":"bars","status":"updated"},{"name":"foo","value":"bar","status":"unchanged"},{"name":"nest","value":{"key":"value"},"status":"changed"},{"name":"nest","value":"str","status":"updated"}]},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]}