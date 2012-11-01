
/*!
 * Internal dependencies.
 */

var cyclop = cyclop || require('..');


describe('cyclop', function() {
  it('can run multiple functions', function(done) {
    var first, second;

    cyclop()
      .push(function(next) {
        first = true;
        next('lolz');
      }).push(function(next, text) {
        text.should.eq('lolz');
        second = true;
        next('even', 'more', 'args');
      }).run(function(st, ri, ng) {
        st.should.eq('even');
        ri.should.eq('more');
        ng.should.eq('args');

        first.should.be.true;
        second.should.be.true;

        done();
      });
  });
});
