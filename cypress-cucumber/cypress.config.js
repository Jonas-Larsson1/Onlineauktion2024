const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

const baseUrl = require('./baseUrl.js');

module.exports = defineConfig(
  {
    e2e:
    {
      specPattern: '**/*.feature',
      baseUrl,
      video: false,
      supportFile: false,
      screenshotOnRunFailure: false,
      setupNodeEvents(on, config) {
        // implement node event listeners here

        // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
        addCucumberPreprocessorPlugin(on, config);

        on(
          "file:preprocessor",
          webpack(
            {
              webpackOptions:
              {
                resolve: {
                  extensions: [".js"],
                },
                module: {
                  rules:
                    [
                      {
                        test: /\.feature$/,
                        use:
                          [
                            {
                              loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                              options: config,
                            },
                          ],
                      },
                    ],
                },
              },
            }
          )
        );

        on(
          'task',
          {
            log(message) {
              console.log(message)
              return null
            },
          }
        );

        // Make sure to return the config object as it might have been modified by the plugin.
        return config;
      }
    }
  }
);
