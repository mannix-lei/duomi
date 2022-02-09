"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var tokenizer = require('postcss/lib/tokenize');

var Comment = require('postcss/lib/comment');

var Parser = require('postcss/lib/parser');

var SafeParser =
/*#__PURE__*/
function (_Parser) {
  _inheritsLoose(SafeParser, _Parser);

  function SafeParser() {
    return _Parser.apply(this, arguments) || this;
  }

  var _proto = SafeParser.prototype;

  _proto.createTokenizer = function createTokenizer() {
    this.tokenizer = tokenizer(this.input, {
      ignoreErrors: true
    });
  };

  _proto.comment = function comment(token) {
    var node = new Comment();
    this.init(node, token[2], token[3]);
    node.source.end = {
      line: token[4],
      column: token[5]
    };
    var text = token[1].slice(2);
    if (text.slice(-2) === '*/') text = text.slice(0, -2);

    if (/^\s*$/.test(text)) {
      node.text = '';
      node.raws.left = text;
      node.raws.right = '';
    } else {
      var match = text.match(/^(\s*)([^]*\S)(\s*)$/);
      node.text = match[2];
      node.raws.left = match[1];
      node.raws.right = match[3];
    }
  };

  _proto.decl = function decl(tokens) {
    if (tokens.length > 1 && tokens.some(function (i) {
      return i[0] === 'word';
    })) {
      _Parser.prototype.decl.call(this, tokens);
    }
  };

  _proto.unclosedBracket = function unclosedBracket() {};

  _proto.unknownWord = function unknownWord(tokens) {
    this.spaces += tokens.map(function (i) {
      return i[1];
    }).join('');
  };

  _proto.unexpectedClose = function unexpectedClose() {
    this.current.raws.after += '}';
  };

  _proto.doubleColon = function doubleColon() {};

  _proto.unnamedAtrule = function unnamedAtrule(node) {
    node.name = '';
  };

  _proto.precheckMissedSemicolon = function precheckMissedSemicolon(tokens) {
    var colon = this.colon(tokens);
    if (colon === false) return;
    var split;

    for (split = colon - 1; split >= 0; split--) {
      if (tokens[split][0] === 'word') break;
    }

    for (split -= 1; split >= 0; split--) {
      if (tokens[split][0] !== 'space') {
        split += 1;
        break;
      }
    }

    var other = tokens.splice(split, tokens.length - split);
    this.decl(other);
  };

  _proto.checkMissedSemicolon = function checkMissedSemicolon() {};

  _proto.endFile = function endFile() {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }

    this.current.raws.after = (this.current.raws.after || '') + this.spaces;

    while (this.current.parent) {
      this.current = this.current.parent;
      this.current.raws.after = '';
    }
  };

  return SafeParser;
}(Parser);

module.exports = SafeParser;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZmUtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJ0b2tlbml6ZXIiLCJyZXF1aXJlIiwiQ29tbWVudCIsIlBhcnNlciIsIlNhZmVQYXJzZXIiLCJjcmVhdGVUb2tlbml6ZXIiLCJpbnB1dCIsImlnbm9yZUVycm9ycyIsImNvbW1lbnQiLCJ0b2tlbiIsIm5vZGUiLCJpbml0Iiwic291cmNlIiwiZW5kIiwibGluZSIsImNvbHVtbiIsInRleHQiLCJzbGljZSIsInRlc3QiLCJyYXdzIiwibGVmdCIsInJpZ2h0IiwibWF0Y2giLCJkZWNsIiwidG9rZW5zIiwibGVuZ3RoIiwic29tZSIsImkiLCJ1bmNsb3NlZEJyYWNrZXQiLCJ1bmtub3duV29yZCIsInNwYWNlcyIsIm1hcCIsImpvaW4iLCJ1bmV4cGVjdGVkQ2xvc2UiLCJjdXJyZW50IiwiYWZ0ZXIiLCJkb3VibGVDb2xvbiIsInVubmFtZWRBdHJ1bGUiLCJuYW1lIiwicHJlY2hlY2tNaXNzZWRTZW1pY29sb24iLCJjb2xvbiIsInNwbGl0Iiwib3RoZXIiLCJzcGxpY2UiLCJjaGVja01pc3NlZFNlbWljb2xvbiIsImVuZEZpbGUiLCJub2RlcyIsInNlbWljb2xvbiIsInBhcmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUF2Qjs7QUFDQSxJQUFJQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxxQkFBRCxDQUFyQjs7QUFDQSxJQUFJRSxNQUFNLEdBQUdGLE9BQU8sQ0FBQyxvQkFBRCxDQUFwQjs7SUFFTUcsVTs7Ozs7Ozs7Ozs7U0FDSkMsZSxHQUFBLDJCQUFtQjtBQUNqQixTQUFLTCxTQUFMLEdBQWlCQSxTQUFTLENBQUMsS0FBS00sS0FBTixFQUFhO0FBQUVDLE1BQUFBLFlBQVksRUFBRTtBQUFoQixLQUFiLENBQTFCO0FBQ0QsRzs7U0FFREMsTyxHQUFBLGlCQUFTQyxLQUFULEVBQWdCO0FBQ2QsUUFBSUMsSUFBSSxH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QUFpQkEsS0FBSyxJQUFJLENBQTFCLEVBQTZCQSxLQUFLLEVBQWxDLEVBQXNDO0FBQ3BDLFVBQUlqQixNQUFNLENBQUNpQixLQUFELENBQU4sQ0FBYyxDQUFkLE1BQXFCLE9BQXpCLEVBQWtDO0FBQ2hDQSxRQUFBQSxLQUFLLElBQUksQ0FBVDtBQUNBO0FBQ0Q7QUFDRjs7QUFDRCxRQUFJQyxLQUFLLEdBQUdsQixNQUFNLENBQUNtQixNQUFQLENBQWNGLEtBQWQsRUFBcUJqQixNQUFNLENBQUNDLE1BQVAsR0FBZ0JnQixLQUFyQyxDQUFaO0FBQ0EsU0FBS2xCLElBQUwsQ0FBVW1CLEtBQVY7QUFDRCxHOztTQUVERSxvQixHQUFBLGdDQUF3QixDQUFHLEM7O1NBRTNCQyxPLEdBQUEsbUJBQVc7QUFDVCxRQUFJLEtBQUtYLE9BQUwsQ0FBYVksS0FBYixJQUFzQixLQUFLWixPQUFMLENBQWFZLEtBQWIsQ0FBbUJyQixNQUE3QyxFQUFxRDtBQUNuRCxXQUFLUyxPQUFMLENBQWFmLElBQWIsQ0FBa0I0QixTQUFsQixHQUE4QixLQUFLQSxTQUFuQztBQUNEOztBQUNELFNBQUtiLE9BQUwsQ0FBYWYsSUFBYixDQUFrQmdCLEtBQWxCLEdBQTBCLENBQUMsS0FBS0QsT0FBTCxDQUFhZixJQUFiLENBQWtCZ0IsS0FBbEIsSUFBMkIsRUFBNUIsSUFBa0MsS0FBS0wsTUFBakU7O0FBRUEsV0FBTyxLQUFLSSxPQUFMLENBQWFjLE1BQXBCLEVBQTRCO0FBQzFCLFdBQUtkLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFjLE1BQTVCO0FBQ0EsV0FBS2QsT0FBTCxDQUFhZixJQUFiLENBQWtCZ0IsS0FBbEIsR0FBMEIsRUFBMUI7QUFDRDtBQUNGLEc7OztFQTdFc0JoQyxNOztBQWdGekI4QyxNQUFNLENBQUNDLE9BQVAsR0FBaUI5QyxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImxldCB0b2tlbml6ZXIgPSByZXF1aXJlKCdwb3N0Y3NzL2xpYi90b2tlbml6ZScpXG5sZXQgQ29tbWVudCA9IHJlcXVpcmUoJ3Bvc3Rjc3MvbGliL2NvbW1lbnQnKVxubGV0IFBhcnNlciA9IHJlcXVpcmUoJ3Bvc3Rjc3MvbGliL3BhcnNlcicpXG5cbmNsYXNzIFNhZmVQYXJzZXIgZXh0ZW5kcyBQYXJzZXIge1xuICBjcmVhdGVUb2tlbml6ZXIgKCkge1xuICAgIHRoaXMudG9rZW5pemVyID0gdG9rZW5pemVyKHRoaXMuaW5wdXQsIHsgaWdub3JlRXJyb3JzOiB0cnVlIH0pXG4gIH1cblxuICBjb21tZW50ICh0b2tlbikge1xuICAgIGxldCBub2RlID0gbmV3IENvbW1lbnQoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pXG4gICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlbls0XSwgY29sdW1uOiB0b2tlbls1XSB9XG5cbiAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIpXG4gICAgaWYgKHRleHQuc2xpY2UoLTIpID09PSAnKi8nKSB0ZXh0ID0gdGV4dC5zbGljZSgwLCAtMilcblxuICAgIGlmICgvXlxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICBub2RlLnRleHQgPSAnJ1xuICAgICAgbm9kZS5yYXdzLmxlZnQgPSB0ZXh0XG4gICAgICBub2RlLnJhd3MucmlnaHQgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eKFxccyopKFteXSpcXFMpKFxccyopJC8pXG4gICAgICBub2RlLnRleHQgPSBtYXRjaFsyXVxuICAgICAgbm9kZS5yYXdzLmxlZnQgPSBtYXRjaFsxXVxuICAgICAgbm9kZS5yYXdzLnJpZ2h0ID0gbWF0Y2hbM11cbiAgICB9XG4gIH1cblxuICBkZWNsICh0b2tlbnMpIHtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDEgJiYgdG9rZW5zLnNvbWUoaSA9PiBpWzBdID09PSAnd29yZCcpKSB7XG4gICAgICBzdXBlci5kZWNsKHRva2VucylcbiAgICB9XG4gIH1cblxuICB1bmNsb3NlZEJyYWNrZXQgKCkgeyB9XG5cbiAgdW5rbm93bldvcmQgKHRva2Vucykge1xuICAgIHRoaXMuc3BhY2VzICs9IHRva2Vucy5tYXAoaSA9PiBpWzFdKS5qb2luKCcnKVxuICB9XG5cbiAgdW5leHBlY3RlZENsb3NlICgpIHtcbiAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciArPSAnfSdcbiAgfVxuXG4gIGRvdWJsZUNvbG9uICgpIHsgfVxuXG4gIHVubmFtZWRBdHJ1bGUgKG5vZGUpIHtcbiAgICBub2RlLm5hbWUgPSAnJ1xuICB9XG5cbiAgcHJlY2hlY2tNaXNzZWRTZW1pY29sb24gKHRva2Vucykge1xuICAgIGxldCBjb2xvbiA9IHRoaXMuY29sb24odG9rZW5zKVxuICAgIGlmIChjb2xvbiA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgbGV0IHNwbGl0XG4gICAgZm9yIChzcGxpdCA9IGNvbG9uIC0gMTsgc3BsaXQgPj0gMDsgc3BsaXQtLSkge1xuICAgICAgaWYgKHRva2Vuc1tzcGxpdF1bMF0gPT09ICd3b3JkJykgYnJlYWtcbiAgICB9XG4gICAgZm9yIChzcGxpdCAtPSAxOyBzcGxpdCA+PSAwOyBzcGxpdC0tKSB7XG4gICAgICBpZiAodG9rZW5zW3NwbGl0XVswXSAhPT0gJ3NwYWNlJykge1xuICAgICAgICBzcGxpdCArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIGxldCBvdGhlciA9IHRva2Vucy5zcGxpY2Uoc3BsaXQsIHRva2Vucy5sZW5ndGggLSBzcGxpdClcbiAgICB0aGlzLmRlY2wob3RoZXIpXG4gIH1cblxuICBjaGVja01pc3NlZFNlbWljb2xvbiAoKSB7IH1cblxuICBlbmRGaWxlICgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uXG4gICAgfVxuICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzXG5cbiAgICB3aGlsZSAodGhpcy5jdXJyZW50LnBhcmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50LnBhcmVudFxuICAgICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAnJ1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNhZmVQYXJzZXJcbiJdLCJmaWxlIjoic2FmZS1wYXJzZXIuanMifQ==
