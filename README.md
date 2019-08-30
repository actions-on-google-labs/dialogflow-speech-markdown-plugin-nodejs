# Speech Markdown Actions on Google plugin

This plugin makes it easier to use [Speech Markdown](https://github.com/speechmarkdown/speechmarkdown-js)
in the [Actions on Google library](https://github.com/actions-on-google/actions-on-google-nodejs).

Currently, plugin supports only Actions built with Dialogflow.

[![NPM Version](https://img.shields.io/npm/v/actions-on-google-speech-markdown-plugin.svg)](https://www.npmjs.org/package/actions-on-google-speech-markdown-plugin)

## Setup Instructions

Install the plugin with `npm install actions-on-google-speech-markdown-plugin`.

### Usage

This plugin overrides the methods `conv.ask` and `conv.close` to parse speech markdown
content if the response type is a string. If the string is plain text, the parser should
not make any changes.

```javascript
const { dialogflow } = require('actions-on-google')
const { speechMarkdownHelper } = require('actions-on-google-speech-markdown-plugin')

const app = dialogflow()
    .use(speechMarkdownHelper())

app.intent('Default Welcome Intent', conv => {
    const markdown = `Sample [3s] speech [250ms] markdown`;
    conv.ask(markdown)
    // Should output
    // "<speak>Sample <break time="3s"/> speech <break time="250ms"/> markdown</speak>"
})
```

## References & Issues
+ Questions? Go to [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google), [Assistant Developer Community on Reddit](https://www.reddit.com/r/GoogleAssistantDev/) or [Support](https://developers.google.com/actions/support/).
+ For bugs, please report an issue on Github.
+ Actions on Google [Documentation](https://developers.google.com/actions/extending-the-assistant)
+ Actions on Google [Codelabs](https://codelabs.developers.google.com/?cat=Assistant).

## Make Contributions
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
