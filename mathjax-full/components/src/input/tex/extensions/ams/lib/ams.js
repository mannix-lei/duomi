import {combineWithMathJax} from '../../../../../../../js/components/global.js';

import * as module1 from '../../../../../../../js/input/tex/ams/AmsConfiguration.js';
import * as module2 from '../../../../../../../js/input/tex/ams/AmsItems.js';
import * as module3 from '../../../../../../../js/input/tex/ams/AmsMethods.js';

combineWithMathJax({_: {
    input: {
        tex: {
            ams: {
                AmsConfiguration: module1,
                AmsItems: module2,
                AmsMethods: module3
            }
        }
    }
}});
