// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyAY_ZWpDR6l8JEfAW9mwg8Qf6IoK-o_Jmg",
      authDomain: "testbed-material.firebaseapp.com",
      databaseURL: "https://testbed-material.firebaseio.com",
      projectId: "testbed-material",
      storageBucket: "testbed-material.appspot.com",
      messagingSenderId: "1069895088892"
  }
};
