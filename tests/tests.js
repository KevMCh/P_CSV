var assert = chai.assert;
//var converted;
//var original;

suite('csv', function() {

  if (typeof __html__ !== 'undefined') {
              document.body.innerHTML = __html__['tests/index.html'];
              original = document.getElementById('original');
	      finaltable = document.getElementById('finaltable');

  }

  test('Comillas dobles', function () {
        original.value = '"Buenos días, Juan"';
        calculate();
        var esperado = '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>Buenos días, Juan</td>              </tr>\n</tbody></table>';

        assert.deepEqual(finaltable.innerHTML, esperado);
    });
    test('Intr. correcta', function () {
        original.value = 'a, b, c, d\naa, bb, cc, dd';
        calculate();
        var esperado = '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>a</td>                                  <td> b</td>                                  <td> c</td>                                  <td> d</td>              </tr>\n<tr>                    <td>aa</td>                                  <td> bb</td>                                  <td> cc</td>                                  <td> dd</td>              </tr>\n</tbody></table>'
        assert.deepEqual(finaltable.innerHTML, esperado);
    });

    test('Almacenamiento local', function () {
      original.value='Funciona, el, almacenamiento, interno';
      calculate();
      assert.deepEqual(localStorage.original, 'Funciona, el, almacenamiento, interno');
    });


});
