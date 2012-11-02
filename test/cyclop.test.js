
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

  it('can register and run steps', function(done) {
    var run = cyclop();

    run.step('Create project', function(next) {
      next('Project');
    });

    run.step('Create user', function(next, project) {
      next(project, 'User');
    });

    run
      .step('Create project')
      .step('Create user')
      .end(function(project, user) {
        project.should.eq('Project')
        user.should.eq('User')
        done();
      });
  });
});
