/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'ava'
import { dialogflow } from 'actions-on-google'
const { speechMarkdownHelper } = require('../src/index')

test.serial('Verify translation of speech markdown is processed', async t => {
  const app = dialogflow().use(speechMarkdownHelper())
  app.fallback(conv => {
    const markdown = `Sample [3s] speech [250ms] markdown`;
    conv.ask(markdown)
    conv.close(markdown)
    t.is(
      '<speak>\nSample <break time="3s"/> speech <break time="250ms"/> markdown\n</speak>',
      conv.responses[0]
    )
    t.is(
      '<speak>\nSample <break time="3s"/> speech <break time="250ms"/> markdown\n</speak>',
      conv.responses[1]
    )
  })
  t.pass(await app({}, {}))
})

test.serial('Verify translation of standard SSML is ignored', async t => {
  const app = dialogflow().use(speechMarkdownHelper())
  app.fallback(conv => {
    const ssml = `<speak><p>Sample <break time="3s" /> speech <break time="250ms" /> markdown</p></speak>`;
    conv.ask(ssml)
    t.is(ssml, conv.responses[0])
  })
  t.pass(await app({}, {}))
})

test.serial('Verify translation of plain text', async t => {
  const app = dialogflow().use(speechMarkdownHelper())
  app.fallback(conv => {
    const plainText = `Sample 3s speech 250ms markdown`;
    conv.ask(plainText)
    t.is("<speak>\nSample 3s speech 250ms markdown\n</speak>", conv.responses[0])
  })
  t.pass(await app({}, {}))
})
