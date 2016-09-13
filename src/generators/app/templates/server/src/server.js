<% if (modules.api) { %>import { ApiModule } from '@modern-mean/server-api-module';<% } %>

//Initialization
<% if (modules.api) { %>
//Override Express Config https://github.com/modern-mean/server-express-module/blob/master/src/config.js
//Override API Config https://github.com/modern-mean/server-api-module/blob/master/src/config.js
let apiConfig = {};
export let apiModule = new ApiModule(apiConfig);
//Express App to pass to additional modules
let expressApp = apiModule.getExpressApp();
<% } %>

//Execute
<% if (modules.api) { %>
apiModule.listen();
<% } %>
