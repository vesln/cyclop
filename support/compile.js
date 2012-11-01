var folio = require('folio');

folio('cyclop')
  .root(__dirname, '..')
  .use(folio.requires())
    .dir('./lib')
    .package('cyclop')
    .entry('./cyclop.js')
    .pop()
  .use(folio.indent())
    .line('  ')
    .pop()
  .use(folio.indent())
    .line('  ')
    .pop()
  .use(folio.wrapper())
    .prefix([
        '!function (name, context, definition) {'
      , '  if (typeof require === \'function\' && typeof exports === \'object\' && typeof module === \'object\') {'
      , '    module.exports = definition();'
      , '  } else if (typeof define === \'function\' && typeof define.amd  === \'object\') {'
      , '    define(function () {'
      , '      return definition();'
      , '    });'
      , '  } else {'
      , '    context[name] = definition();'
      , '  }'
      , '}(\'cyclop\', this, function () {\n'
    ].join('\n'))
    .suffix([
        '\n  return require(\'cyclop\');'
      , '});'
    ].join('\n'))
    .pop()
  .use(folio.save())
    .file('./cyclop.js')
    .pop()
  .use(folio.minify())
    .pop()
  .use(folio.save())
    .file('./cyclop.min.js')
    .pop()
  .compile();
