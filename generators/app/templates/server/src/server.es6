import { MMExpress } from '@modern-mean/server-express-module';

//Override Express Config https://github.com/modern-mean/server-express-module/blob/master/src/config.js
let expressConfig = {};
let expressModule = new MMExpress(expressConfig);

//Express App to pass to additional modules
let expressApp = expressModule.getExpressApp();



expressModule.listen();
