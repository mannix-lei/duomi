import {combineWithMathJax} from '../../../../../js/components/global.js';

import * as module1 from '../../../../../js/a11y/complexity.js';
import * as module2 from '../../../../../js/a11y/complexity/collapse.js';
import * as module3 from '../../../../../js/a11y/complexity/visitor.js';
import * as module4 from '../../../../../js/a11y/semantic-enrich.js';
import * as module5 from '../../../../../js/a11y/sre.js';

combineWithMathJax({_: {
    a11y: {
        complexity_ts: module1,
        complexity: {
            collapse: module2,
            visitor: module3
        },
        "semantic-enrich": module4,
        sre: module5
    }
}});
